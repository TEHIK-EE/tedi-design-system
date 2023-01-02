import cn from 'classnames';
import React from 'react';

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
  /*
   * Handle state externally
   * */
  active?: boolean;
  /*
   * On click handler
   * */
  onClick?(): void;
}

export const Toggle = (props: ToggleProps): JSX.Element => {
  const { ariaLabel, className, active, onClick } = props;
  const isInternallyControlled = typeof active === 'undefined';
  const [innerActive, setInnerActive] = React.useState(false);
  const isActive = isInternallyControlled ? innerActive : active;

  const ToggleBEM = cn(styles['toggle'], { [styles['toggle--active']]: active || innerActive }, className);
  const DotBEM = cn(styles['toggle__dot'], { [styles['toggle__dot--active']]: active || innerActive });

  const handleClick = () => {
    if (isInternallyControlled) {
      setInnerActive((state) => !state);
    }

    onClick?.();
  };

  return (
    <button
      data-name="toggle"
      className={ToggleBEM}
      aria-label={ariaLabel}
      type="button"
      aria-pressed={isActive}
      onClick={handleClick}
    >
      <span className={DotBEM} />
    </button>
  );
};

export default Toggle;
