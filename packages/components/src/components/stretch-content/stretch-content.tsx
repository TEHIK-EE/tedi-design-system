import cn from 'classnames';
import React from 'react';

import styles from './stretch-content.module.scss';

export interface StretchContentProps {
  /**
   * Only one child element should be present
   */
  children: React.ReactElement;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Which axis to stretch.
   * @default both
   */
  direction?: 'both' | 'horizontal' | 'vertical';
}

export const StretchContent = ({
  children,
  direction = 'both',
  className,
  ...rest
}: StretchContentProps): JSX.Element => {
  const BEM = cn(styles[`stretch-content--${direction}`], className);

  return (
    <div className={BEM} {...rest}>
      {children}
    </div>
  );
};

export default StretchContent;
