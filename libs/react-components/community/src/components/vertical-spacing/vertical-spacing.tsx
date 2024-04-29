import cn from 'classnames';

import styles from './vertical-spacing.module.scss';

export type VerticalSpacingSize = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5 | 3 | 4 | 5;

export interface VerticalSpacingProps {
  /**
   * Any content.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Rendered HTML Element.
   * @default div
   */
  element?: keyof JSX.IntrinsicElements;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * size of spacing
   * All children elements are getting {size}em unit of margin-bottom.
   * @default 1
   */
  size?: VerticalSpacingSize;
}

export const VerticalSpacing = (props: VerticalSpacingProps): JSX.Element => {
  const { children, className, element: Element = 'div', size = 1, ...rest } = props;
  const VerticalSpacingBEM = cn(styles['vertical-spacing'], className);

  return (
    <Element
      data-name="vertical-spacing"
      {...rest}
      style={{ '--vertical-spacing-internal': `${size}${size !== 0 ? 'em' : ''}` }}
      className={VerticalSpacingBEM}
    >
      {children}
    </Element>
  );
};

export default VerticalSpacing;
