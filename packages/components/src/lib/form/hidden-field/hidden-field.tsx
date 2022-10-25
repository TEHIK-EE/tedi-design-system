import cn from 'classnames';
import React from 'react';

import { DateTimePicker, DateTimePickerProps } from '../pickers';
import Select, { SelectProps, TSelectValue } from '../select/select';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './hidden-field.module.scss';

export interface HiddenFieldDefaultProps {
  /*
   * Classname for the button/displayed content
   * */
  className?: string;
  /*
   * Content displayed when not a field
   * */
  content: React.ReactNode;
}

/*
 * Example of field-specific interface, containing specific fieldType and corresponding Prop type
 * */
export interface HiddenTextFieldProps extends HiddenFieldDefaultProps {
  fieldType: 'textfield';
  fieldOptions: TextFieldProps;
}

export interface HiddenSelectProps extends HiddenFieldDefaultProps {
  fieldType: 'select';
  fieldOptions: SelectProps;
}

export interface HiddenDateTimeProps extends HiddenFieldDefaultProps {
  fieldType: 'datetime';
  fieldOptions: DateTimePickerProps;
}

export type HiddenFieldProps = HiddenTextFieldProps | HiddenSelectProps | HiddenDateTimeProps;

const isTextFieldProps = (props: HiddenFieldProps): props is HiddenTextFieldProps => {
  return props.fieldType === 'textfield';
};

const isSelectProps = (props: HiddenFieldProps): props is HiddenSelectProps => {
  return props.fieldType === 'select';
};

const isDateTimeProps = (props: HiddenFieldProps): props is HiddenDateTimeProps => {
  return props.fieldType === 'datetime';
};

export const HiddenField = (props: HiddenFieldProps): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<TextFieldForwardRef>(null);

  React.useEffect(() => {
    if (isTextFieldProps(props) && inputRef.current?.input && isOpen) {
      inputRef.current?.input.focus();
    }
  }, [isOpen, props]);

  const HiddenTextField = (props: HiddenTextFieldProps) => {
    const { className, onBlur, onKeyDown, ...rest } = props.fieldOptions;
    const TextFieldBEM = cn(className, styles['hidden-field']);

    const closeField: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
      onBlur?.(e);
      setIsOpen(false);
    };

    return (
      <TextField
        {...rest}
        hideLabel
        size="small"
        className={TextFieldBEM}
        inputClassName={styles['hidden-field__input']}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === 'enter' || event.keyCode === 13 || event.which === 13) {
            event.preventDefault();
            closeField(event as unknown as React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>);
          }
        }}
        onBlur={closeField}
        ref={inputRef}
      />
    );
  };

  const HiddenSelectField = (props: HiddenSelectProps) => {
    const { className, onBlur, onChange, closeMenuOnSelect = false, ...rest } = props.fieldOptions;
    const SelectBEM = cn(className, styles['hidden-field'], styles['hidden-field--select']);

    const handleBlur = () => {
      onBlur?.();
      setIsOpen(false);
    };

    const handleChange = (value: TSelectValue) => {
      onChange?.(value);
      if (closeMenuOnSelect) {
        setIsOpen(false);
      }
    };

    return (
      <Select
        autoFocus
        {...rest}
        onBlur={handleBlur}
        onChange={handleChange}
        className={SelectBEM}
        hideLabel
        size="small"
      />
    );
  };

  const HiddenDateTimeField = (props: HiddenDateTimeProps) => {
    const { className: fieldClassName, onBlur, ...rest } = props.fieldOptions;
    const DateTimeBEM = cn(fieldClassName, styles['hidden-field'], styles['hidden-field--datetime']);

    const handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
      setIsOpen(false);
      onBlur?.(e);
    };

    return <DateTimePicker {...rest} hideLabel className={DateTimeBEM} onBlur={handleBlur} />;
  };

  return (
    <>
      {isTextFieldProps(props) && isOpen ? <HiddenTextField {...props} /> : null}
      {isSelectProps(props) && isOpen ? <HiddenSelectField {...props} /> : null}
      {isDateTimeProps(props) && isOpen ? <HiddenDateTimeField {...props} /> : null}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(styles['hidden-field-button'], 'text-small', { hidden: isOpen }, props.className)}
      >
        {props.content}
      </button>
    </>
  );
};

export default HiddenField;
