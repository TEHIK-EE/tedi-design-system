import cn from 'classnames';
import React from 'react';

import Icon from '../../icon/icon';
import styles from './toggle.module.scss';

export interface ToggleProps {
  /*
   * Aria Label
   * */
  ariaLabel: string;
  /*
   * Wrapper Classname
   * */
  className?: string;
  /**
   * If the check is controlled from outside the components, use with onChange
   */
  checked?: boolean;
  /**
   * If the check is checked by default.
   * Ignored if checked is set
   */
  defaultChecked?: boolean;
  /**
   *  On change handler, value is the new value of the toggle
   */
  onChange?(value: boolean): void;
  /**
   * Size of the toggle
   * @default 'medium'
   */
  size?: 'medium' | 'large';
  /**
   * Color of the toggle
   * @default 'default'
   */
  color?: 'default' | 'alternative';
  /**
   * Type of the toggle
   */
  type?: 'ghost';
  /**
   * Should the toggle show lock icon.
   * Can be only used as large toggle
   */
  icon?: boolean;
  /**
   * If the toggle is disabled
   */
  disabled?: boolean;
}

export const Toggle = (props: ToggleProps): JSX.Element => {
  const {
    ariaLabel,
    className,
    checked,
    defaultChecked,
    onChange,
    size = props.icon ? 'large' : 'medium',
    color = 'default',
    type,
    icon,
    disabled,
  } = props;
  const [innerChecked, setInnerChecked] = React.useState<boolean>(defaultChecked || false);

  const getChecked = React.useMemo((): boolean => {
    return onChange && typeof checked !== 'undefined' ? checked : innerChecked;
  }, [onChange, innerChecked, checked]);

  const ToggleBEM = cn(
    styles['toggle'],
    styles[`toggle--${size}`],
    styles[`toggle--${color}`],
    {
      [styles['toggle--active']]: getChecked,
      [styles['toggle--disabled']]: disabled,
      [styles[`toggle--${type}`]]: type,
    },
    className
  );

  const handleChange = () => {
    const newChecked = !getChecked;
    if (typeof checked === 'undefined') {
      setInnerChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  return (
    <button
      data-name="toggle"
      className={ToggleBEM}
      aria-label={ariaLabel}
      type="button"
      aria-pressed={getChecked}
      onClick={handleChange}
      disabled={disabled}
    >
      <span className={styles['toggle__dot']}>
        {icon && <Icon className={styles['toggle__icon']} name={getChecked ? 'lock_open' : 'lock'} size={16} />}
      </span>
    </button>
  );
};

export default Toggle;
