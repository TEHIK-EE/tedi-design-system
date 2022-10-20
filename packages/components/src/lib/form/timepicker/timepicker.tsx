import { flip, shift, useFloating } from '@floating-ui/react-dom';
import cn from 'classnames';
import { format } from 'date-fns';
import React from 'react';
import ReactDOM from 'react-dom';

import { Col, Row } from '../../grid';
import Icon from '../../icon/icon';
import { useLabels } from '../../label-provider';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './timepicker.module.scss';

export type TimepickerValue = Date | null;

export interface TimePickerProps extends Omit<TextFieldProps, 'value' | 'defaultValue' | 'onChange'> {
  /**
   * Default Date of input.
   */
  defaultValue?: TimepickerValue;
  /**
   * Value of Date to control input value from outside of component.
   * Do not use with defaultValue
   */
  value?: TimepickerValue;
  /**
   * onChange callback handler.
   */
  onChange?: (value: TimepickerValue) => void;
  /**
   * Should timepicker render hours.
   * Defaults to true.
   */
  renderHours?: boolean;
  /**
   * Should timepicker render minutes.
   * Defaults to true.
   */
  renderMinutes?: boolean;
  /**
   * Should timepicker render seconds.
   * Defaults to false.
   */
  renderSeconds?: boolean;
}

export const TimePicker = (props: TimePickerProps): JSX.Element => {
  const {
    onChange,
    defaultValue,
    value,
    className,
    renderHours = true,
    renderMinutes = true,
    renderSeconds = false,
    ...rest
  } = props;
  const { getLabel } = useLabels();
  const textfieldRef = React.useRef<TextFieldForwardRef>(null);
  const [innerValue, setInnerValue] = React.useState<Date | null>(defaultValue || new Date());
  const [isOpen, setIsOpen] = React.useState(false);
  const { x, y, reference, floating, strategy, refs } = useFloating({
    placement: 'bottom-start',
    middleware: [shift(), flip()],
  });

  const getValue = React.useMemo((): TimepickerValue => {
    return onChange && typeof value !== 'undefined' ? value : innerValue;
  }, [innerValue, onChange, value]);

  const [hour, setHour] = React.useState<number>(getValue?.getHours() || 0);
  const [minute, setMinute] = React.useState<number>(getValue?.getMinutes() || 0);
  const [second, setSecond] = React.useState<number>(getValue?.getSeconds() || 0);

  React.useEffect(() => {
    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  });

  React.useEffect(() => {
    if (textfieldRef.current?.inner) {
      reference(textfieldRef.current?.inner);
    }
  }, [reference, textfieldRef]);

  const onClickOutside = (event: MouseEvent): void => {
    if (event.target instanceof Element) {
      hideIfOutside(event.target);
    }
  };

  // calls this.hideTooltip if target is not a descendant of the tooltip nor the reference element.
  const hideIfOutside = (target: Element | null): void => {
    if (isOpen) {
      while (target !== null) {
        if (target === refs.reference.current || target === refs.floating.current) {
          return;
        }

        target = target.parentElement;
      }

      setIsOpen(false);
    }
  };

  const onChangeHandler = (newValue: TimepickerValue): void => {
    if (typeof value === 'undefined') {
      setInnerValue(newValue);
    }

    onChange?.(newValue);
  };

  const getCheckedNewNumberValue = (value: string | number, max = 59, min = 0): number => {
    const number = Number(value);

    if (number > max) {
      return max;
    }

    if (number < min) {
      return min;
    }

    return number;
  };

  const onHourChange = (value: string | number): void => {
    const numberValue = getCheckedNewNumberValue(value, 23);
    if (getValue) {
      onChangeHandler(new Date(getValue.setHours(numberValue)));
    }
    setHour(numberValue);
  };

  const onMinuteChange = (value: string | number): void => {
    const numberValue = getCheckedNewNumberValue(value);
    if (getValue) {
      onChangeHandler(new Date(getValue?.setMinutes(numberValue)));
    }
    setMinute(numberValue);
  };

  const onSecondChange = (value: string | number): void => {
    const numberValue = getCheckedNewNumberValue(value);
    if (getValue) {
      onChangeHandler(new Date(getValue?.setSeconds(numberValue)));
    }
    setSecond(numberValue);
  };

  const renderPopper = (): JSX.Element => {
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      type: 'number',
      min: 0,
      max: 59,
      step: 1,
    };

    const getTimePickerButton = (direction: 'up' | 'down', onClick: () => void): JSX.Element => (
      <button className={styles['timepicker__button']} onClick={onClick}>
        <span className="visually-hidden">
          {direction === 'up' ? getLabel('time-picker.add-one') : getLabel('time-picker.substract-one')}
        </span>
        <Icon name={direction === 'up' ? 'expand_less' : 'expand_more'} />
      </button>
    );

    return (
      <div
        className={styles['timepicker__popper']}
        style={{
          position: strategy,
          top: y ?? '',
          left: x ?? '',
        }}
        ref={floating}
      >
        <Row gutter={3}>
          {renderHours && (
            <Col className={styles['timepicker__col']}>
              {getTimePickerButton('up', () => onHourChange(hour + 1))}
              <TextField
                className={styles['timepicker__col-input']}
                label="Hours"
                hideLabel={true}
                id="input-hours"
                value={hour.toString()}
                onChange={onHourChange}
                input={{ ...inputProps, max: 23 }}
              />
              {getTimePickerButton('down', () => onHourChange(hour - 1))}
            </Col>
          )}
          {renderMinutes && (
            <Col className={styles['timepicker__col']}>
              {getTimePickerButton('up', () => onMinuteChange(minute + 1))}
              <TextField
                className={styles['timepicker__col-input']}
                label="Minutes"
                hideLabel={true}
                id="input-minutes"
                value={minute.toString()}
                onChange={onMinuteChange}
                input={inputProps}
              />
              {getTimePickerButton('down', () => onMinuteChange(minute - 1))}
            </Col>
          )}
          {renderSeconds && (
            <Col className={styles['timepicker__col']}>
              {getTimePickerButton('up', () => onSecondChange(second + 1))}
              <TextField
                className={styles['timepicker__col-input']}
                label="Seconds"
                hideLabel={true}
                id="input-seconds"
                value={second.toString()}
                onChange={onSecondChange}
                input={inputProps}
              />
              {getTimePickerButton('down', () => onSecondChange(second - 1))}
            </Col>
          )}
        </Row>
      </div>
    );
  };

  const getFormattedValue = (): string => {
    const currentValue = getValue;
    const formatArray = [];

    if (renderHours) {
      formatArray.push('HH');
    }
    if (renderMinutes) {
      formatArray.push('mm');
    }
    if (renderSeconds) {
      formatArray.push('ss');
    }

    if (currentValue && formatArray.length) {
      return format(new Date(currentValue), formatArray.join(':'));
    }

    return '';
  };

  return (
    <>
      <TextField
        {...rest}
        ref={textfieldRef}
        value={getFormattedValue()}
        onClick={() => setIsOpen(true)}
        className={cn(styles['timepicker'], className)}
        icon="schedule"
        onIconClick={() => setIsOpen((current) => !current)}
        input={{ autoComplete: 'off' }}
      />
      {isOpen && ReactDOM.createPortal(renderPopper(), document.body)}
    </>
  );
};

export default TimePicker;
