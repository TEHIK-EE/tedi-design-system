import cn from 'classnames';
import React, { forwardRef } from 'react';

import { Icon, IconProps } from '../../icon/icon';
import FormHelper, { FormHelperProps } from '../form-helper/form-helper';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import styles from './textfield.module.scss';

export interface TextFieldProps extends FormLabelProps {
  /**
   * ID attribute.
   */
  id: string;
  /**
   * Input field placeholder.
   */
  placeholder?: string;
  /**
   * Additional classes.
   */
  className?: string;
  /*
   * Field name
   * */
  name?: string;
  /**
   * Additional classes to input element.
   */
  inputClassName?: string;
  /**
   * onChange callback handler.
   */
  onChange?: (value: string) => void;
  /**
   * OnChange callback handler which gives out full event object.
   * Needed for react-datepicker and maybe for other use-cases.
   */
  onChangeEvent?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /*
   * onKeyPress callback handler
   * */
  onKeyPress?: React.KeyboardEventHandler<HTMLDivElement>;
  /*
   * onKeyDown callback handler
   * */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /*
   * onKeyUp callback handler
   * */
  onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Default value of input.
   */
  defaultValue?: string;
  /**
   * Value of input to control input value from outside of component.
   * Do not use with defaultValue
   */
  value?: string;
  /**
   * Textfield icon name or IconProps object.
   */
  icon?: string | IconProps;
  /**
   * Callback on icon click.
   */
  onIconClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  /**
   * Callback on input click.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Custom icon className.
   * This can also be achieved by passing an object to the icon props.
   * @deprecated - Pass an IconProps object to icon instead
   */
  iconClassName?: string;
  /**
   * Input textfield size.
   */
  size?: 'small';
  /**
   * If textfield is disabled.
   */
  disabled?: boolean;
  /**
   * If textfield is invalid.
   */
  invalid?: boolean;
  /**
   * If textfield is readonly.
   */
  readOnly?: boolean;
  /**
   * Textfield helper.
   */
  helper?: FormHelperProps;
  /**
   * If textfield is textarea
   */
  isTextArea?: boolean;
  /**
   * onFocus callback handler.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * onBlur callback handler.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Additional input attributes.
   */
  input?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export interface TextFieldForwardRef {
  input: HTMLInputElement | HTMLTextAreaElement | null;
  inner: HTMLDivElement | null;
}

export const TextField = forwardRef<TextFieldForwardRef, TextFieldProps>((props, ref): JSX.Element => {
  const {
    id,
    label,
    className,
    inputClassName,
    disabled,
    required,
    requiredLabel,
    hideLabel,
    invalid,
    iconClassName,
    readOnly,
    icon,
    onIconClick,
    size,
    placeholder,
    onChange,
    onChangeEvent,
    onKeyUp,
    onKeyDown,
    onKeyPress,
    defaultValue,
    value,
    onFocus,
    onBlur,
    onClick,
    helper,
    input,
    name,
    isTextArea,
    ...rest
  } = props || {};
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

  React.useImperativeHandle(ref, () => ({
    get input() {
      return inputRef.current;
    },
    get inner() {
      return innerRef.current;
    },
  }));

  const isInvalid = React.useMemo((): boolean => {
    return invalid || helper?.type === 'error';
  }, [invalid, helper]);

  const isValid = React.useMemo((): boolean => {
    return !invalid && helper?.type === 'valid';
  }, [invalid, helper]);

  const getIcon = (icon: string | IconProps): JSX.Element => {
    const defaultIconProps: Partial<IconProps> = {
      size: 16,
      className: cn(styles['textfield__icon'], iconClassName),
    };
    const iconProps: IconProps =
      typeof icon === 'string'
        ? { ...defaultIconProps, name: icon }
        : { ...defaultIconProps, ...icon, className: cn(defaultIconProps.className, icon?.className) };
    const iconComponent = <Icon {...iconProps} />;
    const WrapperElement = onIconClick ? 'button' : 'div';

    return (
      <WrapperElement
        className={styles['textfield__icon-wrapper']}
        type={onIconClick ? 'button' : undefined}
        onClick={onIconClick}
        disabled={disabled}
      >
        {iconComponent}
      </WrapperElement>
    );
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    const value = event.currentTarget.value;
    onChange?.(value);
    onChangeEvent?.(event);
  };

  const isTextAreaRef = (
    props: TextFieldProps,
    ref: React.ForwardedRef<any> // eslint-disable-line  @typescript-eslint/no-explicit-any
  ): ref is React.ForwardedRef<HTMLTextAreaElement> => {
    return !!isTextArea;
  };

  const isInputRef = (
    props: TextFieldProps,
    ref: React.ForwardedRef<any> // eslint-disable-line  @typescript-eslint/no-explicit-any
  ): ref is React.ForwardedRef<HTMLInputElement> => {
    return !isTextArea;
  };

  const renderInputElement = (): JSX.Element | null => {
    const sharedProps = {
      'aria-describedby': helperId,
      ...input,
      id,
      className: cn(styles['textfield__input'], inputClassName),
      disabled,
      required,
      'aria-invalid': isInvalid,
      placeholder,
      readOnly,
      onChange: onChangeHandler,
      value,
      defaultValue,
      onBlur,
      onFocus,
      name,
    };

    if (isTextAreaRef(props, inputRef)) {
      return <textarea {...(sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} ref={inputRef} />;
    }

    if (isInputRef(props, inputRef)) {
      return <input {...(sharedProps as React.InputHTMLAttributes<HTMLInputElement>)} ref={inputRef} />;
    }

    return null;
  };

  const TextFieldBEM = cn(
    styles['textfield'],
    { [styles[`textfield--${size}`]]: size },
    { [styles['textfield--with-icon']]: icon },
    { [styles['textfield--invalid']]: isInvalid },
    { [styles['textfield--valid']]: isValid },
    className
  );

  return (
    <div data-name="textfield" {...rest} className={TextFieldBEM}>
      <FormLabel
        id={id}
        label={label}
        requiredLabel={requiredLabel}
        required={required}
        hideLabel={hideLabel}
        size={size}
      />
      <div
        className={styles['textfield__inner']}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onClick={onClick}
        ref={innerRef}
      >
        {renderInputElement()}
        {icon && getIcon(icon)}
      </div>
      {helper && <FormHelper {...helper} id={helperId} />}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;
