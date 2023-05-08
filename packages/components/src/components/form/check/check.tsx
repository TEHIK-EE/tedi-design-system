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
   * Additional classes.
   */
  className?: string;
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
   * @default false
   */
  hideLabel?: boolean;
  /**
   * If the option is disabled
   * @default false
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
   * If the check is in indeterminate state. (Not checked or unchecked)
   * When this is true then the checked prop is ignored
   */
  indeterminate?: boolean;
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
  const {
    id,
    label,
    value,
    className,
    disabled = false,
    onChange,
    hideLabel = false,
    extraContent,
    checked,
    defaultChecked,
    indeterminate,
    hover,
    name,
    ...rest
  } = props;
  const [innerChecked, setInnerChecked] = React.useState<boolean>(defaultChecked || false);

  const getChecked = React.useMemo((): boolean | 'mixed' => {
    return indeterminate ? 'mixed' : onChange && typeof checked !== 'undefined' ? checked : innerChecked;
  }, [indeterminate, onChange, checked, innerChecked]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (typeof checked === 'undefined') {
      setInnerChecked(event?.target.checked);
    }
    onChange?.(value, event?.target.checked);
  };

  const LabelBEM = cn(styles['check'], { [styles['check--disabled']]: disabled });

  return (
    <div data-name="check" className={className} {...rest}>
      <label className={LabelBEM} htmlFor={id}>
        <input
          id={id}
          value={value}
          name={name}
          type="checkbox"
          disabled={disabled}
          checked={getChecked !== 'mixed' ? getChecked : false}
          aria-checked={getChecked}
          onChange={onChangeHandler}
          className={styles['check__input']}
        />
        <span
          className={cn(styles['check__indicator'], {
            [styles['check__indicator--hover']]: hover,
            [styles['check__indicator--indeterminate']]: indeterminate,
          })}
        >
          <Icon size={16} name="remove" className={cn(styles['check__icon'], styles['check__icon--indeterminate'])} />
          <Icon size={16} name="check" className={cn(styles['check__icon'], styles['check__icon--check'])} />
        </span>
        <span className={cn(styles['check__content'], { 'visually-hidden': hideLabel })}>{label}</span>
      </label>
      {extraContent && <div className={styles['check__extra-content']}>{extraContent}</div>}
    </div>
  );
};

export default Check;
