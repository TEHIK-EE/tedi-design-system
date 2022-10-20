import cn from 'classnames';

import styles from './separator.module.scss';

export type SeparatorSpacing = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5;

export interface SeparatorProps {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Rendered HTML element.
   */
  element?: 'hr' | 'div' | 'span';
  /**
   * Full-width separator.
   */
  fullWidth?: boolean;
  /**
   * Spacing on top and bottom of separator
   */
  spacing?: SeparatorSpacing;
  /**
   * Spacing on top of separator. Ignored when spacing is also used
   */
  topSpacing?: SeparatorSpacing;
  /**
   * Spacing on bottom of separator. Ignored when spacing is also used
   */
  bottomSpacing?: SeparatorSpacing;
}

export const Separator = (props: SeparatorProps): JSX.Element => {
  const { className, element: Element = 'div', fullWidth, spacing, topSpacing, bottomSpacing } = props;
  const SeparatorBEM = cn(
    styles['separator'],
    className,
    { [styles['separator--full-width']]: fullWidth },
    { [styles[`separator--spacing-${spacing}`.replace('.', '-')]]: spacing },
    { [styles[`separator--top-${topSpacing}`.replace('.', '-')]]: !spacing && topSpacing },
    { [styles[`separator--bottom-${bottomSpacing}`.replace('.', '-')]]: !spacing && bottomSpacing }
  );

  return <Element className={SeparatorBEM} />;
};

export default Separator;
