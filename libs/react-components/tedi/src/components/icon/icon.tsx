import * as MaterialIcons from '@mui/icons-material';
import { capitalize } from '@mui/material';
import cn from 'classnames';

import styles from './icon.module.scss';

export type IconSize = 8 | 12 | 16 | 18 | 24 | 36 | 48;
export type IconType = 'filled' | 'outlined' | 'sharp' | 'rounded';
export type IconColor = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'white';
export type IconBackgroundColor = 'primary' | 'secondary' | 'distinctive-primary' | 'distinctive-secondary';

export interface IconProps {
  /**
   * Name of material icon
   * https://mui.com/material-ui/material-icons/
   */
  name: string;
  /**
   * Additional classes
   */
  className?: string;
  /**
   * Type of icon
   * It is recommended to only use one type throughout your app
   * @default outlined
   */
  type?: IconType;
  /**
   * Size of the icon
   * @default 24
   */
  size?: IconSize;
  /**
   * Which color Icon should be
   * Use 'positive', 'important' or 'warning' with caution, usually they should not be in application UI
   * @default primary
   */
  color?: IconColor;
  /**
   * Type of display
   * @default block
   */
  display?: 'block' | 'inline';
  /**
   * Add round background
   */
  background?: IconBackgroundColor;
}

export const Icon = (props: IconProps): JSX.Element => {
  const {
    className,
    name,
    type = 'outlined',
    size = 24,
    display = 'block',
    color = 'primary',
    background,
    ...rest
  } = props;

  if (!MaterialIcons[name as keyof typeof MaterialIcons]) {
    throw new Error(`Component name of '${name}' doesn't exist in Material Icons`);
  }

  const MaterialIcon =
    MaterialIcons[`${name}${type === 'filled' ? '' : capitalize(type)}` as keyof typeof MaterialIcons];

  const wrapperBEM = cn(styles['tedi-icon--wrapper'], {
    [styles['tedi-icon--bg']]: background,
    [styles[`tedi-icon--bg-${background}`]]: background,
  });

  const iconBEM = cn(
    className,
    'notranslate',
    styles['tedi-icon'],
    display && styles[`tedi-icon--${display}`],
    color && styles[`tedi-icon--color-${color}`],
    size && styles[`tedi-icon--size-${size}`]
  );

  return (
    <div className={wrapperBEM}>
      <MaterialIcon aria-hidden={true} className={iconBEM} {...rest} />
    </div>
  );
};

Icon.displayName = 'Icon';

export default Icon;
