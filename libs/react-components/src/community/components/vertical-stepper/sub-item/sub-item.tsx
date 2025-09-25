import cn from 'classnames';

import { Icon } from '../../../../tedi/components/base/icon/icon';
import styles from '../vertical-stepper.module.scss';

export interface SubItemProps {
  /**
   * Additional info components like StatusBadge, Button, Link or Text.
   */
  children?: React.ReactNode;
  /**
   * Custom class name.
   */
  className?: string;
  isSelected?: boolean;
  state?: 'default' | 'completed' | 'error' | 'disabled' | 'informative';
  hasIcon?: boolean;
  title: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
  as?: 'a' | 'button';
}

export const SubItem = ({
  children,
  className,
  state = 'default',
  isSelected,
  hasIcon,
  title,
  href,
  as = 'a',
  onClick,
}: SubItemProps): JSX.Element => {
  const Element = as;

  const subItemClassName = cn(
    styles['sub-item'],
    {
      [styles[state]]: state,
      [styles['selected']]: isSelected,
    },
    className
  );

  return (
    <>
      <li role="treeitem" className={subItemClassName} aria-selected={isSelected}>
        <span className={styles['sub-item-dot-container']}>
          <span className={styles['sub-item-dot']}></span>
        </span>

        <span className={styles['sub-item-text']}>
          <Element href={href} onClick={onClick} className={styles['sub-item-link']}>
            {title}
          </Element>

          {hasIcon && state === 'error' && (
            <Icon name="error" color="danger" size={16} display="inline" className={styles['radio__tooltip-icon']} />
          )}

          {hasIcon && state === 'completed' && (
            <Icon name="check" color="success" size={16} display="inline" className={styles['radio__tooltip-icon']} />
          )}
        </span>
      </li>
      <div>{children}</div>
    </>
  );
};
