import { Row } from '@tanstack/react-table';
import dayjs, { ConfigType } from 'dayjs';

import { IntentionalAny } from '../../../../types';
import { DateRangeFilterValues } from './table-filter-context';

export const textFilterFn = (filterValue: string, data: unknown) =>
  typeof data === 'string' || typeof data === 'number'
    ? filterValue?.toLowerCase().includes(String(data).toLowerCase())
    : true;

export const selectFilterFn = (filterValue: string, data: unknown) => filterValue === data;

export const multiSelectFilterFn = (filterValue: string[], data: unknown) => filterValue?.some((i) => i === data);

export const dateRangeFilterFn = (filterValue: DateRangeFilterValues, data: unknown) => {
  const date = data ? dayjs(data as string) : null;
  const from = filterValue?.from ? dayjs(filterValue.from) : null;
  const to = filterValue?.to ? dayjs(filterValue.to) : null;

  if ((from || to) && !date) return false;
  if (from && !to) {
    return from.isSameOrBefore(date, 'day');
  } else if (!from && to) {
    return to.isSameOrAfter(date, 'day');
  } else if (from && to) {
    return from.isSameOrBefore(date, 'day') && to.isSameOrAfter(date, 'day');
  } else return true;
};

export const dateRangePeriodFilterFn = (filterValue: DateRangeFilterValues, data: unknown) => {
  if (
    typeof data !== 'object' ||
    !Object.keys(data as object).includes('from') ||
    !Object.keys(data as object).includes('to')
  ) {
    console.error(
      'Accessor function should return an object { from: Dayjs | Date | string | null | undefined, to: Dayjs | Date | string | null | undefined }'
    );
    return true;
  }
  const date = data as { from: ConfigType; to: ConfigType } | null;

  const filterFrom = filterValue?.from ? dayjs(filterValue.from) : null;
  const filterTo = filterValue?.to ? dayjs(filterValue.to) : null;
  const valueFrom = date?.from;
  const valueTo = date?.to;

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
    return valueFrom
      ? filterTo.isSameOrAfter(valueFrom, 'day')
      : valueTo
      ? filterTo.isSameOrAfter(valueTo, 'day')
      : false;
  } else {
    return true;
  }
};

// we use a separate map function internally, so the actual filterFn can be pure, so they can also be reused in the apps if needed
export const mapFilterFn = (
  row: Row<unknown>,
  columnId: string,
  filterValue: unknown,
  filterFn: (filterValue: IntentionalAny, data: unknown) => boolean
) => {
  const value = row?.getValue?.(columnId);
  return filterFn(filterValue, value);
};
