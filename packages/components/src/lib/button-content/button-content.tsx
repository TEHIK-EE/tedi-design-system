import cn from 'classnames';
import { forwardRef } from 'react';

import { Icon } from '../..';
import styles from './button-content.module.scss';

export type ButtonTypes = 'primary' | 'secondary' | 'link';

export interface ButtonContentSharedProps {
  /**
   * Button text
   */
  text: string;
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
   * If button is disabled
   */
  disabled?: boolean;
}

export interface ButtonContentButtonProps extends ButtonContentSharedProps {
  element: 'button';
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonContentAnchorProps extends ButtonContentSharedProps {
  element: 'a';
  href?: string; // Passed by next/link
  attributes?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export type ButtonContentProps = ButtonContentButtonProps | ButtonContentAnchorProps;

export const ButtonContent = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonContentProps>(
  (props, ref): JSX.Element => {
    const {
      text,
      icon,
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
      disabled,
      element,
    } = props;

    const ButtonContentBEM = cn(
      styles['btn'],
      styles[`btn--${type}`],
      styles[`btn--${color}`],
      className,
      { [styles[`btn--${size}`]]: size },
      { [styles['btn--underline']]: underline },
      { [styles['btn--is-hovered']]: isHovered },
      { [styles['btn--is-active']]: isActive },
      { [styles['btn--icon-only']]: icon },
      { [styles['btn--disabled']]: disabled && element === 'button' }
    );

    const getIcon = (location: string, name: string): JSX.Element => (
      <Icon
        name={name}
        size={16}
        className={cn(styles['btn__icon'], styles[`btn__icon--${location}`], classNameIcon)}
      />
    );

    const renderContent = (): JSX.Element => (
      <span className={styles['btn__inner']}>
        {icon && getIcon('centre', icon)}
        {iconLeft && getIcon('left', iconLeft)}
        <span className={styles['btn__text']}>{text}</span>
        {iconRight && getIcon('right', iconRight)}
      </span>
    );

    const isButton = (props: ButtonContentProps): props is ButtonContentButtonProps => {
      return props.element === 'button';
    };

    if (isButton(props)) {
      return (
        <button
          {...props.attributes}
          id={id}
          className={ButtonContentBEM}
          ref={ref as any}
          onClick={onClick}
          onTouchStart={onTouchStart}
          // button specific attributes
          type={(props.attributes && props.attributes.type) || 'button'}
          disabled={disabled}
        >
          {renderContent()}
        </button>
      );
    }

    return (
      <a
        {...props.attributes}
        id={id}
        href={props.href}
        className={ButtonContentBEM}
        ref={ref as any}
        onClick={onClick}
        onTouchStart={onTouchStart}
      >
        {renderContent()}
      </a>
    );
  }
);

ButtonContent.displayName = 'ButtonContent';

export default ButtonContent;
