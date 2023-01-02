import cn from 'classnames';
import React from 'react';

import styles from './skeleton-block.module.scss';

interface SkeletonBlockProps {
  /**
   * Width of the block in %. Defaults to width of the component
   */
  width?: 100 | 90 | 80 | 75 | 60 | 50 | 40 | 25 | 20;
  /**
   * Height of the block in px. Defaults to line-height of paragraph - 24px.
   */
  height?: 21 | 24 | 29 | 40 | 50;
  /**
   * Additional custom class
   */
  className?: string;
  /**
   * custom style
   */
  style?: React.CSSProperties;
}

export const SkeletonBlock = (props: SkeletonBlockProps) => {
  const { width, height = 24, className, style } = props;
  const SkeletonBlockBEM = cn(
    styles['skeleton-block'],
    styles[`skeleton-block--w-${width}`],
    styles[`skeleton-block--h-${height}`],
    className
  );

  return <span data-name="skeleton-block" className={SkeletonBlockBEM} style={style} />;
};

export default SkeletonBlock;
