import cn from 'classnames';
import React from 'react';

import Icon from '../../icon/icon';
import styles from './check.module.scss';

export interface CheckProps {
  /**
   * ID property
   */
  id: string;
  /**
   * Label text
   */
  label: React.ReactNode;
  /**
   * Value property
   */
  value: string;
  /**
   * name of the input
   */
  name: string;
  /**
   * is the label hidden
   */
  hideLabel?: boolean;
  /**
   * If the option is disabled
   */
  disabled?: boolean;
  /**
   * onChange handler
   */
  onChange?: (value: string, checked: boolean) => void;
  /**
   * Possibility to add extra content after label. ExtraContent is not clickable like label
   * Can only be used with ChoiceGroupRadio and Checkbox.
   */
  extraContent?: React.ReactNode;
  /**
   * If the check is controlled from outside the components
   */
  checked?: boolean;
  /**
   * If the check is checked by default
   */
  defaultChecked?: boolean;
  /**
   * If the item should be in hover state
   */
  hover?: boolean;
}

export const Check = (props: CheckProps): JSX.Element => {
  const { id, label, value, disabled, onChange, hideLabel, extraContent, checked, defaultChecked, hover, name } = props;
  const [innerChecked, setInnerChecked] = React.useState<boolean>(defaultChecked || false);

  const getChecked = React.useMemo((): boolean => {
    return onChange && typeof checked !== 'undefined' ? checked : innerChecked;
  }, [onChange, innerChecked, checked]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (typeof checked === 'undefined') {
      setInnerChecked(event?.target.checked);
    }
    onChange?.(value, event?.target.checked);
  };

  const LabelBEM = cn(styles['check'], { [styles['check--disabled']]: disabled });

  return (
    <div data-name="check">
      <label className={LabelBEM} htmlFor={id}>
        <input
          id={id}
          value={value}
          name={name}
          type="checkbox"
          disabled={disabled}
          checked={getChecked}
          defaultChecked={defaultChecked}
          onChange={onChangeHandler}
          className={styles['check__input']}
        />
        <span className={cn(styles['check__indicator'], { [styles['check__indicator--hover']]: hover })}>
          <Icon size={16} name="check" className={styles['check__icon']} />
        </span>
        <span className={cn(styles['check__content'], { 'visually-hidden': hideLabel })}>{label}</span>
      </label>
      {extraContent && <div className={styles['check__extra-content']}>{extraContent}</div>}
    </div>
  );
};

export default Check;
