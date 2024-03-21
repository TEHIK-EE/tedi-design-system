import { Row } from '@tanstack/react-table';
import dayjs, { ConfigType } from 'dayjs';

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

export const dateRangePeriodFilterFn = (row: Row<unknown>, columnId: string, filterValue: DateRangeFilterValues) => {
  const date = row?.getValue?.(columnId) as { from: ConfigType; to: ConfigType };

  if (typeof date !== 'object' || !Object.keys(date).includes('from') || !Object.keys(date).includes('to')) {
    console.error(
      'Accessor function should return an object { from: Dayjs | Date | string | null | undefined, to: Dayjs | Date | string | null | undefined }'
    );
    return true;
  }
  const filterFrom = filterValue?.from;
  const filterTo = filterValue?.to;
  const valueFrom = date.from;
  const valueTo = date.to;

  // in case when one of the cell values(from or to) is not set, we still check the match for the value that does exist
  // when neither of the cell values are present then we don't show the row during filtering
  if (filterFrom && filterTo) {
    return valueFrom && valueTo
      ? (filterFrom.isSameOrBefore(valueFrom, 'day') && filterTo.isSameOrAfter(valueFrom, 'day')) ||
          (filterTo.isSameOrAfter(valueTo, 'day') && filterFrom.isSameOrBefore(valueTo, 'day'))
      : valueFrom
      ? filterFrom.isSameOrBefore(valueFrom, 'day') && filterTo.isSameOrAfter(valueFrom, 'day')
      : valueTo
      ? filterFrom.isSameOrBefore(valueTo, 'day') && filterTo.isSameOrAfter(valueTo, 'day')
      : false;
  } else if (filterFrom && !filterTo) {
    return valueTo
      ? filterFrom.isSameOrBefore(valueTo, 'day')
      : valueFrom
      ? filterFrom.isSameOrBefore(valueFrom, 'day')
      : false;
  } else if (!filterFrom && filterTo) {
    return valueTo
      ? filterTo.isSameOrAfter(valueTo, 'day')
      : valueFrom
      ? filterTo.isSameOrAfter(valueFrom, 'day')
      : false;
  } else {
    return true;
  }
};
