import cn from 'classnames';

import type { HeadingLevel } from '../heading/heading';

export type HeadingModifiers = `h${HeadingLevel}`;

export type TextModifiers =
  | HeadingModifiers
  | 'normal'
  | 'small'
  | 'bold'
  | 'italic'
  | 'center'
  | 'left'
  | 'right'
  | 'nowrap'
  | 'break-all'
  | 'break-word'
  | 'break-spaces'
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'capitalize-first'
  | 'inline-block'
  | 'inline';

export type TextColor =
  | 'default'
  | 'primary'
  | 'muted'
  | 'subtle'
  | 'disabled'
  | 'inverted'
  | 'positive'
  | 'important'
  | 'warning';

export type TextElement = 'div' | 'p' | 'span' | 'li' | HeadingModifiers;

export interface TextProps {
  /**
   * Children of the text.
   */
  children: React.ReactNode;
  /**
   * ID attribute.
   */
  id?: string;
  /**
   * Allows to focus the element
   */
  tabIndex?: number;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Base element.
   * @default p
   */
  element?: TextElement;
  /**
   * Single or multiple modifiers to change the text behavior.
   */
  modifiers?: TextModifiers[] | TextModifiers;
  /**
   * Which color text should be.
   * Use 'positive', 'important' or 'warning' with caution, usually they should not be in application UI.
   * @default default
   */
  color?: TextColor;
}

export const Text = (props: TextProps): JSX.Element => {
  const { children, className, element: Element = 'p', modifiers, color, ...rest } = props;

  const modifiersArray = typeof modifiers === 'string' ? [modifiers] : modifiers;

  const BEM = cn(
    className,
    modifiersArray?.map((modifier) => `text-${modifier}`),
    { [`text-${color}`]: color }
  );

  return (
    <Element className={BEM} {...rest}>
      {children}
    </Element>
  );
};

export default Text;
