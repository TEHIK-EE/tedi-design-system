import cn from 'classnames';

import { VerticalSpacingSize } from './vertical-spacing';
import styles from './vertical-spacing.module.scss';

export interface VerticalSpacingItemProps {
  /**
   * Any content.
   */
  children: React.ReactNode;
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
   * size of spacing {size}em unit of margin-bottom
   * @default 1
   */
  size?: VerticalSpacingSize;
}

export const VerticalSpacingItem = (props: VerticalSpacingItemProps): JSX.Element => {
  const { children, className, element: Element = 'div', size = 1, ...rest } = props;
  const VerticalSpacingItemBEM = cn(styles['vertical-spacing__item'], className);

  return (
    <Element
      data-name="vertical-spacing-item"
      {...rest}
      style={{ '--vertical-spacing-internal': `${size}${size !== 0 ? 'em' : ''}` }}
      className={VerticalSpacingItemBEM}
    >
      {children}
    </Element>
  );
};

export default VerticalSpacingItem;
