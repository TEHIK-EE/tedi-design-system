import { format } from 'date-fns';
import et from 'date-fns/locale/et';
import React from 'react';
import ReactDatePicker, { ReactDatePickerCustomHeaderProps, registerLocale } from 'react-datepicker';
import ReactDOM from 'react-dom';

import { Col, Row } from '../../grid';
import { useIsMounted } from '../../helper';
import Icon from '../../icon/icon';
import TextField, { TextFieldProps } from '../textfield/textfield';
import styles from './datepicker.module.scss';

export type DatepickerValue = Date | null;

export interface DatePickerProps extends Omit<TextFieldProps, 'value' | 'defaultValue' | 'onChange'> {
  /**
   * Currently selected value. Accepts a native javascript date object.
   * Used only if onChange is also defined
   */
  value?: DatepickerValue;
  /**
   * Datepicker initial value. Accepts a native javascript date object.
   */
  defaultValue?: DatepickerValue;
  /**
   * onChange handler.
   * Triggers each time when new value is selected from datepicker.
   */
  onChange?: (value: DatepickerValue) => void;
  /**
   * minDate
   */
  minDate?: Date | null;
  /**
   * maxDate
   */
  maxDate?: Date | null;
}

registerLocale('et', et);
const dateFormat = 'dd.MM.yyyy';

export const DatePicker = (props: DatePickerProps): JSX.Element => {
  const { value, defaultValue, onChange, minDate, maxDate, ...rest } = props;
  const [innerDate, setInnerDate] = React.useState<DatepickerValue>(defaultValue || new Date());
  const [isOpen, setIsOpen] = React.useState(false);
  const isMounted = useIsMounted();

  const getValue = (): DatepickerValue => {
    return onChange && typeof value !== 'undefined' ? value : innerDate;
  };

  const onChangeHandler = (date: Date): void => {
    setIsOpen(false);
    if (typeof value === 'undefined') {
      setInnerDate(date);
    }

    onChange?.(date);
  };

  const getMonthArrow = (icon: string, onClick: () => void, disabled: boolean): JSX.Element => {
    return (
      <Col width="auto">
        <button className={styles['datepicker__arrow']} onClick={onClick}>
          <Icon name={icon} size={24} />
        </button>
      </Col>
    );
  };

  const customHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    increaseYear,
    decreaseYear,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    return (
      <div className={styles['datepicker__header']}>
        <Row justifyContent="between" alignItems="center">
          {getMonthArrow('chevron_left', () => decreaseYear(), prevYearButtonDisabled)}
          <div>{format(date, 'yyyy', { locale: et })}</div>
          {getMonthArrow('chevron_right', () => increaseYear(), nextYearButtonDisabled)}
        </Row>
        <Row justifyContent="between" alignItems="center">
          {getMonthArrow('chevron_left', () => decreaseMonth(), prevMonthButtonDisabled)}
          <div>{format(date, 'LLLL', { locale: et })}</div>
          {getMonthArrow('chevron_right', () => increaseMonth(), nextMonthButtonDisabled)}
        </Row>
      </div>
    );
  };

  // Any used because React-datepicker does not have type of props it passes to customInput
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomInput = React.forwardRef<HTMLInputElement, any>(({ onChange, ...datePickerPropsRest }, ref) => {
    return (
      <TextField
        ref={ref}
        onChangeEvent={onChange}
        {...datePickerPropsRest}
        {...rest}
        icon="today"
        onIconClick={() => setIsOpen((isOpen) => !isOpen)}
        onBlur={(e) => {
          rest.onBlur?.(e);
          setIsOpen(false);
        }}
      />
    );
  });

  CustomInput.displayName = 'DatePicker-CustomInput';

  return (
    <ReactDatePicker
      open={isOpen}
      onCalendarOpen={() => setIsOpen(true)}
      onCalendarClose={() => setIsOpen(false)}
      onClickOutside={() => setIsOpen(false)}
      selected={getValue()}
      onChange={onChangeHandler}
      locale="et"
      customInput={<CustomInput />}
      renderCustomHeader={customHeader}
      className={styles['datepicker']}
      showPopperArrow={false}
      dateFormat={dateFormat}
      popperContainer={({ children }) =>
        isMounted ? ReactDOM.createPortal(children, document.body) : children || null
      }
      minDate={minDate}
      maxDate={maxDate}
      showYearDropdown={true}
    />
  );
};

export default DatePicker;
