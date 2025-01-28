import cn from 'classnames';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';

import Button, { ButtonProps } from '../button/button';
import styles from './button-group.module.scss';

export type ButtonGroupProps = {
  /**
   * The child components to render inside the ButtonGroup.
   * Typically, these should be `<Button>` components.
   */
  children: ReactNode;
  /**
   * The visual style of the ButtonGroup, determining its color and appearance.
   * @default primary
   */
  type?: 'primary' | 'secondary';
  /**
   * Callback function triggered when the selected button changes.
   * Receives the `id` of the selected button as an argument.
   */
  onSelectionChange?: (id: string) => void;
  /**
   * Whether all buttons in the group should have equal width and stretched inside their parent element.
   * If `true`, all buttons will take up equal space.
   * If `false`, the button widths will be determined by their content.
   * @default true
   */
  stretch?: boolean;
  /**
   * A label for the button group, used for accessibility.
   * Required if the group does not have a visible label.
   */
  ariaLabel?: string;
  /**
   * Additional custom CSS classes to apply to the ButtonGroup container
   */
  className?: string;
};

export const ButtonGroup = (props: ButtonGroupProps): JSX.Element => {
  const { children, className, type = 'primary', onSelectionChange, stretch = true, ariaLabel } = props;

  return (
    <div
      className={cn(
        styles['tedi-button-group'],
        styles[`tedi-button-group--${type}`],
        {
          [styles['tedi-button-group--stretch']]: stretch,
        },
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child) && child.type === Button) {
          return cloneElement(child as React.ReactElement<ButtonProps>, {
            className: cn(styles['tedi-button-group__item'], {
              [styles['tedi-button-group__item--active']]: child.props.isActive,
            }),
            onClick: () => {
              if (!child.props.disabled) {
                child.props.onClick?.();
                onSelectionChange?.(child.props.id);
              }
            },
          });
        }
        return null;
      })}
    </div>
  );
};

export default ButtonGroup;
