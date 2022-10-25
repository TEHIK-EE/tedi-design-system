import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table';
import React from 'react';

import { CardProps } from '../card';

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
   * Should all the rows can be expanded from the heading
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
