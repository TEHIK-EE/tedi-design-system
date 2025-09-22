import cn from 'classnames';
import React from 'react';

import { Icon } from '../../../../tedi/components/base/icon/icon';
import Collapse from '../../../../tedi/components/buttons/collapse/collapse';
import styles from '../vertical-stepper.module.scss';

export interface StepItemProps {
  /**
   * SubItems and/or Text for description
   */
  children?: React.ReactNode;
  /**
   * Custom class name.
   */
  className?: string;

  /** Shows the current step */
  isSelected?: boolean;
  hasNumber?: boolean;
  /** Descriptive text under step's title */
  description?: string;
  /**Step title text */
  title: string | React.ReactNode;
  href?: string;
  /** */
  state?: 'default' | 'completed' | 'error' | 'disabled';
  hasIcon?: boolean;
}

export const StepItem = ({
  children,
  className,
  isSelected,
  hasIcon,
  title,
  href,
  state = 'default',
}: StepItemProps): JSX.Element => {
  const stepItemClassName = cn(
    styles['stepper-item'],
    {
      [styles[state]]: state,
      [styles['selected']]: isSelected,
    },
    className
  );

  return (
    <li role="treeitem" aria-selected={isSelected} className={stepItemClassName}>
      <span className={styles['stepper-counter']}></span>
      <div className={styles['stepper-content']}>
        {children ? (
          <Collapse
            hideCollapseText
            id="vertical-stepper-collapse"
            title={
              <span className={styles['stepper-link']}>
                {title}
                {hasIcon && state === 'error' && (
                  <Icon
                    name="error"
                    color="danger"
                    size={16}
                    display="inline"
                    className={styles['radio__tooltip-icon']}
                  />
                )}

                {hasIcon && state === 'completed' && (
                  <Icon
                    name="check"
                    color="success"
                    size={16}
                    display="inline"
                    className={styles['radio__tooltip-icon']}
                  />
                )}
              </span>
            }
          >
            {children && <ul className={styles['sub-item-list']}>{children}</ul>}
          </Collapse>
        ) : (
          <a href={href} className={styles['stepper-link']}>
            {title}
          </a>
        )}
      </div>
      <div className={styles['stepper-line']}></div>
    </li>
  );
};
