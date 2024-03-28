import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  FilterFn,
  PaginationState,
  Row,
  RowData,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table';
import React from 'react';

import { IntentionalAny } from '../../types';
import { CardProps } from '../card';
import { ChoiceGroupItemProps } from '../form/choice-group';
import { PlaceholderProps } from '../placeholder/placeholder';
import { PickerOverridableProps } from './components/table-filter/components/table-date-filter';

declare module '@tanstack/table-core' {
  interface FilterFns {
    /**
     * To filter out from text
     */
    text: FilterFn<unknown>;
    /**
     * To filter out from select options
     */
    select: FilterFn<unknown>;
    /**
     * To filter out from multi-select options
     */
    'multi-select': FilterFn<unknown>;
    /**
     * To filter out from date range (to - from)
     */
    'date-range': FilterFn<unknown>;
    /**
     * To filter out period from date range (to - from)
     */
    'date-range-period': FilterFn<unknown>;
  }
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * Pass your own custom filterOptions to column.meta.filterOptions to override the default values.
     * Used only when filterFn: 'select'
     */
    filterOptions?: ChoiceGroupItemProps[] | string[];
    /**
     * Pass selection of props to the start DatePicker.
     * Used only when filterFn: 'date-range' | 'date-range-period'
     */
    startDatePicker?: PickerOverridableProps;
    /**
     * Pass selection of props to the end DatePicker.
     * Used only when filterFn: 'date-range' | 'date-range-period'
     */
    endDatePicker?: PickerOverridableProps;
    /**
     * Unknown parameters
     */
    [key: string]: IntentionalAny;
  }
}

export interface DefaultTData<TData> {
  // To fix Type 'TableRowType' has no properties in common with type DefaultData<TableRowType>
  [key: string]: IntentionalAny;
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
   * Custom row Component to render this row
   */
  CustomRowComponent?: React.ComponentType<Row<TData>>;
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
   * Default table data.
   * Should be memoized array
   * @default []
   */
  data: TData[];
  /**
   * Column object created with columnHelper
   * https://tanstack.com/table/v8/docs/guide/column-defs
   */
  columns: ColumnDef<TData, IntentionalAny>[];
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
   * If internal sorting logic is ignored. If true, then sorting must be handled in the app.
   * If omitted, then the value is inherited from `!!sorting` prop.
   */
  manualSorting?: boolean;
  /**
   * If internal filtering logic is ignored. If true, then filtering must be handled in the app.
   * If omitted, then the value is inherited from `!!columnFilters` prop.
   */
  manualFiltering?: boolean;
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
   * This optional function is used to derive a unique ID for any given row. If not provided the rows index is used (nested rows join together with . using their grandparents' index eg. index.index.index).
   * Its recommended to use Row ID when using row selection
   */
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
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
   * Initial internal expanding state on render.
   */
  defaultExpanded?: ExpandedState;
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
