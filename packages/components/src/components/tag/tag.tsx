import cn from 'classnames';
import React, { forwardRef } from 'react';

import { SkeletonBlock } from '../skeleton';
import styles from './tag.module.scss';

export type TagColor = 'primary' | 'primary-accent' | 'secondary' | 'success' | 'warning' | 'important' | 'default';
export type TagType = 'ghost' | 'default' | 'icon' | 'invisible';
export type TagSize = 'small' | 'medium' | 'default';
export type TagStatus = 'error' | 'success' | 'inactive';

export interface TagProps {
  /**
   * Content of Tag.
   */
  children: React.ReactNode;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Color of Tag.
   */
  color?: TagColor;
  /**
   * Type of Tag.
   */
  type?: TagType;
  /**
   * Status of Tag.
   */
  status?: TagStatus;
  /**
   * Size of Tag.
   */
  size?: TagSize;
  /**
   * Title if Tag is Abbreviation.
   */
  title?: string;
  /**
   * If Tag has arrow on top-right corner
   */
  hasArrow?: boolean;
  /**
   * If Tag should be skeleton
   */
  isLoading?: boolean;
}

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref): JSX.Element => {
  const { children, size, className, title, color = 'default', status, type, hasArrow, isLoading } = props;

  const TagElement = isLoading ? SkeletonBlock : title ? 'abbr' : 'div';

  const TagsBEM = cn(
    styles['tag'],
    className,
    { [styles[`tag--${size}`]]: size },
    { [styles[`tag--${type}`]]: type },
    { [styles[`tag--${color}`]]: color },
    { [styles[`tag--status-${status}`]]: status },
    { [styles['tag--with-arrow']]: hasArrow }
  );

  return (
    <TagElement className={TagsBEM} title={title} ref={ref} width={20}>
      {children}
    </TagElement>
  );
});

Tag.displayName = 'Tag';

export default Tag;
