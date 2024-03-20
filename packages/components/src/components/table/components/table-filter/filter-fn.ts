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
    return from.isSameOrBefore(date, 'day');
  } else if (!from && to) {
    return to.isSameOrAfter(date, 'day');
  } else if (from && to) {
    return from.isSameOrBefore(date, 'day') && to.isSameOrAfter(date, 'day');
  } else return true;
};
