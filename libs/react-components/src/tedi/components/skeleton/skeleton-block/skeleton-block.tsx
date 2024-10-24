import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import styles from './skeleton-block.module.scss';

type SkeletonBlockBreakpointProps = {
  /**
   * Specifies the width of the skeleton block as a percentage of its parent container.
   * This value determines how much space the block occupies within its layout.
   * @default 100
   */
  width?: number | 'auto' | `${number}px`;
  /**
   * Defines the height of the skeleton block.
   * You can set this as a specific HTML heading tag ('h1' through 'h6') or as a numeric value in pixels.
   * If omitted, the default height corresponds to the line-height of a paragraph ('p').
   * @default 'p'
   */
  height?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | number;
};

export interface SkeletonBlockProps extends BreakpointSupport<SkeletonBlockBreakpointProps> {
  /**
   * Any additional class names to apply to the skeleton block element for custom styling.
   * This can be useful for overriding default styles or for integration with other CSS frameworks.
   */
  className?: string;
  /**
   * An object containing inline styles to be applied to the skeleton block element.
   * This allows for further customization beyond the predefined styles and classes.
   */
  style?: React.CSSProperties;
}

export const SkeletonBlock = (props: SkeletonBlockProps) => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const { width = 'auto', height = 'p', className, style } = getCurrentBreakpointProps<SkeletonBlockProps>(props);
  let widthStyle: string;
  if (typeof width === 'number') {
    widthStyle = `${width}%`;
  } else if (typeof width === 'string' && width.endsWith('px')) {
    widthStyle = width;
  } else {
    widthStyle = width === 'auto' ? 'auto' : `${width}%`;
  }

  const stylesObj = {
    width: widthStyle,
    ...(typeof height === 'number' ? { height: `${height}px` } : {}),
  };

  const heightClass = typeof height === 'string' ? styles[`tedi-skeleton-block--${height}`] : null;

  return (
    <span className={cn(styles['tedi-skeleton-block'], heightClass, className)} style={{ ...stylesObj, ...style }} />
  );
};

export default SkeletonBlock;
