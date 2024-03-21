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
} from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import usePrint from '../../helpers/hooks/use-print';
import { useLabels } from '../../providers/label-provider';
import { Card, CardContent } from '../card';
import { PlaceholderProps } from '../placeholder/placeholder';
import Pagination from './components/pagination/pagination';
import {
  dateRangeFilterFn,
  dateRangePeriodFilterFn,
  multiSelectFilterFn,
  selectFilterFn,
  textFilterFn,
} from './components/table-filter/filter-fn';
import TableLayout from './components/table-layout/table-layout';
import styles from './table.module.scss';
import { DefaultTData, TableProps } from './table.types';
import { TableContext } from './table-context';

export const PAGE_SIZE_WITHOUT_PAGINATION = 10000;
export function Table<TData extends DefaultTData<TData>>(props: TableProps<TData>): JSX.Element {
  const { getLabel } = useLabels();
  const {
    id,
    data = [],
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
    manualPagination,
    sorting: sortingOuter,
    defaultSorting = [],
    defaultExpanded = {},
    onPaginationChange,
    onSortingChange,
    onRowSelectionChange,
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

  const isPrinting = usePrint();
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>(defaultPagination);
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);
  const [expanded, setExpanded] = React.useState<ExpandedState>(defaultExpanded);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(defaultRowSelection || {});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

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

  const rowSelectionChange = (data: Updater<RowSelectionState>): void => {
    if (typeof data !== 'function') return;
    const newData = data(rowSelection);
    setRowSelection(newData);
  };

  const handleColumnFilteringChange = (data: Updater<ColumnFiltersState>): void => {
    if (typeof data !== 'function') return;
    const newData = data(getColumnFilter);
    columnFiltersOuter && onColumnFiltersChange ? onColumnFiltersChange(newData) : setColumnFilters(newData);
  };

  React.useEffect(() => {
    onRowSelectionChange?.(rowSelection, table.getSelectedRowModel().flatRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRowSelectionChange, rowSelection]);

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
      rowSelection,
      columnFilters: getColumnFilter,
      pagination: getPagination,
      sorting: getSorting,
      expanded: getExpanded,
    },
    manualSorting: !!sortingOuter,
    manualFiltering: !!columnFiltersOuter,
    pageCount: pagination && totalRows ? Math.ceil(totalRows / pagination.pageSize) : undefined,
    onRowSelectionChange: rowSelectionChange,
    onExpandedChange: setExpanded,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFilteringChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand,
    getSubRows: (row) => row.subRows,
    manualPagination: manualPagination ?? !!pagination,
    enableFilters,
    enableSorting,
    filterFns: {
      text: textFilterFn,
      select: selectFilterFn,
      'multi-select': multiSelectFilterFn,
      'date-range': dateRangeFilterFn,
      'date-range-period': dateRangePeriodFilterFn,
    },
  });

  const isFooterVisible = !!(table.getFooterGroups() as HeaderGroup<TData>[]).find(
    (g) => !!g.headers.find((h) => h.column.columnDef.footer)
  );

  const hideBottomBorder = !!(!hideCardBorder && hidePagination && !isFooterVisible);

  const tableBEM = cn(styles['table'], styles[`table--vertical-align-${verticalAlign}`], styles[`table--${size}`], {
    [styles['table--hidden-bottom-border']]: hideBottomBorder,
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
