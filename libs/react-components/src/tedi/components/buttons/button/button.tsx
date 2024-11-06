import React, { forwardRef } from 'react';

import { PolymorphicRef } from '../../../helpers/polymorphic/types';
import { UnknownType } from '../../../types/commonTypes';
import ButtonContent, { ButtonContentProps } from '../button-content/button-content';

export type ButtonType = 'primary' | 'secondary' | 'neutral' | 'link';
export type ButtonColor = 'default' | 'danger' | 'success' | 'inverted' | 'text';

interface IInternalButtonProps {
  /**
   * Button type
   * @default button
   */
  type?: 'submit' | 'button' | 'reset';
  /**
   * Skips form's browser validation
   * @default true when type="submit"
   */
  formNoValidate?: boolean;
}

type AllowedTags = 'button';

export type ButtonProps<C extends React.ElementType = 'button'> = ButtonContentProps<
  C,
  IInternalButtonProps,
  AllowedTags
>;

const ButtonComponent = forwardRef(
  <C extends React.ElementType = 'button'>(props: ButtonProps<C>, ref?: PolymorphicRef<C>) => {
    const {
      children,
      as,
      type = 'button',
      formNoValidate = type === 'submit' ? true : undefined,
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
      ...rest
    } = props;

    const ComponentAs = as || 'button';

    return (
      <ButtonContent
        data-name="button"
        {...(rest as UnknownType)}
        type={type}
        formNoValidate={formNoValidate}
        ref={ref}
        as={ComponentAs}
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

ButtonComponent.displayName = 'Button';

export const Button = ButtonComponent as <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

export default Button;
