import cn from 'classnames';
import React, { forwardRef } from 'react';

import styles from './icon.module.scss';

export interface IconProps {
  /**
   * Name of material icons icon.
   * https://fonts.google.com/icons?selected=Material+Icons
   */
  name: string;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Type of icon
   */
  type?: 'outlined' | 'filled' | 'round' | 'sharp' | 'two-tone';
  /**
   * Size of the icon.
   */
  size?: 12 | 16 | 18 | 24 | 36 | 48;
  /**
   * Type of display. block by default
   */
  display?: 'block' | 'inline';
}

export const Icon = forwardRef<HTMLDivElement, IconProps>((props, ref): JSX.Element => {
  const { className, name, type = 'outlined', size, display = 'block' } = props;

  const IconBEM = cn(
    styles['icon'],
    styles[`icon--${display}`],
    { [`material-icons-${type}`]: type && type !== 'filled' },
    { 'material-icons': type && type === 'filled' },
    { [styles[`icon--${size}`]]: size },
    className
  );

  return (
    <span className={IconBEM} ref={ref}>
      {name}
    </span>
  );
});

Icon.displayName = 'Icon';

export default Icon;
