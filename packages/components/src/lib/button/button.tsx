import cn from 'classnames';
import Link, { LinkProps } from 'next/link';
import React, { forwardRef } from 'react';

import Icon from '../icon/icon';
import styles from './button.module.scss';

export type ButtonTypes = 'primary' | 'secondary' | 'link';

export interface ButtonProps {
  /**
   * Button text
   */
  text: string;
  /**
   * If button is disabled
   */
  disabled?: boolean;
  /**
   * If button should take all the space it has
   */
  fullWidth?: boolean;
  /**
   * Additional custom class name.
   */
  className?: string;
  /**
   * Additional custom class name for Icon.
   */
  classNameIcon?: string;
  /**
   * ID attribute.
   */
  id?: string;
  /**
   * Button visual type
   */
  type?: ButtonTypes;
  /**
   * Color schema for button
   */
  color?: 'default' | 'error' | 'success' | 'inverted';
  /**
   * Button size
   */
  size?: 'small';
  /**
   * onClick handler.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * onTouchStart handler.
   */
  onTouchStart?: (event: React.TouchEvent<HTMLButtonElement> | React.TouchEvent<HTMLAnchorElement>) => void;
  /**
   * Name of the icon when button only has an icon in it.
   */
  icon?: string;
  /**
   * Name of the icon we want to show on the left.
   */
  iconLeft?: string;
  /**
   * Name of the icon we want to show on the right.
   */
  iconRight?: string;
  /**
   * Underline the button text
   */
  underline?: boolean;
  /**
   * If button is active and should keep its hover state.
   */
  isHovered?: boolean;
  /**
   * If button is active and should keep it's active state.
   */
  isActive?: boolean;
  /**
   * The element type attribute specifies the type of HTML button.
   */
  elementType?: 'button' | 'submit' | 'reset' | undefined;
  /**
   * URL the button should link to. (If button should act as link)
   */
  url?: LinkProps['href'];
  /**
   * Target attribute of link element.
   */
  target?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref): JSX.Element => {
  const {
    text,
    icon,
    disabled,
    className,
    classNameIcon,
    id,
    type = 'primary',
    size,
    color = 'default',
    onClick,
    onTouchStart,
    iconLeft,
    iconRight,
    underline = false,
    isActive,
    isHovered,
    elementType = 'button',
    url,
    target,
    fullWidth,
  } = props;
  const ButtonBEM = cn(
    styles['btn'],
    styles[`btn--${type}`],
    styles[`btn--${color}`],
    className,
    { [styles['btn--disabled']]: disabled },
    { [styles[`btn--${size}`]]: size },
    { [styles['btn--underline']]: underline },
    { [styles['btn--is-hovered']]: isHovered },
    { [styles['btn--is-active']]: isActive },
    { [styles['btn--icon-only']]: icon },
    { [styles['btn--full-width']]: fullWidth }
  );

  const getIcon = (location: string, name: string): JSX.Element => (
    <Icon name={name} size={16} className={cn(styles['btn__icon'], styles[`btn__icon--${location}`], classNameIcon)} />
  );

  const renderContent = (): JSX.Element => (
    <span className={styles['btn__inner']}>
      {icon && getIcon('centre', icon)}
      {iconLeft && getIcon('left', iconLeft)}
      <span className={styles['btn__text']}>{text}</span>
      {iconRight && getIcon('right', iconRight)}
    </span>
  );

  const renderButton = (): JSX.Element => (
    <button
      id={id}
      type={elementType}
      disabled={disabled}
      className={ButtonBEM}
      onClick={onClick}
      onTouchStart={onTouchStart}
      ref={ref}
    >
      {renderContent()}
    </button>
  );

  const renderAnchor = (url: LinkProps['href']): JSX.Element => (
    <Link href={url} passHref>
      <a
        id={id}
        className={ButtonBEM}
        href={typeof url === 'string' ? url : url.pathname || undefined}
        onClick={onClick}
        onTouchStart={onTouchStart}
        target={target}
      >
        {renderContent()}
      </a>
    </Link>
  );

  return url ? renderAnchor(url) : renderButton();
});

Button.displayName = 'Button';

export default Button;
