import cn from 'classnames';

import styles from './icon.module.scss';

export type IconSize = 8 | 12 | 16 | 18 | 24 | 36 | 48;
export type IconType = 'outlined' | 'sharp' | 'rounded';
export type IconColor = 'primary' | 'secondary' | 'tertiary' | 'brand' | 'success' | 'warning' | 'danger' | 'white';
export type IconBackgroundColor = 'primary' | 'secondary' | 'brand-primary' | 'brand-secondary';

export interface IconProps {
  /**
   * Name of material icon
   * https://fonts.google.com/icons
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
   * Render a filled variant of the icon
   * @default false
   */
  filled?: boolean;
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
    filled,
    display = 'block',
    color = 'primary',
    background,
    ...rest
  } = props;

  const wrapperBEM = cn(styles['tedi-icon--wrapper'], {
    [styles['tedi-icon--bg']]: background,
    [styles[`tedi-icon--bg-${background}`]]: background,
  });

  const iconBEM = cn(
    'notranslate',
    'material-symbols',
    type && [`material-symbols--${type}`],
    styles['tedi-icon'],
    display && styles[`tedi-icon--${display}`],
    color && styles[`tedi-icon--color-${color}`],
    size && styles[`tedi-icon--size-${size}`],
    filled && styles['tedi-icon--filled'],
    className
  );

  return (
    <div className={wrapperBEM}>
      <span className={iconBEM} data-name="icon" role="img" aria-hidden={true} {...rest}>
        {name}
      </span>
    </div>
  );
};

Icon.displayName = 'Icon';
