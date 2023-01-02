import cn from 'classnames';
import React from 'react';

import styles from './skeleton.module.scss';

export interface SkeletonProps {
  /**
   * PlaceholderBlocks content
   */
  children?: React.ReactNode | React.ReactNode[];
  /**
   * Additional custom class
   */
  className?: string;
  /**
   * Accessibility label for screen-readers
   */
  label?: string;
}

export const Skeleton = (props: SkeletonProps): JSX.Element => {
  const { children, className, label, ...rest } = props;
  const SkeletonBEM = cn(styles['skeleton'], className);

  return (
    <div data-name="skeleton" className={SkeletonBEM} aria-label={label} {...rest}>
      {children}
    </div>
  );
};

export default Skeleton;
