import cn from 'classnames';
import React, { forwardRef } from 'react';

import { SkeletonBlock } from '../skeleton';
import styles from './tag.module.scss';

export type TagColor = 'default' | 'primary' | 'accent' | 'positive' | 'warning' | 'important';
export type TagType = 'default' | 'secondary' | 'ghost' | 'invisible' | 'borderless';
export type TagSize = 'default' | 'large';
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
   * @default default
   */
  color?: TagColor;
  /**
   * Type of Tag.
   * @default default
   */
  type?: TagType;
  /**
   * Status of Tag.
   */
  status?: TagStatus;
  /**
   * Size of Tag.
   * @default default
   */
  size?: TagSize;
  /**
   * Title if Tag is Abbreviation.
   */
  title?: string;
  /**
   * If tag is rounded
   * @default false
   */
  rounded?: boolean;
  /**
   * If tag has icon only
   * @default false
   */
  iconOnly?: boolean;
  /**
   * If Tag has arrow on top-right corner
   * @default false
   */
  hasArrow?: boolean;
  /**
   * If Tag should be skeleton
   * @default false
   */
  isLoading?: boolean;
  /**
   * If tag is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * ID attribute
   */
  id?: string;
}

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref): JSX.Element => {
  const {
    children,
    size,
    className,
    title,
    color = 'default',
    status,
    type = 'default',
    rounded = false,
    hasArrow = false,
    isLoading = false,
    isDisabled = false,
    iconOnly = false,
    id,
  } = props;

  const TagElement = isLoading ? SkeletonBlock : title ? 'abbr' : 'div';

  const TagsBEM = cn(
    styles['tag'],
    className,
    { [styles[`tag--${size}`]]: size },
    { [styles[`tag--type-${type}`]]: type },
    { [styles[`tag--color-${color}`]]: color },
    { [styles[`tag--status-${status}`]]: status },
    { [styles['tag--rounded']]: rounded },
    { [styles['tag--icon-only']]: iconOnly },
    { [styles['tag--disabled']]: isDisabled },
    { [styles['tag--with-arrow']]: hasArrow && !rounded }
  );

  return (
    <TagElement id={id} data-name="tag" className={TagsBEM} title={title} ref={ref}>
      {children}
    </TagElement>
  );
});

Tag.displayName = 'Tag';

export default Tag;
