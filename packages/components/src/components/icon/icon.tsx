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
   */
  type?: 'outlined' | 'rounded' | 'sharp';
  /**
   * Render a filled variant of the icon.
   */
  filled?: boolean;
  /**
   * Stroke weight. 400 by default.
   */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  /**
   * Size of the icon.
   */
  size?: 12 | 14 | 16 | 18 | 24 | 36 | 48;
  /**
   * Type of display. block by default.
   */
  display?: 'block' | 'inline';
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  (
    { className, name, filled = false, type = 'outlined', weight = 400, size = 24, display = 'block' },
    ref
  ): JSX.Element => {
    const iconBEM = cn(styles['icon'], styles[`icon--${display}`], { [`material-symbols-${type}`]: type }, className);

    const iconVariant = {
      ...(size ? { '--icon-variation-size': `${size / 16}rem` } : {}),
      ...(filled ? { '--icon-variation-fill': 1 } : {}),
      ...(weight ? { '--icon-variation-weight': weight } : {}),
    } as React.CSSProperties;

    return (
      <span className={iconBEM} style={iconVariant} ref={ref}>
        {name}
      </span>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
