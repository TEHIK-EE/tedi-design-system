import { Table as TableType } from '@tanstack/table-core';
import React from 'react';

import { IntentionalAny } from '../../types';
import { DefaultTData, TableProps } from './table.types';

export interface ITableContext<TData extends DefaultTData<TData>>
  extends Pick<
    TableProps<TData>,
    | 'id'
    | 'isLoading'
    | 'isError'
    | 'hideRowBorder'
    | 'caption'
    | 'placeholder'
    | 'errorPlaceholder'
    | 'renderSubComponent'
    | 'renderGroupHeading'
    | 'onRowClick'
    | 'size'
  > {
  table: TableType<TData> | null;
  loadingLabel?: string;
  isFooterVisible?: boolean;
}

export const TableContext = React.createContext<ITableContext<IntentionalAny>>({
  isLoading: false,
  isError: false,
  table: null,
  id: '',
  hideRowBorder: false,
});
