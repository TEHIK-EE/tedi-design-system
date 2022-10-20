import { ClockPickerView, DateTimePicker } from '@mui/x-date-pickers';
import { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import { Dayjs } from 'dayjs';
import React from 'react';

import { useLabels } from '../../../label-provider';
import { TextFieldProps } from '../../textfield/textfield';
import MuiInputTranstition from '../mui-input-transition/mui-input-transition';
export type MuiDateTimepickerValue = Dayjs | null;

export interface MuiDateTimePickerProps extends Omit<TextFieldProps, 'defaultValue' | 'value' | 'onChange'> {
  /**
   * DateTimepicker initial value. Accepts a dayjs date object.
   */
  defaultValue?: MuiDateTimepickerValue;
  /**
   * Currently selected value. Accepts a dayjs date object.
   * Used only if onChange is also defined
   */
  value?: MuiDateTimepickerValue;
  /**
   * onChange handler.
   * Triggers each time when new value is selected from datetimepicker.
   */
  onChange?: (value: MuiDateTimepickerValue) => void;
  /**
   * Minimal selectable date.
   * If want to disable past dates use disablePast boolean.
   */
  minDate?: Dayjs;
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use minTime.
   */
  minDateTime?: Dayjs;
  /**
   * Min time acceptable time
   */
  minTime?: Dayjs;
  /**
   * Maximal selectable date.
   * If want to disable future dates use disableFuture boolean.
   */
  maxDate?: Dayjs;
  /**
   * Maximal selectable moment of time with binding to date, to set max time in each day use maxTime.
   */
  maxDateTime?: Dayjs;
  /**
   * Max time acceptable time.
   */
  maxTime?: Dayjs;
  /**
   * Step over minutes.
   */
  minutesStep?: number;
  /**
   * If true future days are disabled.
   */
  disableFuture?: boolean;
  /**
   * If true past days are disabled.
   */
  disablePast?: boolean;
  /**
   * If true, today's date is rendering without highlighting with circle.
   */
  disableHighlightToday?: boolean;
  /**
   * Disable specific date.
   */
  shouldDisableDate?: (day: MuiDateTimepickerValue) => boolean;
  /**
   * Disable specific months dynamically. Works like shouldDisableDate but for month selection view
   */
  shouldDisableMonth?: (month: MuiDateTimepickerValue) => boolean;
  /**
   * Dynamically check if time is disabled or not. If returns false appropriate time point will ot be acceptable.
   */
  shouldDisableTime?: (timeValue: number, clockType: ClockPickerView) => boolean;
  /**
   * Disable specific years dynamically. Works like shouldDisableDate but for year selection view
   */
  shouldDisableYear?: (month: MuiDateTimepickerValue) => boolean;
  /**
   * Mobile picker title, displaying in the toolbar. Default from LabelProvider
   */
  toolbarTitle?: string;
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat?: string;
  /**
   * Format string. Defaults to DD.MM.YYYY HH:mm
   */
  inputFormat?: string;
  /**
   * If true renders LoadingComponent in calendar instead of calendar view. Can be used to preload information and show it in calendar.
   */
  loading?: boolean;
  /**
   * Callback that fired when input value or new value prop validation returns new validation error (or value is valid after error).
   * In case of validation error detected reason prop return non-null value and TextField must be displayed in error state.
   * This can be used to render appropriate form error.
   * Read the guide about form integration and error displaying (https://next.material-ui-pickers.dev/guides/forms).
   */
  onError?: (reason: DateTimeValidationError, value: MuiDateTimepickerValue) => void;
  /**
   * Array of views to show.
   */
  views?: Array<'day' | 'hours' | 'minutes' | 'month' | 'seconds' | 'year'>;
  /**
   * Custom mask. Can be used to override generate from format. (e.g. __/__/____ __:__ or __/__/____ __:__ _M).
   * Defaults to __.__.____ __:__
   */
  mask?: string;
  /**
   * 12h/24h view for hour selection clock.
   * Defaults to false,
   */
  ampm?: boolean;
}

export const MuiDateTimePicker = (props: MuiDateTimePickerProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    value,
    defaultValue,
    onChange,
    minDate,
    minDateTime,
    minTime,
    maxDate,
    maxDateTime,
    maxTime,
    minutesStep = 1,
    disabled,
    readOnly,
    toolbarTitle = getLabel('datetimepicker.toolbarTitle'),
    toolbarFormat,
    disableFuture,
    disablePast,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    disableHighlightToday,
    inputFormat = 'DD.MM.YYYY HH:mm',
    views = ['year', 'day', 'hours', 'minutes'],
    onError,
    loading,
    mask = '__.__.____ __:__',
    ampm = false,
    ...rest
  } = props;
  const [innerDate, setInnerDate] = React.useState<MuiDateTimepickerValue>(defaultValue || null);
  const [open, setOpen] = React.useState(false);

  const getValue = React.useMemo((): MuiDateTimepickerValue => {
    return onChange && typeof value !== 'undefined' ? value : innerDate;
  }, [innerDate, onChange, value]);

  const onChangeHandler = (date: MuiDateTimepickerValue): void => {
    if (!date?.isValid() && date !== null) {
      return;
    }

    if (typeof value === 'undefined') {
      setInnerDate(date);
    }

    onChange?.(date);
  };

  return (
    <DateTimePicker<MuiDateTimepickerValue>
      value={getValue}
      onChange={onChangeHandler}
      renderInput={(props) => (
        <MuiInputTranstition
          muiTextfieldProps={props}
          inputFormat={inputFormat}
          onChangeHandler={onChangeHandler}
          textfieldProps={{ ...rest, onIconClick: !readOnly ? () => setOpen((open) => !open) : undefined }}
        />
      )}
      open={open}
      inputFormat={inputFormat}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      disabled={disabled}
      disableFuture={disableFuture}
      disablePast={disablePast}
      shouldDisableDate={shouldDisableDate}
      shouldDisableMonth={shouldDisableMonth}
      shouldDisableYear={shouldDisableYear}
      disableHighlightToday={disableHighlightToday}
      readOnly={readOnly}
      minDate={minDate}
      minDateTime={minDateTime}
      minTime={minTime}
      maxDate={maxDate}
      maxDateTime={maxDateTime}
      maxTime={maxTime}
      toolbarTitle={toolbarTitle}
      toolbarFormat={toolbarFormat}
      onError={onError}
      loading={loading}
      views={views}
      mask={mask}
      minutesStep={minutesStep}
      ampm={ampm}
    />
  );
};

export default MuiDateTimePicker;
