import cn from 'classnames';
import { forwardRef } from 'react';

import styles from './icon.module.scss';

export type IconSize = 8 | 12 | 16 | 18 | 24 | 36 | 48;
export type IconType = 'outlined' | 'sharp' | 'rounded';
export type IconColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'brand-dark'
  | 'success'
  | 'warning'
  | 'warning-dark'
  | 'danger'
  | 'white';
export type IconBackgroundColor = 'primary' | 'secondary' | 'brand-primary' | 'brand-secondary';

export interface IconProps {
  /**
   * Name of material icon
   * https://fonts.google.com/icons
   */
  name: string;
  /**
   * Additional classes to style the icon or its wrapper.
   * - If `background` is provided, the `className` will be applied to the wrapper element.
   * - If `background` is not provided, the `className` will be applied directly to the icon element.
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
  /**
   * Icons label for screen-readers.
   * If omitted then the icon is hidden for screen-readers.
   */
  label?: string;
}

export const Icon = forwardRef<HTMLDivElement, IconProps>((props: IconProps, ref): JSX.Element => {
  const {
    className,
    name,
    type = 'outlined',
    size = 24,
    filled,
    display = 'block',
    color = 'primary',
    background,
    label,
    ...rest
  } = props;

  const wrapperBEM = cn(
    styles['tedi-icon__wrapper'],
    {
      [styles['tedi-icon__wrapper--bg']]: background,
      [styles[`tedi-icon__wrapper--bg-${background}`]]: background,
      [styles[`tedi-icon__wrapper--size-${size}`]]: size,
      [styles[`tedi-icon__wrapper--${display}`]]: display,
    },
    background && className
  );

  const iconBEM = cn(
    'notranslate',
    'material-symbols',
    type && [`material-symbols--${type}`],
    styles['tedi-icon'],
    color && styles[`tedi-icon--color-${color}`],
    size && styles[`tedi-icon--size-${size}`],
    display && styles[`tedi-icon--${display}`],
    filled && styles['tedi-icon--filled'],
    !background && className
  );

  const iconElement = (
    <span
      ref={!background ? ref : null}
      className={iconBEM}
      data-name="icon"
      role="img"
      aria-label={label}
      aria-hidden={!label}
      {...rest}
    >
      {name}
    </span>
  );

  if (background) {
    return (
      <div className={wrapperBEM} ref={ref}>
        {iconElement}
      </div>
    );
  }

  return iconElement;
});

Icon.displayName = 'Icon';
