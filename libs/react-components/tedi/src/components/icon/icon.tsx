import * as MaterialIcons from '@mui/icons-material';
import { capitalize } from '@mui/material';
import cn from 'classnames';
import React from 'react';

import styles from './icon.module.scss';

export type IconSize = 8 | 12 | 16 | 18 | 24 | 36 | 48 | 120;
export type IconType = 'filled' | 'outlined' | 'sharp' | 'rounded';
export type IconColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'white';
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
   * @default outlined
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
  color?: IconColor;
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
   * Add a background to the icon.
   * Use 'default' for white circle and 'transparent'for slightly transparent one.
   * Default is without a background.
   */
  background?: IconBackgroundColor;
}

export const Icon: React.FC<IconProps> = (props): JSX.Element => {
  const { className, name, label, type = 'outlined', size = 24, display = 'block', color, background, ...rest } = props;

  if (!MaterialIcons[name as keyof typeof MaterialIcons]) {
    return <></>;
  }

  const MaterialIcon =
    MaterialIcons[`${name}${type === 'filled' ? '' : capitalize(type)}` as keyof typeof MaterialIcons];

  const iconStyles = {
    fontSize: `${size / 16}rem`,
    ...(color && { color: `var(--icon-${color})` }),
  } as React.CSSProperties;

  const wrapperStyles = background ? { backgroundColor: `var(--icon-background-${background})` } : {};

  const iconBEM = cn('notranslate', styles['tedi-icon'], styles[`tedi-icon--${display}`], className);

  const wrapperBEM = cn(styles['tedi-icon--wrapper'], {
    [styles['tedi-icon--bg']]: background,
  });

  return (
    <div className={wrapperBEM} style={wrapperStyles}>
      <MaterialIcon aria-label={label} aria-hidden={!label} className={iconBEM} style={iconStyles} {...rest} />
    </div>
  );
};

Icon.displayName = 'Icon';

export default Icon;
