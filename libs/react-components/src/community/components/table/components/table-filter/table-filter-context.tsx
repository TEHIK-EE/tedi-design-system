import { Column, Row } from '@tanstack/react-table';
import React from 'react';

import { DefaultTData } from '../../table.types';

// hold the filter value in ISOString instead of Dayjs object, so it is easier to store in places like localstorage
export interface DateRangeFilterValues {
  from: string | null;
  to: string | null;
}

export interface TableFilterFields {
  filter: string;
  selectField: string;
  multiSelectField: string[];
  dateRange: DateRangeFilterValues;
}

export interface ITableFilterContext<TData extends DefaultTData<TData>> {
  column: Column<TData, unknown> | null;
  rows: Row<TData>[] | null;
  values: TableFilterFields | null;
  open: boolean;
  setOpen: ((open: boolean) => void) | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableFilterContext = React.createContext<ITableFilterContext<any>>({
  column: null,
  rows: null,
  values: null,
  open: false,
  setOpen: null,
});
