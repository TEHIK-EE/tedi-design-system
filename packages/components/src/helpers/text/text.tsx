import cn from 'classnames';

export type TextModifiers =
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
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'capitalize-first';

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

export type TextElement = 'div' | 'p' | 'span';

export interface TextProps {
  /**
   * Children of the text.
   */
  children: React.ReactNode;
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
   * Sinfle or multiple modifiers to change the text behavior.
   */
  modifiers?: TextModifiers[] | TextModifiers;
  /**
   * Which color text should be.
   * Use 'positive', 'important' or 'warning' with cautsion, usaually they should not be in application UI.
   * @default default
   */
  color?: TextColor;
}

export const Text = (props: TextProps): JSX.Element => {
  const { children, className, element: Element = 'p', modifiers, color } = props;

  const modifiersArray = typeof modifiers === 'string' ? [modifiers] : modifiers;

  const BEM = cn(
    className,
    `text-${color}`,
    modifiersArray?.map((modifier) => `text-${modifier}`)
  );

  return <Element className={BEM}>{children}</Element>;
};

export default Text;
