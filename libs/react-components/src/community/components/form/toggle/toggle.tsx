import cn from 'classnames';
import React, { forwardRef } from 'react';

import { Spinner } from '../../../../tedi/components/spinner/spinner';
import Button, { ButtonProps } from '../../button/button';
import Icon from '../../icon/icon';
import styles from './toggle.module.scss';

export interface ToggleProps {
  /**
   * Aria Label
   */
  ariaLabel: string;
  /**
   * Label text rendered next to toggle
   * ariaLabel should still be provided, because it is used for the screen readers.
   * Label is used for the visual label and hidden for screen-readers
   * Click on the label triggers the toggle
   */
  label?: React.ReactNode;
  /**
   * Possibility to add extra content after label. ExtraContent is not clickable like label
   */
  extraContent?: React.ReactNode;
  /**
   * Wrapper Classname
   */
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
   * @default medium
   */
  size?: 'medium' | 'large';
  /**
   * Color of the toggle
   * @default default
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
  /**
   * If toggle is in loading state and should show spinner.
   * When isLoading is true, toggle does not trigger onChange event.
   * @default false
   */
  isLoading?: boolean;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>((props, ref) => {
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
    disabled = false,
    isLoading = false,
    extraContent,
    label,
    ...rest
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
    if (isLoading) {
      return;
    }

    const newChecked = !getChecked;
    if (typeof checked === 'undefined') {
      setInnerChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  const buttonProps: Partial<ButtonProps<'button'>> = {
    noStyle: true,
    type: 'button',
    'aria-label': ariaLabel,
    'aria-pressed': getChecked,
    disabled: disabled,
    'aria-disabled': isLoading,
    ...rest,
    onClick: handleChange,
  };

  return (
    <div className={styles['toggle-wrapper']}>
      <Button
        {...buttonProps}
        onClick={(event) => {
          /**
           * Allows Toggle to use inside TooltipTrigger.
           * TooltipTrigger uses onClick to open the tooltip when openWith="click"
           * Can't be passed to label button, because tooltip closes due that cursor leaves the ref button
           */
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (rest as Record<string, any>)?.onClick?.(event);
          handleChange();
        }}
        ref={ref}
        data-name="toggle"
        className={ToggleBEM}
      >
        <span className={styles['toggle__dot']}>
          {isLoading ? (
            <Spinner
              size={size === 'large' ? 16 : 10}
              className={cn(styles['toggle__icon'], styles['toggle__spinner'])}
            />
          ) : icon ? (
            <Icon className={styles['toggle__icon']} name={getChecked ? 'lock_open_right' : 'lock'} size={16} />
          ) : null}
        </span>
      </Button>
      {label && (
        <Button {...buttonProps} className={styles['toggle__label']} aria-hidden={true} tabIndex={-1}>
          {label}
        </Button>
      )}
      {extraContent && <div className={styles['toggle__extra-content']}>{extraContent}</div>}
    </div>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
