import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table';
import React from 'react';

import { CardProps } from '../card';
import { PlaceholderProps } from '../placeholder/placeholder';

declare module '@tanstack/table-core' {
  interface FilterFns {
    text: FilterFn<unknown>;
    select: FilterFn<unknown>;
    'multi-select': FilterFn<unknown>;
  }
}

export interface DefaultTData<TData> {
  // To fix Type 'TableRowType' has no properties in common with type DefaultData<TableRowType>
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * All row Subrows
   */
  subRows?: TData[];
  /**
   * Rows are grouped by this key
   */
  rowGroupKey?: string;
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
   * ID of table
   */
  id: string;
  /**
   * Default table data
   * @default []
   */
  data: TData[];
  /**
   * Column object created with columnHelper
   * https://tanstack.com/table/v8/docs/guide/column-defs
   */
  columns: ColumnDef<TData, any>[]; // eslint-disable-line
  /**
   * Table title for screen-readers
   */
  caption?: string;
  /**
   * Additional classname
   */
  className?: string;
  /**
   * Hide pagination
   */
  hidePagination?: boolean;
  /**
   * Card props
   */
  cardProps?: CardProps;
  /**
   * Pagination data to server-side pagination use with `onPaginationChange` and `totalRows`
   */
  pagination?: PaginationState;
  /**
   * Initial internal pagination state on render. This only applies when `pagination` prop is not defined.
   */
  defaultPagination?: PaginationState;
  /**
   * If internal pagination logic is ignored. If true, then pagination must be handled in the app.
   * If omitted, then the value is inherited from `!!pagination` prop.
   */
  manualPagination?: boolean;
  /**
   * Callback on Pagination data change. Use combined with `pagination` and `totalRows` props to make server-side pagination
   */
  onPaginationChange?: (state: PaginationState) => void;
  /**
   * Sorting data to server-side pagination use with onSortingChange
   */
  sorting?: SortingState;
  /**
   * Initial internal sorting state on render. This only applies when `sorting` prop is not defined.
   */
  defaultSorting?: SortingState;
  /**
   * Callback on Sorting data change. Use combined with sorting prop to make server-side sorting.
   */
  onSortingChange?: (state: SortingState) => void;
  /**
   * Sorting data to server-side pagination use with `onColumnFiltersChange`
   */
  columnFilters?: ColumnFiltersState;
  /**
   * Callback on Sorting data change. Use combined with `columnFilters` prop to make server-side sorting.
   */
  onColumnFiltersChange?: (state: ColumnFiltersState) => void;
  /**
   * Callback on row selection data change
   */
  onRowSelectionChange?: (state: RowSelectionState, flatRows: Row<TData>[]) => void;
  /**
   * Called when row is clicked
   */
  onRowClick?: (row: TData) => void;
  /**
   * Default selected rows
   */
  defaultRowSelection?: RowSelectionState;
  /**
   * TotalRows - only needed to pass when server-side pagination is used.
   */
  totalRows?: number;
  /**
   * Callback to render subComponent to expanded row.
   * Component will be rendered inside `<tbody>` and spanned to whole row.
   */
  renderSubComponent?: (row: Row<TData>) => React.ReactElement;
  /**
   * Check if row can expand
   */
  getRowCanExpand?: (row: Row<TData>) => boolean;
  /**
   * Is the table currently loading
   */
  isLoading?: boolean;
  /**
   * Is the table currently in error state
   * When true errorPlaceholder is displayed
   */
  isError?: boolean;
  /**
   * Props for the `<PlaceholderBlock>` that is displayed when table is empty
   */
  placeholder?: PlaceholderProps;
  /**
   * Props for the `<PlaceholderBlock>` that is displayed when table is in error state
   */
  errorPlaceholder?: PlaceholderProps;
  /**
   * Label for the table loader skeleton
   */
  loadingLabel?: string;
  /**
   * Controls cell padding to conserve space.
   * Useful when nesting tables.
   */
  size?: 'small' | 'medium';
  /**
   * Group rows by key or comparison function that returns a group key.
   */
  groupRowsBy?: Extract<keyof TData, string> | ((row: TData) => string);
  /**
   * Callback to render row groups header.
   * Component will be rendered inside group headers `<tr>`.
   * If omitted, then the `rowGroupKey` (inferred from `groupRowsBy`) value is rendered by default
   */
  renderGroupHeading?: (row: Row<TData & Pick<DefaultTData<TData>, 'rowGroupKey'>>) => React.ReactElement;
  /**
   * Vertical align of columns
   * @default 'middle
   */
  verticalAlign?: 'base-line' | 'middle';
  /**
   * Should table allow filtering columns.
   * Defaults to false, because TableFilter is not yet final, and we cant add filtering to every table.
   * @default false
   */
  enableFilters?: boolean;
  /**
   * Should table allow sorting columns.
   * When false then `enableSorting` in column props are ignored
   * @default true
   */
  enableSorting?: boolean;
  /**
   * Should show borders between rows.
   * @default false
   */
  hideRowBorder?: boolean;
  /**
   * Should hide card border. Over-ridden with `cardProps`
   */
  hideCardBorder?: boolean;
}
