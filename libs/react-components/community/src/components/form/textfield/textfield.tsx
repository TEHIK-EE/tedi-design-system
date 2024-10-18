import cn from 'classnames';
import React, { forwardRef } from 'react';

import FormLabel, { FormLabelProps } from '../../../../../tedi/src/components/form/form-label/form-label';
import { useLabels } from '../../../../../tedi/src/providers/label-provider';
import Button, { ButtonProps } from '../../button/button';
import { Icon, IconProps } from '../../icon/icon';
import Separator from '../../separator/separator';
import FormHelper, { FormHelperProps } from '../form-helper/form-helper';
import styles from './textfield.module.scss';

export interface TextFieldProps extends Omit<FormLabelProps, 'size'> {
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
   * Input textfield size.
   */
  size?: 'default' | 'small' | 'large';
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
   * Hides the arrows for input type="number"
   * @default true
   */
  isArrowsHidden?: boolean;
  /**
   * Adds a clear button to the input when input is filled
   */
  isClearable?: boolean;
  /**
   * Callback when clear button is clicked.
   * Useful in other components like pickers to clear the internally managed state
   */
  onClear?: () => void;
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
    hideLabel,
    invalid,
    readOnly,
    icon,
    onIconClick,
    size,
    placeholder,
    isArrowsHidden = true,
    isClearable,
    onClear,
    onChange,
    onChangeEvent,
    onKeyUp,
    onKeyDown,
    onKeyPress,
    defaultValue,
    value: externalValue,
    onFocus,
    onBlur,
    onClick,
    helper,
    input,
    name,
    isTextArea,
    ...rest
  } = props || {};
  const { getLabel } = useLabels();
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [innerValue, setInnerValue] = React.useState(externalValue ?? defaultValue ?? '');
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

  const value = React.useMemo(() => externalValue ?? innerValue, [externalValue, innerValue]);
  const showClearButton = isClearable && value;

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

  const labelSize = size === 'large' ? 'default' : size;

  const getIcon = React.useCallback(
    (icon: string | IconProps): JSX.Element => {
      const defaultIconProps: Partial<IconProps> = {
        size: size === 'large' ? 24 : 16,
        className: cn(styles['textfield__icon']),
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
    },
    [disabled, onIconClick, size]
  );

  const onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = React.useCallback(
    (event) => {
      const newValue = event.currentTarget.value;
      setInnerValue(newValue);
      onChange?.(newValue);
      onChangeEvent?.(event);
    },
    [onChange, onChangeEvent]
  );

  const clearInput = React.useCallback(() => {
    setInnerValue('');
    onChange?.('');
    onClear?.();
  }, [onChange, onClear]);

  const isTextAreaRef = React.useCallback(
    (
      props: TextFieldProps,
      ref: React.ForwardedRef<any> // eslint-disable-line  @typescript-eslint/no-explicit-any
    ): ref is React.ForwardedRef<HTMLTextAreaElement> => {
      return !!isTextArea;
    },
    [isTextArea]
  );

  const isInputRef = React.useCallback(
    (
      props: TextFieldProps,
      ref: React.ForwardedRef<any> // eslint-disable-line  @typescript-eslint/no-explicit-any
    ): ref is React.ForwardedRef<HTMLInputElement> => {
      return !isTextArea;
    },
    [isTextArea]
  );

  const renderInputElement = React.useMemo((): JSX.Element | null => {
    const sharedProps = {
      'aria-describedby': helperId,
      ...input,
      id,
      className: cn(styles['textfield__input'], inputClassName, {
        [styles['textfield__input--hidden-arrows']]: isArrowsHidden,
      }),
      disabled,
      required,
      'aria-invalid': isInvalid,
      placeholder,
      readOnly,
      onChange: onChangeHandler,
      value,
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
  }, [
    disabled,
    helperId,
    id,
    input,
    inputClassName,
    isArrowsHidden,
    isInputRef,
    isInvalid,
    isTextAreaRef,
    name,
    onBlur,
    onChangeHandler,
    onFocus,
    placeholder,
    props,
    readOnly,
    required,
    value,
  ]);

  const renderClearButton = React.useMemo(() => {
    const defaultButtonProps: Partial<ButtonProps> = {
      icon: { name: 'clear', size: size === 'large' ? 24 : 16, color: 'muted' },
      visualType: 'link',
    };

    return (
      <Button {...defaultButtonProps} onClick={clearInput}>
        {`${getLabel('clear')} ${label}`}
      </Button>
    );
  }, [clearInput, getLabel, label, size]);

  const renderRightArea = React.useMemo(() => {
    return (
      <div className={styles['textfield__right-area']}>
        {showClearButton && renderClearButton}
        {showClearButton && icon ? <Separator axis="vertical" className={styles['textfield__separator']} /> : null}
        {icon && getIcon(icon)}
      </div>
    );
  }, [getIcon, icon, renderClearButton, showClearButton]);

  const TextFieldBEM = cn(
    styles['textfield'],
    { [styles[`textfield--${size}`]]: size },
    { [styles['textfield--with-icon']]: icon },
    { [styles['textfield--invalid']]: isInvalid },
    { [styles['textfield--valid']]: isValid },
    { [styles['textfield--clearable']]: showClearButton },
    className
  );

  return (
    <div data-name="textfield" {...rest} className={TextFieldBEM}>
      <FormLabel id={id} label={label} required={required} hideLabel={hideLabel} size={labelSize} />
      <div
        className={styles['textfield__inner']}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onClick={onClick}
        ref={innerRef}
      >
        {renderInputElement}
        {isClearable || icon ? renderRightArea : null}
      </div>
      {helper && <FormHelper {...helper} id={helperId} />}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;
