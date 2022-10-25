import {
  ColumnFiltersState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  Updater,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import { Card, CardContent } from '../card';
import { useLabels } from '../label-provider';
import Pagination from './components/pagination/pagination';
import TableLayout from './components/table-layout/table-layout';
import styles from './table.module.scss';
import { DefaultTData, TableProps } from './table.types';
import { TableContext } from './table-context';

export function Table<TData extends DefaultTData<TData>>(props: TableProps<TData>): JSX.Element {
  const { getLabel } = useLabels();
  const {
    id,
    data,
    columns,
    columnFilters: columnFiltersOuter,
    onColumnFiltersChange,
    cardProps,
    hidePagination,
    pagination,
    sorting: sortingOuter,
    onPaginationChange,
    onSortingChange,
    onRowSelectionChange,
    defaultRowSelection,
    totalRows,
    renderSubComponent,
    getRowCanExpand,
    isLoading = false,
    loadingLabel = getLabel('table.loading'),
    verticalAlign = 'middle',
    enableFilters = false,
  } = props;

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(defaultRowSelection || {});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const getPagination = React.useMemo(() => {
    // If pagination is controlled out-side do not use local state
    return pagination || { pageIndex, pageSize };
  }, [pageIndex, pageSize, pagination]);

  const getSorting = React.useMemo(() => {
    // If sorting is controlled out-side do not use local state
    return sortingOuter || sorting;
  }, [sorting, sortingOuter]);

  const getColumnFilter = React.useMemo(() => {
    // If sorting is controlled out-side do not use local state
    return columnFiltersOuter || columnFilters;
  }, [columnFilters, columnFiltersOuter]);

  const handlePaginationChange = (data: Updater<PaginationState>): void => {
    if (typeof data === 'function') {
      const newData = data(getPagination);
      pagination && onPaginationChange ? onPaginationChange(newData) : setPagination(newData);
    }
  };

  const handleSortingChange = (data: Updater<SortingState>): void => {
    if (typeof data === 'function') {
      const newData = data(getSorting);
      sortingOuter && onSortingChange ? onSortingChange(newData) : setSorting(newData);
    }
  };

  const rowSelectionChange = (data: Updater<RowSelectionState>): void => {
    if (typeof data === 'function') {
      const newData = data(rowSelection);
      setRowSelection(newData);
    }
  };

  const handleColumnFilteringChange = (data: Updater<ColumnFiltersState>): void => {
    if (typeof data === 'function') {
      const newData = data(getColumnFilter);
      columnFiltersOuter && onColumnFiltersChange ? onColumnFiltersChange(newData) : setColumnFilters(newData);
    }
  };

  React.useEffect(() => {
    onRowSelectionChange?.(rowSelection, table.getSelectedRowModel().flatRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRowSelectionChange, rowSelection]);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnFilters,
      pagination: getPagination,
      sorting: getSorting,
      expanded,
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
    manualPagination: !!pagination,
    enableFilters,
  });

  return (
    <TableContext.Provider value={{ table, id, renderSubComponent, loadingLabel, isLoading }}>
      <Card {...cardProps}>
        <CardContent padding="none">
          <div className={cn(styles['table'], `table--vertical-align-${verticalAlign}`)}>
            <TableLayout<TData> />
          </div>
          {!hidePagination && <Pagination totalRows={totalRows || data.length} />}
        </CardContent>
      </Card>
    </TableContext.Provider>
  );
}

export default Table;
