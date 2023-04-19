import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';
import React from 'react';

import { TextFieldProps } from '../../textfield/textfield';
import MuiInputTransition from '../mui-input-transition/mui-input-transition';

export type TimePickerValue = Dayjs | null;

export interface TimePickerProps extends Omit<TextFieldProps, 'defaultValue' | 'value' | 'onChange'> {
  /**
   * TimePicker initial value. Accepts a dayjs date object.
   */
  defaultValue?: TimePickerValue;
  /**
   * Currently selected value. Accepts a dayjs date object.
   * Used only if onChange is also defined
   */
  value?: TimePickerValue;
  /**
   * onChange handler.
   * Triggers each time when new value is selected from TimePicker.
   */
  onChange?: (value: TimePickerValue) => void;
  /**
   * Format string.
   * @default HH:mm
   */
  inputFormat?: string;
  /**
   * Mobile picker title, displaying in the toolbar. Default from LabelProvider
   */
  toolbarTitle?: string;
  /**
   * Max time acceptable time. For input validation date part of passed object will be ignored.
   */
  maxTime?: TimePickerValue;
  /**
   * Min time acceptable time. For input validation date part of passed object will be ignored.
   */
  minTime?: TimePickerValue;
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep?: number;
  /**
   * Callback that fired when input value or new value prop validation returns new validation error (or value is valid after error).
   * In case of validation error detected reason prop return non-null value and TextField must be displayed in error state.
   * This can be used to render appropriate form error.
   * Read the guide about form integration and error displaying (https://next.material-ui-pickers.dev/guides/forms).
   */
  onError?: (reason: string | null, value: TimePickerValue) => void;
  /**
   * Dynamically check if time is disabled or not. If returns false appropriate time point will ot be acceptable.
   * timeValue: The value to check.
   * clockType: The clock type of the timeValue.
   * returns (boolean): Returns true if the time should be disabled
   */
  shouldDisableTime?: (timeValue: TimePickerValue, view: string) => boolean;
  /**
   * Array of views to show.
   * @default ['hours', 'minutes']
   */
  views?: Array<'hours' | 'minutes' | 'seconds'>;
  /**
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm?: boolean;
}

export const TimePicker = (props: TimePickerProps): JSX.Element => {
  const {
    defaultValue,
    onChange,
    value,
    disabled,
    readOnly,
    inputFormat = 'HH:mm',
    toolbarTitle,
    maxTime,
    minTime,
    minutesStep = 1,
    onError,
    shouldDisableTime,
    views = ['hours', 'minutes'],
    ampm = false,
    ...rest
  } = props;
  const [innerTime, setInnerTime] = React.useState<TimePickerValue>(defaultValue || null);
  const [open, setOpen] = React.useState(false);

  const getValue = React.useMemo((): TimePickerValue => {
    return onChange && typeof value !== 'undefined' ? value : innerTime;
  }, [innerTime, onChange, value]);

  const onChangeHandler = (time: TimePickerValue): void => {
    if (!time?.isValid() && time !== null) {
      return;
    }

    if (typeof value === 'undefined') {
      setInnerTime(time);
    }

    onChange?.(time);
  };

  return (
    <MuiTimePicker<TimePickerValue>
      data-name="timepicker"
      value={getValue}
      onChange={onChangeHandler}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      slots={{
        TextField: (props) => (
          <MuiInputTransition
            muiTextfieldProps={props}
            inputFormat={inputFormat}
            onChangeHandler={onChangeHandler}
            textfieldProps={{ ...rest, onIconClick: !readOnly ? () => setOpen((open) => !open) : undefined }}
            type="time"
          />
        ),
      }}
      localeText={{ toolbarTitle }}
      disabled={disabled}
      readOnly={readOnly}
      format={inputFormat}
      maxTime={maxTime}
      minTime={minTime}
      minutesStep={minutesStep}
      onError={onError}
      shouldDisableTime={shouldDisableTime}
      views={views}
      ampm={ampm}
    />
  );
};

export default TimePicker;
