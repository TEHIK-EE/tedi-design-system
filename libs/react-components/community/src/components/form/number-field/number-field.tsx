import cn from 'classnames';
import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';

import { useLabels } from '../../../../../shared/providers/label-provider/use-labels';
import { Button } from '../../button/button';
import Text from '../../typography/text/text';
import FormHelper, { FormHelperProps } from '../form-helper/form-helper';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import styles from './number-field.module.scss';

export interface NumberStepperProps extends FormLabelProps {
  /**
   * Default value of input.
   */
  defaultValue?: number;
  /**
   * Value of input to control input value from outside of component.
   * Do not use with defaultValue.
   */
  value?: number;
  /**
   * onChange callback handler.
   */
  onChange?: (value: number) => void;
  /**
   * Input's inputmode
   * @default numeic
   */
  inputmode?: 'numeric' | 'decimal';
  /**
   * Use if you plan to use decimal values.
   * Rounds floating point calculations with 'decimalPlaces' accuracy
   */
  decimalPlaces?: number;
  /**
   * Minimal allowed value of input.
   * Will disable button after input reaches this value.
   * Will not allow to enter value lower than this.
   */
  min?: number;
  /**
   * Maximal allowed value of input.
   * Will disable button after input reaches this value.
   * Will not allow to enter value higher than this.
   */
  max?: number;
  /**
   * Increment or decrement amount.
   * @default 1
   */
  step?: number;
  /**
   * Suffix to the input value. Usually some unit.
   */
  suffix?: string;
  /**
   * Full-width number-field.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Is field disabled.
   */
  disabled?: boolean;
  /**
   * Is field invalid.
   */
  invalid?: boolean;
  /**
   * TextField helper.
   */
  helper?: FormHelperProps;
  /**
   * Additional input attributes.
   */
  input?: React.InputHTMLAttributes<HTMLInputElement>;
}

type TDirection = 'increment' | 'decrement';

export const NumberField = (props: NumberStepperProps) => {
  const {
    id,
    label,
    hideLabel,
    requiredLabel,
    required,
    className,
    size,
    inputmode = 'numeric',
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
  } = props;

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
      const isBelowMinValue = Boolean(min && currentValue < min);
      const isAboveMaxValue = Boolean(max && currentValue > max);
      return invalid || isBelowMinValue || isAboveMaxValue || helper?.type === 'error';
    },
    [invalid, helper, max, min]
  );

  const forceToLimits = (currentValue: number) => {
    if (min && currentValue < min) {
      currentValue = min;
    }
    if (max && currentValue > max) {
      currentValue = max;
    }
    return currentValue;
  };

  // Needed for screen reader to announce latest new value, if updated through button click
  const updateValueUpdatedLabel = (newValue: number) => {
    const valueUpdated = getLabel('numberField.quantityUpdated');
    const valueUpdatedLabel = typeof valueUpdated === 'string' ? valueUpdated : valueUpdated(newValue);

    setInputUpdated(valueUpdatedLabel);
    setTimeout(() => {
      setInputUpdated('');
    }, 5000);
  };

  // Floating point calculations are not precise. This helps to deal with that issue
  const roundValue = (currentValue: number) => {
    if (decimalPlaces) {
      const multiplier = Math.pow(10, decimalPlaces);
      return Math.round(currentValue * multiplier) / multiplier;
    }
    return currentValue;
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
    const ButtonBEM = cn(styles['number-field__button'], styles[`number-field__button--${direction}`]);
    const isOnOrOutOfBounds = direction === 'increment' ? max && getCurrentValue >= max : min && getCurrentValue <= min;

    const changeValue = getLabel(`numberField.${direction}`);
    const ariaLabel = typeof changeValue === 'string' ? changeValue : changeValue(step);

    return (
      <Button
        aria-label={ariaLabel}
        onClick={() => handleButtonClick(direction)}
        disabled={isOnOrOutOfBounds || disabled}
        visualType="tertiary"
        className={ButtonBEM}
      >
        {direction === 'increment' ? '+' : '-'}
      </Button>
    );
  };

  const renderInputElement = () => {
    const InputWrapperBEM = cn(styles['number-field__input-wrapper'], {
      [styles['number-field__input-wrapper--with-suffix']]: suffix,
      [styles['number-field__input-wrapper--full-width']]: fullWidth,
    });

    const InputBEM = cn(styles['number-field__input'], input?.className);

    // when clicking the suffix part we need to manually set focus to input
    const focusInput = () => inputRef?.current?.focus();

    return (
      <div className={InputWrapperBEM} onClick={focusInput}>
        <input
          ref={inputRef}
          id={id}
          aria-describedby={helperId}
          aria-invalid={invalid}
          type="number"
          inputMode={inputmode}
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
          <Text element="span" modifiers="small" color="subtle" className={styles['number-field__suffix']}>
            {suffix}
          </Text>
        )}
      </div>
    );
  };

  const NumberFieldBem = cn(
    styles['number-field'],
    { [styles['number-field--invalid']]: isInvalid(getCurrentValue) },
    { [styles['number-field--disabled']]: disabled },
    className
  );

  return (
    <div data-name="number-field" className={className}>
      <FormLabel
        id={id}
        label={label}
        requiredLabel={requiredLabel}
        required={required}
        hideLabel={hideLabel}
        size={size}
      />
      <div className={NumberFieldBem}>
        {renderButton('decrement')}
        {renderInputElement()}
        {renderButton('increment')}
      </div>
      {helper && <FormHelper {...helper} id={helperId} />}
      {/*This is used to announce value updates for screen reader*/}
      <div aria-live="polite" className="visually-hidden">
        {inputUpdated}
      </div>
    </div>
  );
};

NumberField.displayName = 'NumberField';

export default NumberField;
