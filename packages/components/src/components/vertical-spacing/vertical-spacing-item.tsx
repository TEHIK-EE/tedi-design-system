import cn from 'classnames';

import styles from './vertical-spacing.module.scss';

export interface VerticalSpacingItemProps {
  /**
   * Any content.
   */
  children: React.ReactNode;
  /**
   * Rendered HTML Element. Defaults to "div".
   */
  element?: keyof JSX.IntrinsicElements;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * size of spacing {size}em unit of margin-bottom
   *
   */
  size?: 0 | 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;
}

export const VerticalSpacingItem = (props: VerticalSpacingItemProps): JSX.Element => {
  const { children, className, element: Element = 'div', size = 1 } = props;
  const VerticalSpacingItemBEM = cn(
    styles['vertical-spacing__item'],
    styles[`vertical-spacing__item--${size}`.replace('.', '-')],
    className
  );

  return (
    <Element data-name="vertical-spacing-item" className={VerticalSpacingItemBEM}>
      {children}
    </Element>
  );
};

export default VerticalSpacingItem;
