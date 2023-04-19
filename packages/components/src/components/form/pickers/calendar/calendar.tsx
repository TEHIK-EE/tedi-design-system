import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import cn from 'classnames';
import type { Dayjs } from 'dayjs';
import React from 'react';

import styles from './calendar.module.scss';

export type CalendarValue = Dayjs | null;
export type CalendarStatus = 'error' | 'success' | 'inactive';

export interface CalendarProps {
  /**
   * Currently selected value. Accepts a dayjs date object.
   * Used only if onChange is also defined
   */
  value?: CalendarValue;
  /**
   * Calendar picker initial value. Accepts a dayjs date object.
   */
  defaultValue?: CalendarValue;
  /**
   * onChange handler.
   * Triggers each time when new value is selected from calendar picker.
   */
  onChange?: (value: CalendarValue) => void;
  /**
   * If true, the picker and text field are disabled.
   */
  disabled?: boolean;
  /**
   * If true future days are disabled.
   */
  disableFuture?: boolean;
  /**
   * If true, today's date is rendering without highlighting with circle.
   */
  disableHighlightToday?: boolean;
  /**
   * If true past days are disabled.
   */
  disablePast?: boolean;
  /**
   * If true renders LoadingComponent in calendar instead of calendar view. Can be used to preload information and show it in calendar.
   */
  loading?: boolean;
  /**
   * minDate to set minDate user can select.
   * If want to disable past dates use disablePast boolean.
   */
  minDate?: Dayjs;
  /**
   * maxDate to set maxDate user can select.
   * If want to disable future dates use disableFuture boolean.
   */
  maxDate?: Dayjs;
  /**
   * Make picker read only.
   */
  readOnly?: boolean;
  /**
   * Controlled open view.
   * @default day
   */
  view?: 'day' | 'month' | 'year';
  /**
   * Views for calendar picker.
   * @default [day]
   */
  views?: Array<'day' | 'month' | 'year'>;
  /**
   * If true, days that have outsideCurrentMonth={true} are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth?: boolean;
  /**
   * Highlight specific date
   */
  shouldHighlightDate?: (day: CalendarValue) => boolean;
  /**
   * Disable specific date.
   */
  shouldDisableDate?: (day: CalendarValue) => boolean;
  /**
   * Disable specific months dynamically. Works like shouldDisableDate but for month selection view
   */
  shouldDisableMonth?: (month: CalendarValue) => boolean;
  /**
   * Disable specific years dynamically. Works like shouldDisableDate but for year selection view
   */
  shouldDisableYear?: (month: CalendarValue) => boolean;
  /**
   * Shows status on date. Return the status type or undefined
   */
  shouldShowStatusOnDate?: (day: CalendarValue) => CalendarStatus | undefined;
}

export const Calendar = (props: CalendarProps): JSX.Element => {
  const {
    value,
    defaultValue,
    onChange,
    disabled,
    disableFuture,
    disableHighlightToday,
    disablePast,
    loading,
    minDate,
    maxDate,
    readOnly,
    view = 'day',
    views = ['day'],
    showDaysOutsideCurrentMonth = false,
    shouldHighlightDate,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    shouldShowStatusOnDate,
  } = props;

  const [innerDate, setInnerDate] = React.useState<CalendarValue>(defaultValue || null);

  const getValue = React.useMemo((): CalendarValue => {
    return onChange && typeof value !== 'undefined' ? value : innerDate;
  }, [innerDate, onChange, value]);

  const onChangeHandler = (selectedDate: CalendarValue): void => {
    if (!selectedDate?.isValid() && selectedDate !== null) {
      return;
    }

    if (typeof value === 'undefined') {
      setInnerDate(selectedDate);
    }

    if (selectedDate?.isSame(innerDate)) {
      return;
    }

    onChange?.(selectedDate);
  };

  const dayRenderer = (props: PickersDayProps<CalendarValue>) => {
    const { day } = props;
    const isHighlightedDay = shouldHighlightDate?.(day);
    const statusOnDay: CalendarStatus | undefined = shouldShowStatusOnDate?.(day);

    const dayBEM = cn(
      { 'Mui-highlighted': isHighlightedDay },
      { [styles[`calendar__day--status-${statusOnDay}`]]: statusOnDay }
    );

    return <PickersDay className={dayBEM} {...props} />;
  };

  return (
    <DateCalendar<CalendarValue>
      data-name="calendar"
      value={getValue}
      onChange={onChangeHandler}
      disabled={disabled}
      disableFuture={disableFuture}
      disableHighlightToday={disableHighlightToday}
      disablePast={disablePast}
      loading={loading}
      minDate={minDate}
      maxDate={maxDate}
      readOnly={readOnly}
      slots={{ day: dayRenderer }}
      shouldDisableDate={shouldDisableDate}
      shouldDisableMonth={shouldDisableMonth}
      shouldDisableYear={shouldDisableYear}
      showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
      view={view}
      views={views}
    />
  );
};

export default Calendar;
