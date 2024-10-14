import cn from 'classnames';
import React, { forwardRef } from 'react';

import { AllowedHTMLTags, PolymorphicComponentPropWithRef, PolymorphicRef } from '../../helpers/polymorphic/types';
import { IntentionalAny } from '../../types';
import { ButtonColor, ButtonType } from '../button/button';
import Icon, { IconProps } from '../icon/icon';
import Print from '../print/print';
import Spinner from '../spinner/spinner';
import styles from './button-content.module.scss';

export type ButtonContentProps<
  C extends React.ElementType,
  P extends Record<string, IntentionalAny>,
  A
> = PolymorphicComponentPropWithRef<
  AllowedHTMLTags<C, A>,
  {
    /**
     * Button children
     */
    children: React.ReactNode;
    /**
     * Additional custom class name.
     */
    className?: string;
    /**
     * Button visual type
     * @default primary
     */
    visualType?: ButtonType;
    /**
     * If button should take all the space it has
     */
    fullWidth?: boolean;
    /**
     * Color schema for button. PS text-color works only with link type links.
     * @default default
     */
    color?: ButtonColor;
    /**
     * Button size
     */
    size?: 'small';
    /**
     * Name of the icon when button only has an icon in it.
     */
    icon?: string | IconProps;
    /**
     * Name of the icon we want to show on the left.
     */
    iconLeft?: string | IconProps;
    /**
     * Name of the icon we want to show on the right.
     */
    iconRight?: string | IconProps;
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
     * If button is in loading state and should show spinner.
     * When isLoading is true, button does not trigger onClick event.
     * @default false
     */
    isLoading?: boolean;
    /**
     * Skip applying button/link styles
     * Useful when you just want to use Button or Anchor logic without the styles
     * In this case icon, iconLeft and iconRight are ignored
     */
    noStyle?: boolean;
    /**
     *
     */
    renderWrapperElement?: unknown;
  } & P
>;

export type ButtonContentComponent = <C extends React.ElementType, P extends Record<string, IntentionalAny>, A>(
  props: ButtonContentProps<C, P, A>
) => React.ReactElement | null;

const InternalButtonContent = forwardRef(
  <C extends React.ElementType, P extends Record<string, IntentionalAny>, A>(
    {
      children,
      as,
      text,
      className,
      visualType = 'primary',
      color = 'default',
      size,
      icon,
      iconLeft,
      iconRight,
      underline = false,
      isHovered,
      isActive,
      isLoading = false,
      noStyle,
      renderWrapperElement,
      fullWidth,
      onClick,
      ...rest
    }: ButtonContentProps<C, P, A>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';
    const hasIcon = icon || iconLeft || iconRight;

    const BEM = !noStyle
      ? cn(
          styles['btn'],
          styles[`btn--${visualType}`],
          styles[`btn--${color}`],
          className,
          { [styles[`btn--${size}`]]: size },
          { [styles['btn--underline']]: underline },
          { [styles['btn--is-hovered']]: isHovered },
          { [styles['btn--is-active']]: isActive },
          { [styles['btn--is-loading']]: isLoading },
          { [styles['btn--icon-only']]: icon },
          { [styles['btn--icon']]: hasIcon },
          { [styles['btn--full-width']]: fullWidth }
        )
      : cn(styles['btn--no-style'], className, { [styles['btn--full-width']]: fullWidth });

    const getIcon = (location: string, icon: string | IconProps): JSX.Element => {
      const iconBEM = cn(styles['btn__icon'], styles[`btn__icon--${location}`], {
        [styles['btn__spinner']]: isLoading,
      });
      const defaultIconProps: Partial<IconProps> = { size: 16, className: iconBEM };
      const iconProps: IconProps =
        typeof icon === 'string'
          ? { ...defaultIconProps, name: icon }
          : { ...defaultIconProps, ...icon, className: cn(defaultIconProps.className, icon?.className) };

      return isLoading ? <Spinner className={iconProps.className} /> : <Icon {...iconProps} />;
    };

    const renderContent = (): JSX.Element => (
      <span className={styles['btn__inner']}>
        {icon && getIcon('centre', icon)}
        {iconLeft && getIcon('left', iconLeft)}
        <span className={styles['btn__text']}>{children}</span>
        {isLoading && !hasIcon && <Spinner position="absolute" className={styles['btn__spinner']} />}
        {iconRight && getIcon('right', iconRight)}
      </span>
    );

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      if (onClick && !isLoading) onClick(event);
    };

    return (
      <Print visibility="hide">
        <Component
          data-name="button-content"
          {...rest}
          aria-disabled={isLoading || rest['aria-disabled']}
          onClick={onClickHandler}
          ref={ref}
          className={BEM}
        >
          {!noStyle ? renderContent() : children}
        </Component>
      </Print>
    );
  }
);

InternalButtonContent.displayName = 'ButtonContent';

/**
 * Shares the rendering logic between `Anchor` and `Button`. We don't export it from the component library.
 */
// TODO: Remove ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ButtonContent: ButtonContentComponent = InternalButtonContent;

export default ButtonContent;
