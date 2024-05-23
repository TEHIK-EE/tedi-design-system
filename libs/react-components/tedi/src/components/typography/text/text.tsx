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
  | 'line-condensed';

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
  | 'subtitle';

export type TextElement = 'div' | 'p' | 'span' | 'li' | 'label' | HeadingModifiers;

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
  /**
   * Text is subtitle
   */
  subtitle?: boolean;
}

const isHeadingModifier = (modifier: TextModifiers): modifier is HeadingModifiers => {
  return modifier.startsWith('h');
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
    subtitle,
    ...rest
  } = getCurrentBreakpointProps<TextProps>(props);

  const modifiersArray = typeof modifiers === 'string' ? [modifiers] : modifiers;

  const BEM = cn(
    className,
    modifiersArray?.map((modifier) => (isHeadingModifier(modifier) ? `tedi-text--${modifier}` : `text-${modifier}`)),
    { [`tedi-text--${color}`]: color },
    { [`tedi-text--subtitle`]: subtitle }
  );

  return (
    <Element className={BEM} {...rest} tabIndex={tabIndex}>
      {children}
    </Element>
  );
};
