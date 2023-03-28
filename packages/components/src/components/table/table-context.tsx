import { Row } from '@tanstack/react-table';
import { Table as TableType } from '@tanstack/table-core';
import React from 'react';

import { PlaceholderProps } from '../placeholder/placeholder';

export interface ITableContext<TData> {
  table: TableType<TData> | null;
  id: string;
  isLoading: boolean;
  isError: boolean;
  placeholder?: PlaceholderProps;
  errorPlaceholder?: PlaceholderProps;
  loadingLabel?: string;
  renderSubComponent?: (row: Row<TData>) => React.ReactElement;
  renderGroupHeading?: (row: Row<TData>) => React.ReactElement;
  rowClassName?: string;
  hideRowBorder: boolean;
  isFooterVisible?: boolean;
  onRowClick?: (row: TData) => void;
}

// eslint-disable-next-line
export const TableContext = React.createContext<ITableContext<any>>({
  isLoading: false,
  isError: false,
  table: null,
  id: '',
  hideRowBorder: false,
});
