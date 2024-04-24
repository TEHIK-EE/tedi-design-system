import {
  ColumnFiltersState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  HeaderGroup,
  PaginationState,
  RowSelectionState,
  SortingState,
  Updater,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import usePrint from '../../helpers/hooks/use-print';
import { useLabels } from '../../providers/label-provider';
import { IntentionalAny } from '../../types';
import { Card, CardContent } from '../card';
import { PlaceholderProps } from '../placeholder/placeholder';
import Pagination from './components/pagination/pagination';
import {
  dateRangeFilterFn,
  dateRangePeriodFilterFn,
  mapFilterFn,
  multiSelectFilterFn,
  selectFilterFn,
  textFilterFn,
} from './components/table-filter/filter-fn';
import TableLayout from './components/table-layout/table-layout';
import styles from './table.module.scss';
import { DefaultTData, TableProps } from './table.types';
import { TableContext } from './table-context';

export const PAGE_SIZE_WITHOUT_PAGINATION = 10000;
const emptyData: IntentionalAny[] = [];

export function Table<TData extends DefaultTData<TData>>(props: TableProps<TData>): JSX.Element {
  const { getLabel } = useLabels();
  const {
    id,
    data: externalData,
    columns,
    caption,
    columnFilters: columnFiltersOuter,
    onColumnFiltersChange,
    cardProps: { padding: cardPadding = 0, ...restCardProps } = {},
    hidePagination,
    defaultPagination = {
      pageIndex: 0,
      pageSize: hidePagination ? PAGE_SIZE_WITHOUT_PAGINATION : 10, // when pagination is hidden display all the rows
    },
    pagination,
    manualPagination = !!props.pagination,
    manualSorting = !!props.sorting,
    manualFiltering = !!props.columnFilters,
    sorting: sortingOuter,
    defaultSorting = [],
    defaultExpanded = {},
    onPaginationChange,
    onSortingChange,
    rowSelection: rowSelectionOuter,
    onRowSelectionChange,
    defaultColumnVisibility = {},
    columnVisibility: columnVisibilityOuter,
    onColumnVisibilityChange,
    getRowId,
    onRowClick,
    defaultRowSelection,
    totalRows,
    renderSubComponent,
    getRowCanExpand,
    groupRowsBy,
    renderGroupHeading,
    isLoading = false,
    isError = false,
    placeholder,
    errorPlaceholder,
    loadingLabel = getLabel('table.loading'),
    verticalAlign = 'middle',
    enableFilters = false,
    enableSorting = true,
    hideRowBorder = false,
    size = 'medium',
    hideCardBorder,
    ...rest
  } = props;

  // we need to memoize the data when it is an empty array or undefined to prevent infinite renders
  // https://github.com/TanStack/table/issues/4240
  // https://github.com/TanStack/table/issues/4566
  const data = React.useMemo(() => (externalData?.length ? externalData : emptyData) ?? emptyData, [externalData]);
  const isPrinting = usePrint();
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>(defaultPagination);
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);
  const [expanded, setExpanded] = React.useState<ExpandedState>(defaultExpanded);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(defaultRowSelection || {});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(defaultColumnVisibility);

  // during printing expand subRows/subComponents
  const getExpanded = React.useMemo(() => (isPrinting ? true : expanded), [expanded, isPrinting]);

  const getPagination = React.useMemo(() => {
    // If pagination is controlled outside, don't use local state
    return pagination || { pageIndex, pageSize };
  }, [pageIndex, pageSize, pagination]);

  const getSorting = React.useMemo(() => {
    // If sorting is controlled outside, don't use local state
    return sortingOuter || sorting;
  }, [sorting, sortingOuter]);

  const getColumnFilter = React.useMemo(() => {
    // If filtering is controlled outside, don't use local state
    return columnFiltersOuter || columnFilters;
  }, [columnFilters, columnFiltersOuter]);

  const getRowSelection = React.useMemo(() => {
    // If row selection is controlled outside, don't use local state
    return rowSelectionOuter || rowSelection;
  }, [rowSelection, rowSelectionOuter]);

  const getColumnVisibility = React.useMemo(() => {
    // If columnVisibility is controlled outside, don't use local state
    return columnVisibilityOuter || columnVisibility;
  }, [columnVisibility, columnVisibilityOuter]);

  const handlePaginationChange = (data: Updater<PaginationState>): void => {
    if (typeof data !== 'function') return;
    const newData = data(getPagination);
    pagination && onPaginationChange ? onPaginationChange(newData) : setPagination(newData);
  };

  const handleSortingChange = (data: Updater<SortingState>): void => {
    if (typeof data !== 'function') return;
    const newData = data(getSorting);
    sortingOuter && onSortingChange ? onSortingChange(newData) : setSorting(newData);
  };

  const handleRowSelectionChange = (data: Updater<RowSelectionState>): void => {
    if (typeof data !== 'function') return;
    const newData = data(getRowSelection);
    rowSelectionOuter && onRowSelectionChange ? onRowSelectionChange(newData) : setRowSelection(newData);
  };

  const handleColumnFilteringChange = (data: Updater<ColumnFiltersState>): void => {
    if (typeof data !== 'function') return;
    const newData = data(getColumnFilter);
    columnFiltersOuter && onColumnFiltersChange ? onColumnFiltersChange(newData) : setColumnFilters(newData);
  };

  const handleColumnVisibilityChange = (data: Updater<VisibilityState>): void => {
    if (typeof data !== 'function') return;
    const newData = data(getColumnVisibility);
    columnVisibilityOuter && onColumnVisibilityChange
      ? onColumnVisibilityChange(newData)
      : setColumnVisibility(newData);
  };

  const groupedData = React.useMemo(() => {
    // add rowGroupKey when using groupRowsBy
    const groupList =
      data?.map((r) => {
        if (typeof groupRowsBy === 'string') {
          return { ...r, rowGroupKey: r[groupRowsBy] };
        } else if (groupRowsBy) {
          return { ...r, rowGroupKey: groupRowsBy(r) };
        }

        return r;
      }) ?? [];

    // group rows with same rowGroupKeys but keep original array order
    return groupList.reduce<{ keys: string[]; list: TData[] }>(
      (a, c) => {
        if (c.rowGroupKey && a.keys.includes(c.rowGroupKey)) {
          return a;
        } else if (c.rowGroupKey) {
          a.keys = [...a.keys, c.rowGroupKey];
          a.list = [...a.list, ...groupList.filter((g) => g.rowGroupKey === c.rowGroupKey)];
        } else {
          a.list = [...a.list, c];
        }

        return a;
      },
      { keys: [], list: [] }
    ).list;
  }, [data, groupRowsBy]);

  const table = useReactTable({
    data: groupedData,
    columns,
    state: {
      rowSelection: getRowSelection,
      columnFilters: getColumnFilter,
      pagination: getPagination,
      sorting: getSorting,
      expanded: getExpanded,
      columnVisibility: getColumnVisibility,
    },
    manualSorting: manualSorting,
    manualFiltering: manualFiltering,
    pageCount: pagination && totalRows ? Math.ceil(totalRows / pagination.pageSize) : undefined,
    onRowSelectionChange: handleRowSelectionChange,
    onExpandedChange: setExpanded,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFilteringChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand,
    getSubRows: (row) => row.subRows,
    manualPagination: manualPagination,
    enableFilters,
    enableSorting,
    getRowId,
    filterFns: {
      text: (row, id, value) => mapFilterFn(row, id, value, textFilterFn),
      select: (row, id, value) => mapFilterFn(row, id, value, selectFilterFn),
      'multi-select': (row, id, value) => mapFilterFn(row, id, value, multiSelectFilterFn),
      'date-range': (row, id, value) => mapFilterFn(row, id, value, dateRangeFilterFn),
      'date-range-period': (row, id, value) => mapFilterFn(row, id, value, dateRangePeriodFilterFn),
    },
  });

  const isFooterVisible = !!(table.getFooterGroups() as HeaderGroup<TData>[]).find(
    (g) => !!g.headers.find((h) => h.column.columnDef.footer)
  );

  const hideBottomBorder = !!(!hideCardBorder && hidePagination && !isFooterVisible);
  const showFooterBorder = !hideRowBorder && isFooterVisible && !hidePagination;

  const tableBEM = cn(styles['table'], styles[`table--vertical-align-${verticalAlign}`], styles[`table--${size}`], {
    [styles['table--hidden-bottom-border']]: hideBottomBorder,
    [styles['table--footer-bottom-border']]: showFooterBorder,
  });

  const getPlaceholderProps = (type: 'error' | 'empty', props?: PlaceholderProps) => {
    const {
      children: placeholderChildren = getLabel(`table.${type}`),
      isNested: placeholderIsNested = true,
      icon: placeholderIcon = type === 'error' ? 'error' : undefined,
      cardProps: { padding: placeholderCardPropsPadding = 1, ...restPlaceholderCardProps } = {},
      ...restPlaceholder
    } = props || { cardProps: {} };

    return {
      children: placeholderChildren,
      isNested: placeholderIsNested,
      icon: placeholderIcon,
      cardProps: { padding: placeholderCardPropsPadding, ...restPlaceholderCardProps },
      ...restPlaceholder,
    };
  };

  return (
    <TableContext.Provider
      value={{
        table,
        id,
        caption,
        onRowClick,
        renderSubComponent,
        isFooterVisible,
        renderGroupHeading,
        placeholder: getPlaceholderProps('empty', placeholder),
        errorPlaceholder: getPlaceholderProps('error', errorPlaceholder),
        loadingLabel,
        isLoading,
        isError,
        hideRowBorder,
        size,
      }}
    >
      <Card data-name="table" {...rest} borderless={hideCardBorder} padding={cardPadding} {...restCardProps}>
        <CardContent>
          <div className={tableBEM}>
            <TableLayout<TData> />
          </div>
          {!hidePagination && table && (
            <Pagination<TData> totalRows={totalRows || table.getFilteredRowModel().rows.length} />
          )}
        </CardContent>
      </Card>
    </TableContext.Provider>
  );
}

export default Table;
