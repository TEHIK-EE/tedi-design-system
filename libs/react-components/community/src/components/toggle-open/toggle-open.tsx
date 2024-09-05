import cn from 'classnames';
import React from 'react';

import Icon, { IconProps } from '../icon/icon';
import Text from '../typography/text/text';
import styles from './toggle-open.module.scss';

export interface ToggleOpenProps {
  /**
   * Name on the button to open the item
   */
  openText: string;
  /**
   * Name on the button to close the item
   */
  closeText: string;
  /**
   * If the element currently open
   */
  isOpen: boolean;
  visualType?: string;
  /**
   * Icon to show on the right
   */
  iconRight?: Partial<IconProps>;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  color?: 'inverted';
  tabIndex?: number;
  size?: 'small';
}

export const ToggleOpen = ({
  openText,
  closeText,
  isOpen,
  onClick,
  className,
  visualType,
  iconRight,
  isActive,
  color,
  tabIndex,
  size,
}: ToggleOpenProps): JSX.Element => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  const containerClassName = cn(
    styles.toggleContainer,
    styles[visualType || 'default'],
    { [styles.active]: isActive },
    className
  );

  const textClassName = cn(styles.toggleText, styles[`toggleText-${visualType}`], size && styles[`toggleText-${size}`]);

  const iconClassName = cn(
    styles.toggleIcon,
    styles[`toggleIcon-${visualType}`],
    { [styles['toggle--open']]: isOpen },
    { [styles['toggle--close']]: !isOpen },
    iconRight?.className,
    color && styles[`toggleIcon-${color}`]
  );
  return (
    <div className={containerClassName} onClick={onClick} onKeyDown={handleKeyDown} tabIndex={tabIndex}>
      <div className={styles.contentWrapper}>
        <Text element="span" className={textClassName}>
          {isOpen ? closeText : openText}
        </Text>
        <Icon
          {...iconRight}
          size={iconRight?.size || 16}
          className={iconClassName}
          name={iconRight?.name || 'expand_more'}
        />
      </div>
    </div>
  );
};
export default ToggleOpen;
