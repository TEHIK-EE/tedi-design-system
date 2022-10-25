import { Row } from '@tanstack/react-table';
import { Table as TableType } from '@tanstack/table-core';
import React from 'react';

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
