import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../../../../shared/helpers';
import type { HeadingLevel } from '../heading/heading';

export type HeadingModifiers = `h${HeadingLevel}`;

export type TextModifiers =
  | HeadingModifiers
  | 'normal'
  | 'small'
  | 'bold'
  | 'thin'
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
  | 'inline'
  | 'line-normal'
  | 'line-condensed';

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

type TextBreakpointProps = {
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
};

export interface TextProps extends BreakpointSupport<TextBreakpointProps> {
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
}

export const Text = (props: TextProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    children,
    className,
    tabIndex,
    element: Element = 'p',
    modifiers,
    color,
    ...rest
  } = getCurrentBreakpointProps<TextProps>(props, {
    tabIndex: props.id ? -1 : undefined, // when id is set on a text element we most likely want to jump to it with a reference link
  });

  const modifiersArray = typeof modifiers === 'string' ? [modifiers] : modifiers;

  const BEM = cn(
    className,
    modifiersArray?.map((modifier) => `text-${modifier}`),
    { [`text-${color}`]: color }
  );

  return (
    <Element className={BEM} {...rest} tabIndex={tabIndex}>
      {children}
    </Element>
  );
};

export default Text;
