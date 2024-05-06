import React, { forwardRef } from 'react';

import { PolymorphicRef } from '../../../../shared/helpers/polymorphic/types';
import { IntentionalAny } from '../../../../shared/types';
import ButtonContent, { ButtonContentProps } from '../button-content/button-content';

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'link';
export type ButtonColor = 'default' | 'important' | 'positive' | 'inverted' | 'text-color';

export interface IInternalButtonProps {
  /**
   * Button type
   * @default button
   */
  type?: 'submit' | 'button' | 'reset';
  /**
   * Skips forms browser validation
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

export type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

const InternalButton = forwardRef(
  <C extends React.ElementType = 'button'>(props: ButtonProps<C>, ref?: PolymorphicRef<C>) => {
    const {
      children,
      as,
      type,
      formNoValidate,
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
        {...(rest as IntentionalAny)}
        type={type || 'button'}
        formNoValidate={formNoValidate ?? type === 'submit' ? true : undefined}
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

InternalButton.displayName = 'Button';

/**
 * Renders a `<button>` tag and has all of its props plus our own defined props. For more info about usage of buttons see [Button](/docs/documentation-buttons-buttons--buttons) & [ButtonGroups](/docs/documentation-buttons-buttongroups--buttongroups) documentation.
 */
// TODO: Remove ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Button: ButtonComponent = InternalButton;

export default Button;
