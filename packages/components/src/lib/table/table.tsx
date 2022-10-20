import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table as TableType,
  Updater,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'classnames';
import React from 'react';

import { Card, CardContent, CardProps } from '../card';
import { useLabels } from '../label-provider';
import Pagination from './components/pagination/pagination';
import TableLayout from './components/table-layout/table-layout';
import TableLoader from './components/table-loader/table-loader';
import styles from './table.module.scss';

export interface DefaultTData<TData> {
  // To fix Type 'TableRowType' has no properties in common with type DefaultData<TableRowType>
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * All row Subrows
   */
  subRows?: TData[];
  /**
   * Added to Row
   */
  rowClassName?: string;
  /**
   * Called when row is clicked
   */
  onClick?: (row: TData) => void;
}

export interface TableProps<TData extends DefaultTData<TData>> {
  /**
   * id of table
   */
  id: string;
  /**
   * Default table data,
   */
  data: TData[];
  /**
   * Column object created with columnHelper
   * https://tanstack.com/table/v8/docs/guide/column-defs
   */
  columns: ColumnDef<TData, any>[]; // eslint-disable-line
  /**
   * Hide pagination
   */
  hidePagination?: boolean;
  /**
   * Card props
   */
  cardProps?: CardProps;
  /**
   * Pagination data to server-side pagination use with onPaginationChange and totalRows
   */
  pagination?: PaginationState;
  /**
   * callback on Pagination data change. Use combined with pagination and totalRows props to make server-side pagination
   */
  onPaginationChange?: (state: PaginationState) => void;
  /**
   * sorting data to server-side pagination use with onSortingChange
   */
  sorting?: SortingState;
  /**
   * callback on Sorting data change. Use combined with sorting prop to make server-side sorting.
   */
  onSortingChange?: (state: SortingState) => void;
  /**
   * sorting data to server-side pagination use with onSortingChange
   */
  columnFilters?: ColumnFiltersState;
  /**
   * callback on Sorting data change. Use combined with sorting prop to make server-side sorting.
   */
  onColumnFiltersChange?: (state: ColumnFiltersState) => void;
  /**
   * callback on row selection data change
   */
  onRowSelectionChange?: (state: RowSelectionState, flatRows: Row<TData>[]) => void;
  /**
   * default selected rows
   */
  defaultRowSelection?: RowSelectionState;
  /**
   * TotalRows - only needed to pass when server-side pagination is used.
   */
  totalRows?: number;
  /**
   * Callback to render subComponent to expanded row.
   * Component will be rendered inside td and spanned to whole row.
   */
  renderSubComponent?: (row: Row<TData>) => React.ReactElement;
  /**
   * Check if row can expand
   */
  getRowCanExpand?: (row: Row<TData>) => boolean;
  /**
   * Should all the rows cab be expanded from the heading
   */
  showExpandAll?: boolean;
  /**
   * Is the table currently loading
   */
  isLoading?: boolean;
  /**
   * label for the table loader skeleton
   */
  loadingLabel?: string;
  /**
   * Vertical align of columns
   */
  verticalAlign?: 'base-line' | 'middle';
  /**
   * Should table allow filtering columns.
   * Default to false, because TableFilter is not yet final and we cant add filtering to every table.
   */
  enableFilters?: boolean;
}

interface ITableContext<TData> {
  table: TableType<TData> | null;
  id: string;
  isLoading: boolean;
  loadingLabel?: string;
  renderSubComponent?: (row: Row<TData>) => React.ReactElement;
  rowClassName?: string;
}

// eslint-disable-next-line
export const TableContext = React.createContext<ITableContext<any>>({
  isLoading: false,
  table: null,
  id: '',
});

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
        <CardContent padding={cardProps?.type !== 'borderless' ? undefined : 'none'}>
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
