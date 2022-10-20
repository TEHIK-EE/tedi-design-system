import { DatePicker } from '@mui/x-date-pickers';
import { DateValidationError } from '@mui/x-date-pickers/internals';
import { Dayjs } from 'dayjs';
import React from 'react';

import { useLabels } from '../../../label-provider';
import { TextFieldProps } from '../../textfield/textfield';
import MuiInputTranstition from '../mui-input-transition/mui-input-transition';
export type MuiDatepickerValue = Dayjs | null;

export interface MuiDatePickerProps extends Omit<TextFieldProps, 'defaultValue' | 'value' | 'onChange'> {
  /**
   * Datepicker initial value. Accepts a dayjs date object.
   */
  defaultValue?: MuiDatepickerValue;
  /**
   * Currently selected value. Accepts a dayjs date object.
   * Used only if onChange is also defined
   */
  value?: MuiDatepickerValue;
  /**
   * onChange handler.
   * Triggers each time when new value is selected from datepicker.
   */
  onChange?: (value: MuiDatepickerValue) => void;
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
  shouldDisableDate?: (day: MuiDatepickerValue) => boolean;
  /**
   * Disable specific months dynamically. Works like shouldDisableDate but for month selection view
   */
  shouldDisableMonth?: (month: MuiDatepickerValue) => boolean;
  /**
   * Disable specific years dynamically. Works like shouldDisableDate but for year selection view
   */
  shouldDisableYear?: (month: MuiDatepickerValue) => boolean;
  /**
   * Mobile picker title, displaying in the toolbar. Default from LabelProvider
   */
  toolbarTitle?: string;
  /**
   * Format string. Defaults to DD.MM.YYYY
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
  onError?: (reason: DateValidationError, value: MuiDatepickerValue) => void;
  /**
   * Array of views to show.
   */
  views?: Array<'day' | 'month' | 'year'>;
}

export const MuiDatePicker = (props: MuiDatePickerProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    disabled,
    readOnly,
    toolbarTitle = getLabel('datepicker.toolbarTitle'),
    disableFuture,
    disablePast,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    disableHighlightToday,
    inputFormat = 'DD.MM.YYYY',
    views = ['year', 'day'],
    onError,
    loading,
    ...rest
  } = props;
  const [innerDate, setInnerDate] = React.useState<MuiDatepickerValue>(defaultValue || null);
  const [open, setOpen] = React.useState(false);

  const getValue = React.useMemo((): MuiDatepickerValue => {
    return onChange && typeof value !== 'undefined' ? value : innerDate;
  }, [innerDate, onChange, value]);

  const onChangeHandler = (date: MuiDatepickerValue): void => {
    if (!date?.isValid() && date !== null) {
      return;
    }

    if (typeof value === 'undefined') {
      setInnerDate(date);
    }

    onChange?.(date);
  };

  return (
    <DatePicker<MuiDatepickerValue>
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
      maxDate={maxDate}
      toolbarTitle={toolbarTitle}
      onError={onError}
      loading={loading}
      views={views}
    />
  );
};

export default MuiDatePicker;
