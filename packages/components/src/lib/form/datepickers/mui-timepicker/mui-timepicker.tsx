import { ClockPickerView } from '@mui/x-date-pickers';
import { TimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useTimeValidation';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import React from 'react';

import { useLabels } from '../../../label-provider';
import { TextFieldProps } from '../../textfield/textfield';
import MuiInputTranstition from '../mui-input-transition/mui-input-transition';

export type MuiTimePickerValue = Dayjs | null;

export interface MuiTimePickerProps extends Omit<TextFieldProps, 'defaultValue' | 'value' | 'onChange'> {
  /**
   * TimePicker initial value. Accepts a dayjs date object.
   */
  defaultValue?: MuiTimePickerValue;
  /**
   * Currently selected value. Accepts a dayjs date object.
   * Used only if onChange is also defined
   */
  value?: MuiTimePickerValue;
  /**
   * onChange handler.
   * Triggers each time when new value is selected from TimePicker.
   */
  onChange?: (value: MuiTimePickerValue) => void;
  /**
   * Format string. Defaults to HH:mm
   */
  inputFormat?: string;
  /**
   * Mobile picker title, displaying in the toolbar. Default from LabelProvider
   */
  toolbarTitle?: string;
  /**
   * Max time acceptable time. For input validation date part of passed object will be ignored.
   */
  maxTime?: MuiTimePickerValue;
  /**
   * Min time acceptable time. For input validation date part of passed object will be ignored.
   */
  minTime?: MuiTimePickerValue;
  /**
   * Step over minutes. Defaults to 1
   */
  minutesStep?: number;
  /**
   * Callback that fired when input value or new value prop validation returns new validation error (or value is valid after error).
   * In case of validation error detected reason prop return non-null value and TextField must be displayed in error state.
   * This can be used to render appropriate form error.
   * Read the guide about form integration and error displaying (https://next.material-ui-pickers.dev/guides/forms).
   */
  onError?: (reason: TimeValidationError, value: MuiTimePickerValue) => void;
  /**
   * Dynamically check if time is disabled or not. If returns false appropriate time point will ot be acceptable.
   * timeValue: The value to check.
   * clockType: The clock type of the timeValue.
   * returns (boolean): Returns true if the time should be disabled
   */
  shouldDisableTime?: (timeValue: number, clockType: ClockPickerView) => boolean;
  /**
   * Array of views to show.
   */
  views?: Array<'hours' | 'minutes' | 'seconds'>;
  /**
   * 12h/24h view for hour selection clock.
   * Defaults to false,
   */
  ampm?: boolean;
}

export const MuiTimePicker = (props: MuiTimePickerProps): JSX.Element => {
  const { getLabel } = useLabels();

  const {
    defaultValue,
    onChange,
    value,
    disabled,
    readOnly,
    inputFormat = 'HH:mm',
    toolbarTitle = getLabel('timepicker.toolbarTitle'),
    maxTime,
    minTime,
    minutesStep = 1,
    onError,
    shouldDisableTime,
    views = ['hours', 'minutes'],
    ampm = false,
    ...rest
  } = props;
  const [innerTime, setInnerTime] = React.useState<MuiTimePickerValue>(defaultValue || null);
  const [open, setOpen] = React.useState(false);

  const getValue = React.useMemo((): MuiTimePickerValue => {
    return onChange && typeof value !== 'undefined' ? value : innerTime;
  }, [innerTime, onChange, value]);

  const onChangeHandler = (time: MuiTimePickerValue): void => {
    if (!time?.isValid() && time !== null) {
      return;
    }

    if (typeof value === 'undefined') {
      setInnerTime(time);
    }

    onChange?.(time);
  };

  return (
    <TimePicker<MuiTimePickerValue>
      value={getValue}
      onChange={onChangeHandler}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderInput={(props) => (
        <MuiInputTranstition
          muiTextfieldProps={props}
          inputFormat={inputFormat}
          onChangeHandler={onChangeHandler}
          textfieldProps={{ ...rest, onIconClick: !readOnly ? () => setOpen((open) => !open) : undefined }}
          type="time"
        />
      )}
      disabled={disabled}
      readOnly={readOnly}
      inputFormat={inputFormat}
      toolbarTitle={toolbarTitle}
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

export default MuiTimePicker;
