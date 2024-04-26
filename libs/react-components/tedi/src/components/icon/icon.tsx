import * as MaterialIcons from '@mui/icons-material';
import { capitalize } from '@mui/material';
import cn from 'classnames';
import { TextColor } from 'libs/react-components/community/src/components/typography/text/text';
import { IntentionalAny } from 'libs/react-components/community/src/types';
import React from 'react';

import styles from './icon.module.scss';

export type IconSize = 8 | 12 | 16 | 18 | 24 | 36 | 48 | 120;
export type IconType = 'outlined' | 'sharp' | 'rounded';
export type IconBackgroundColor = 'primary' | 'secondary' | 'distinctive-primary' | 'distinctive-secondary';

export interface IconProps {
  /**
   * Name of material icon.
   * https://mui.com/material-ui/material-icons/
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
   * @default Outlined
   */
  type?: IconType;
  /**
   * Size of the icon.
   * @default 24
   */
  size?: IconSize;
  /**
   * Which color Icon should be.
   * Use 'positive', 'important' or 'warning' with caution, usually they should not be in application UI.
   * @default default
   */
  color?: TextColor;
  /**
   * Type of display. block by default.
   * @default block
   */
  display?: 'block' | 'inline';
  /**
   * Icons label for screen-readers.
   * If omitted then the icon is hidden for screen-readers.
   */
  label?: string;
  /**
   * Render a filled variant of the icon.
   * @default false
   */
  filled?: boolean;
  /**
   * Add a background to the icon.
   * Use 'default' for white circle and 'transparent'for slightly transparent one.
   * Default is without a background.
   */
  background?: IconBackgroundColor;
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>((props, ref): JSX.Element => {
  const {
    className,
    name,
    label,
    type = 'outlined',
    size = 24,
    display = 'block',
    color,
    filled = false,
    background,
    ...rest
  } = props;

  const MaterialIcon = (MaterialIcons as IntentionalAny)[`${name}${filled ? '' : capitalize(type)}`];
  const iconBEM = cn(
    'notranslate',
    styles['tedi-icon'],
    styles[`tedi-icon--${display}`],
    { [`text-${color}`]: color },
    className
  );

  const wrapperBEM = cn(styles['tedi-icon--wrapper'], {
    [styles['tedi-icon--bg']]: background,
    [styles[`tedi-icon--bg-${background}`]]: background,
  });

  return (
    <div className={wrapperBEM}>
      <MaterialIcon
        aria-label={label}
        className={iconBEM}
        style={{ fontSize: `${size / 16}rem` }}
        aria-hidden={!label}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

Icon.displayName = 'Icon';

export default Icon;
