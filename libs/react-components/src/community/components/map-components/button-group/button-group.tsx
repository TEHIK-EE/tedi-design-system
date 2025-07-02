import cn from 'classnames';
import { Children, cloneElement, isValidElement, JSX, ReactNode } from 'react';

import MapButton, { MapButtonProps } from '../map-button/map-button';
import styles from './button-group.module.scss';

export type ButtonGroupProps = {
  /**
   * The child components to render inside the ButtonGroup.
   * Typically, these should be `<Button>` components.
   */
  children: ReactNode;
  /**
   * The layout direction of the ButtonGroup.
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
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
  /**
   * Content to display before the buttons (prefix)
   */
  prefix?: string;
  /**
   * Content to display after the buttons (suffix)
   */
  suffix?: string;
  /**
   * CSS class for the prefix element
   */
  prefixClassName?: string;
  /**
   * CSS class for the suffix element
   */
  suffixClassName?: string;
};

export const ButtonGroup = (props: ButtonGroupProps): JSX.Element => {
  const {
    children,
    className,
    direction = 'horizontal',
    onSelectionChange,
    stretch = false,
    ariaLabel,
    prefix,
    suffix,
    prefixClassName,
    suffixClassName,
  } = props;

  return (
    <div
      className={cn(
        styles['tedi-button-group'],
        styles[`tedi-button-group--${direction}`],
        {
          [styles['tedi-button-group--stretch']]: stretch,
        },
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {prefix && (
        <div className={cn(styles['tedi-button-group__prefix'], prefixClassName)}>
          <span>{prefix}</span>
        </div>
      )}

      {Children.map(children, (child) => {
        if (isValidElement(child) && child.type === MapButton) {
          const typedChild = child as React.ReactElement<MapButtonProps>;
          return cloneElement(typedChild, {
            className: cn(styles['tedi-button-group__item'], {
              [styles['tedi-button-group__item--active']]: typedChild.props.isActive,
              [styles['tedi-button-group__item--disabled']]: typedChild.props.disabled,
            }),
            onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
              if (!typedChild.props.disabled) {
                typedChild.props.onClick?.(event);
                onSelectionChange?.(typedChild.props.id as string);
              }
            },
          });
        }
        return child;
      })}

      {suffix && (
        <div className={cn(styles['tedi-button-group__suffix'], suffixClassName)}>
          <span>{suffix}</span>
        </div>
      )}
    </div>
  );
};

export default ButtonGroup;
