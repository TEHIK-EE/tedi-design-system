import cn from 'classnames';
import React from 'react';

import { PolymorphicRef } from '../../helpers/polymorphic/types';
import ButtonContent, { ButtonContentProps } from '../button-content/button-content';
import styles from './button.module.scss';

export interface IInternalButtonProps {
  /**
   * If button should take all the space it has
   */
  fullWidth?: boolean;
}

type AllowedTags = 'button';

export type ButtonProps<C extends React.ElementType = 'button'> = ButtonContentProps<
  C,
  IInternalButtonProps,
  AllowedTags
>;

export type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

const InternalButton = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      children,
      as,
      className,
      classNameIcon,
      visualType,
      color,
      size,
      icon,
      iconLeft,
      iconRight,
      underline,
      isHovered,
      isActive,
      noStyle,
      fullWidth,
      ...rest
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const ComponentAs = as || 'button';

    const BEM = cn(className, { [styles['btn--full-width']]: fullWidth });

    return (
      <ButtonContent
        data-name="button"
        {...rest}
        type={rest.type || 'button'}
        ref={ref}
        as={ComponentAs}
        className={BEM}
        classNameIcon={classNameIcon}
        visualType={visualType}
        color={color}
        size={size}
        icon={icon}
        iconLeft={iconLeft}
        iconRight={iconRight}
        underline={underline}
        isHovered={isHovered}
        isActive={isActive}
        noStyle={noStyle}
      >
        {children}
      </ButtonContent>
    );
  }
);

InternalButton.displayName = 'Button';

/**
 * Renders a `<button>` tag and has all of its props plus our own defined props
 */
export const Button: ButtonComponent = InternalButton;

export default Button;
