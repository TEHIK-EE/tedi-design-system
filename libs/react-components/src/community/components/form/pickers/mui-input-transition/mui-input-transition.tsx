import type { TextFieldProps as MuiTextFieldPropsType } from '@mui/material';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React from 'react';

import TextField, {
  TextFieldForwardRef,
  TextFieldProps,
} from '../../../../../tedi/components/form/textfield/textfield';
import { IntentionalAny } from '../../../../types';

export interface MuiInputTransitionProps {
  muiTextfieldProps: MuiTextFieldPropsType;
  textfieldProps: TextFieldProps;
  inputFormat: string;
  onChangeHandler: (date: Dayjs | null) => void;
  type?: 'date' | 'time';
}

const MuiInputTransition = (props: MuiInputTransitionProps) => {
  const { muiTextfieldProps, textfieldProps, inputFormat, onChangeHandler, type = 'date' } = props;
  const { ref, inputRef, inputProps, InputProps, value, size, onChange, error, disabled, ...muiRest } =
    muiTextfieldProps;
  const { readOnly, id, input, ...textfieldRest } = textfieldProps;
  const textfieldRef = React.useRef<TextFieldForwardRef>({ inner: null, input: null });

  React.useEffect(() => {
    if (textfieldRef.current.input) {
      (inputRef as React.RefCallback<HTMLInputElement | HTMLTextAreaElement>)?.(textfieldRef.current.input);
    }
  }, [inputRef]);

  return (
    <TextField
      id={id}
      {...muiRest}
      disabled={disabled}
      readOnly={readOnly}
      {...textfieldRest}
      value={inputProps?.['value']}
      onChangeEvent={(e) => {
        inputProps?.onChange?.(e);
      }}
      placeholder={textfieldProps?.placeholder || inputProps?.placeholder}
      defaultValue={undefined} // Types do not match with MuiDatepicker, and we use controlled value
      ref={textfieldRef}
      input={{ ...inputProps, ...input }}
      invalid={error}
      icon={{
        name: type === 'date' ? 'today' : 'schedule',
        // TODO https://github.com/mui/mui-x/issues/6330
        label: (muiTextfieldProps?.InputProps as IntentionalAny)?.endAdornment?.props?.children?.props?.['aria-label'],
      }}
      onBlur={(e) => {
        textfieldRest.onBlur?.(e);
        muiRest.onBlur?.(e);

        // If date is not valid on blur then clear value and call onChange with null
        if (!dayjs(e.currentTarget.value, inputFormat, true).isValid()) {
          onChangeHandler(null);
          inputProps?.onChange?.({ ...e, target: { ...e.target, value: '' } as EventTarget & HTMLInputElement });
        }
      }}
    />
  );
};

export default MuiInputTransition;
