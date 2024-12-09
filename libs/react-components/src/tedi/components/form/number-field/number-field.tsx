import cn from 'classnames';
import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';

import { FeedbackText, FeedbackTextProps } from '../../../../tedi/components/form/feedback-text/feedback-text';
import { FormLabel, FormLabelProps } from '../../../../tedi/components/form/form-label/form-label';
import { useLabels } from '../../../../tedi/providers/label-provider';
import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { Button } from '../../buttons/button/button';
import { Text } from '../../typography/text/text';
import styles from './number-field.module.scss';

type TDirection = 'increment' | 'decrement';

type NumberFieldBreakpointProps = {
  /**
   * Text displayed after the input value, typically a unit.
   */
  suffix?: string;
  /**
   * Whether the number field occupies the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Helper text displayed below the input.
   */
  helper?: FeedbackTextProps;
  /**
   * Step size for incrementing or decrementing the value.
   * @default 1
   */
  step?: number;
  /**
   * Additional attributes for the underlying input element.
   */
  input?: React.InputHTMLAttributes<HTMLInputElement>;
};

export interface NumberFieldProps extends BreakpointSupport<NumberFieldBreakpointProps>, FormLabelProps {
  /**
   * Initial value of the input field.
   */
  defaultValue?: number;
  /**
   * Controlled value of the input field. Overrides defaultValue.
   */
  value?: number;
  /**
   * Callback fired when the input value changes.
   */
  onChange?: (value: number) => void;
  /**
   * Specifies the input mode for the field (e.g., numeric or decimal).
   * @default numeric
   */
  inputMode?: 'numeric' | 'decimal';
  /**
   * Number of decimal places for rounding calculations.
   */
  decimalPlaces?: number;
  /**
   * Minimum allowed value. Disables decrementing below this value and restricts manual input.
   */
  min?: number;
  /**
   * Maximum allowed value. Disables incrementing above this value and restricts manual input.
   */
  max?: number;
  /**
   * Disables the input field.
   */
  disabled?: boolean;
  /**
   * Marks the field as invalid for validation purposes.
   */
  invalid?: boolean;
}

export const NumberField = (props: NumberFieldProps) => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    id,
    label,
    hideLabel,
    required,
    className,
    size,
    inputMode = 'numeric',
    decimalPlaces,
    min,
    max,
    step = 1,
    defaultValue,
    value,
    onChange,
    suffix,
    fullWidth = false,
    disabled = false,
    invalid = false,
    helper,
    input,
  } = getCurrentBreakpointProps<NumberFieldProps>(props);

  const { getLabel } = useLabels();

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputUpdated, setInputUpdated] = useState<string>('');
  const [inputInnerValue, setInputInnerValue] = useState<number>(defaultValue ?? 0);

  const getCurrentValue = useMemo(
    (): number => (onChange && typeof value !== 'undefined' ? value : inputInnerValue),
    [onChange, value, inputInnerValue]
  );

  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

  const isInvalid = useCallback(
    (currentValue: number): boolean => {
      const isBelowMinValue = Boolean(min !== undefined && currentValue < min);
      const isAboveMaxValue = Boolean(max !== undefined && currentValue > max);
      return invalid || isBelowMinValue || isAboveMaxValue || helper?.type === 'error';
    },
    [invalid, helper, max, min]
  );

  const forceToLimits = (currentValue: number) => {
    return Math.min(max ?? Infinity, Math.max(min ?? -Infinity, currentValue));
  };

  const updateValueUpdatedLabel = (newValue: number) => {
    const valueUpdated = getLabel('numberField.quantityUpdated');
    const valueUpdatedLabel = typeof valueUpdated === 'string' ? valueUpdated : valueUpdated(newValue);

    setInputUpdated(valueUpdatedLabel);
    setTimeout(() => {
      setInputUpdated('');
    }, 5000);
  };

  const roundValue = (currentValue: number) => {
    return decimalPlaces !== undefined ? parseFloat(currentValue.toFixed(decimalPlaces)) : currentValue;
  };

  const handleButtonClick = (direction: TDirection) => {
    let returnValue = getCurrentValue;

    if (direction === 'increment') {
      returnValue = returnValue + step;
    }
    if (direction === 'decrement') {
      returnValue = returnValue - step;
    }

    returnValue = forceToLimits(returnValue);
    returnValue = roundValue(returnValue);

    updateValueUpdatedLabel(returnValue);
    onChange?.(returnValue);
    setInputInnerValue(returnValue);
  };

  const handleInputChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    onChange?.(forceToLimits(+value));
    setInputInnerValue(forceToLimits(+value));
  };

  const renderButton = (direction: TDirection) => {
    const isOnOrOutOfBounds =
      direction === 'increment'
        ? max !== undefined && getCurrentValue >= max
        : min !== undefined && getCurrentValue <= min;

    const ButtonBEM = cn(styles['tedi-number-field__button'], styles[`tedi-number-field__button--${direction}`], {
      [styles['tedi-number-field__button--disabled']]: isOnOrOutOfBounds || disabled,
    });

    const changeValue = getLabel(`numberField.${direction}`);
    const ariaLabel = typeof changeValue === 'string' ? changeValue : changeValue(step);

    return (
      <Button
        aria-label={ariaLabel}
        onClick={() => handleButtonClick(direction)}
        disabled={isOnOrOutOfBounds || disabled}
        visualType="secondary"
        className={ButtonBEM}
        icon={{ name: direction === 'increment' ? 'add' : 'remove' }}
      >
        {direction === 'increment' ? '+' : '-'}
      </Button>
    );
  };

  const renderInputElement = () => {
    const InputWrapperBEM = cn(styles['tedi-number-field__input-wrapper'], {
      [styles['tedi-number-field__input-wrapper--with-suffix']]: suffix,
      [styles['tedi-number-field__input-wrapper--full-width']]: fullWidth,
    });

    const InputBEM = cn(styles['tedi-number-field__input'], input?.className);
    const focusInput = () => inputRef?.current?.focus();

    return (
      <div className={InputWrapperBEM} onClick={focusInput}>
        <input
          ref={inputRef}
          id={id}
          aria-describedby={helperId}
          aria-invalid={invalid}
          type="number"
          inputMode={inputMode}
          value={getCurrentValue}
          min={min}
          max={max}
          required={required}
          step={step}
          disabled={disabled}
          onChange={handleInputChange}
          className={InputBEM}
          {...input}
        />
        {suffix && (
          <Text element="span" modifiers="small" color="tertiary" className={styles['tedi-number-field__suffix']}>
            {suffix}
          </Text>
        )}
      </div>
    );
  };

  const NumberFieldBem = cn(
    styles['tedi-number-field'],
    { [styles['tedi-number-field--invalid']]: isInvalid(getCurrentValue) },
    { [styles['tedi-number-field--disabled']]: disabled },
    className
  );

  return (
    <div data-name="number-field" className={className}>
      <FormLabel id={id} label={label} required={required} hideLabel={hideLabel} size={size} />
      <div className={NumberFieldBem}>
        {renderButton('decrement')}
        {renderInputElement()}
        {renderButton('increment')}
      </div>
      {helper && <FeedbackText {...helper} id={helperId} />}
      <div aria-live="polite" className="visually-hidden">
        {inputUpdated}
      </div>
    </div>
  );
};

NumberField.displayName = 'NumberField';

export default NumberField;
