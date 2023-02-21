import cn from 'classnames';
import React, { forwardRef } from 'react';

import styles from './icon.module.scss';

export interface IconProps {
  /**
   * Name of material symbols icon.
   * https://fonts.google.com/icons?icon.set=Material+Symbols
   */
  name: string;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Type of icon.
   * It is recommended to only use one type throughout your app.
   * This ensures that only one icon font is downloaded.
   * @default outlined
   */
  type?: 'outlined' | 'rounded' | 'sharp';
  /**
   * Render a filled variant of the icon.
   * @default false
   */
  filled?: boolean;
  /**
   * Size of the icon.
   * @default 24
   */
  size?: 12 | 14 | 16 | 18 | 24 | 36 | 48;
  /**
   * Type of display. block by default.
   * @default block
   */
  display?: 'block' | 'inline';
  /**
   * Icons label for screen-readers
   */
  label?: string;
}

export const Icon = forwardRef<HTMLDivElement, IconProps>((props, ref): JSX.Element => {
  const { className, name, filled = false, label, type = 'outlined', size = 24, display = 'block', ...rest } = props;
  const iconBEM = cn(styles['icon'], styles[`icon--${display}`], { [`material-symbols-${type}`]: type }, className);

  const iconVariant = {
    ...(size ? { '--icon-internal-variation-size': `${size / 16}rem` } : {}),
    ...(filled ? { '--icon-internal-variation-fill': 1 } : {}),
  } as React.CSSProperties;

  return (
    <span data-name="icon" {...rest} className={iconBEM} style={iconVariant} ref={ref} aria-label={label}>
      {name}
    </span>
  );
});

Icon.displayName = 'Icon';

export default Icon;
