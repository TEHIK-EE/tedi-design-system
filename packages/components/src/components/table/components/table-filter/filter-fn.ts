import { Row } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { DateRangeFilterValues } from './table-filter-context';

export const textFilterFn = (row: Row<unknown>, columnId: string, filterValue: string) =>
  filterValue?.includes(row?.getValue?.(columnId));

export const selectFilterFn = (row: Row<unknown>, columnId: string, filterValue: string) =>
  filterValue === row?.getValue?.(columnId);

export const multiSelectFilterFn = (row: Row<unknown>, columnId: string, filterValue: string[]) =>
  filterValue?.some((i) => i === row?.getValue?.(columnId));

export const dateRangeFilterFn = (row: Row<unknown>, columnId: string, filterValue: DateRangeFilterValues) => {
  const date = dayjs(row?.getValue?.(columnId));
  const from = filterValue?.from;
  const to = filterValue?.to;

  if ((from || to) && !date) return false;
  if (from && !to) {
    return from.isBefore(date);
  } else if (!from && to) {
    return to.isAfter(date);
  } else if (from && to) {
    return from.isBefore(date) && to.isAfter(date);
  } else return true;
};
