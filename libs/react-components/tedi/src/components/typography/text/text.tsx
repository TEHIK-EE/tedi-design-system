import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../../../../shared/hooks/use-breakpoint-props';
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
  | 'line-condensed'
  | 'subtitle';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'white'
  | 'disabled'
  | 'distinctive'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

export type TextElement = 'div' | 'p' | 'span' | 'li' | 'label' | HeadingModifiers;

type TextBreakpointProps = {
  /**
   * Additional class
   */
  className?: string;
  /**
   * Base element
   * @default p
   */
  element?: TextElement;
  /**
   * Single or multiple modifiers to change the text behavior
   */
  modifiers?: TextModifiers[] | TextModifiers;
  /**
   * Color of the text
   * Use 'success', 'important' or 'warning' with caution, usually they should not be in application UI
   * @default primary
   */
  color?: TextColor;
};

export interface TextProps extends BreakpointSupport<TextBreakpointProps> {
  /**
   * Children of the text
   */
  children: React.ReactNode;
  /**
   * ID attribute
   */
  id?: string;
  /**
   * Allows to focus the element
   */
  tabIndex?: number;
}

const isHeadingModifier = (modifier: TextModifiers): modifier is HeadingModifiers => {
  return /^h[1-6]$/.test(modifier);
};

export const Text = (props: TextProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    children,
    className,
    tabIndex = props.id ? -1 : undefined,
    element: Element = 'p',
    modifiers,
    color,
    ...rest
  } = getCurrentBreakpointProps<TextProps>(props);

  const modifiersArray = typeof modifiers === 'string' ? [modifiers] : modifiers;

  const BEM = cn(
    className,
    modifiersArray?.map((modifier) => (isHeadingModifier(modifier) ? `tedi-text--${modifier}` : `text-${modifier}`)),
    { [`tedi-text--${color}`]: color }
  );

  return (
    <Element className={BEM} {...rest} tabIndex={tabIndex}>
      {children}
    </Element>
  );
};
