import cn from 'classnames';
import { forwardRef } from 'react';

import { Icon } from '../..';
import { AllowedHTMLTags, PolymorphicComponentPropWithRef, PolymorphicRef } from '../../helpers/polymorphic/types';
import styles from './button-content.module.scss';

export type ButtonTypes = 'primary' | 'secondary' | 'link';

export type ButtonContentProps<
  C extends React.ElementType,
  P extends Record<string, any>,
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
     * Additional custom class name for Icon.
     */
    classNameIcon?: string;
    /**
     * Button visual type
     */
    visualType?: ButtonTypes;
    /**
     * Color schema for button. PS text-color works only with link type links.
     */
    color?: 'default' | 'error' | 'success' | 'inverted' | 'text-color';
    /**
     * Button size
     */
    size?: 'small';
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

export type ButtonContentComponent = <C extends React.ElementType, P extends Record<string, any>, A>(
  props: ButtonContentProps<C, P, A>
) => React.ReactElement | null;

const InternalButtonContent = forwardRef(
  <C extends React.ElementType, P extends Record<string, any>, A>(
    {
      children,
      as,
      text,
      className,
      classNameIcon,
      visualType = 'primary',
      color = 'default',
      size,
      icon,
      iconLeft,
      iconRight,
      underline = false,
      isHovered,
      isActive,
      noStyle,
      renderWrapperElement,
      ...rest
    }: ButtonContentProps<C, P, A>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';

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
          { [styles['btn--icon-only']]: icon }
        )
      : cn(styles['btn--no-style'], className);

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
        <span className={styles['btn__text']}>{children}</span>
        {iconRight && getIcon('right', iconRight)}
      </span>
    );

    return (
      <Component {...rest} ref={ref} className={BEM}>
        {!noStyle ? renderContent() : children}
      </Component>
    );
  }
);

InternalButtonContent.displayName = 'ButtonContent';

/**
 * Shares the rendering logic between `Anchor` and `Button`. We don't export it from the component library.
 */
const ButtonContent: ButtonContentComponent = InternalButtonContent;

export default ButtonContent;
