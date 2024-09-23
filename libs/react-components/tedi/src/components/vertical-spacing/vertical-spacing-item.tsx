import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../helpers';
import { VerticalSpacingSize } from './vertical-spacing';
import styles from './vertical-spacing.module.scss';

type VerticalSpacingItemBreakpointProps = {
  /**
   * Size of spacing {size}em unit of margin-bottom
   * @default 1
   */
  size?: VerticalSpacingSize;
};

export interface VerticalSpacingItemProps extends BreakpointSupport<VerticalSpacingItemBreakpointProps> {
  /**
   * Any content to be rendered within the spacing component
   */
  children: React.ReactNode;
  /**
   * The HTML element to render, such as `div`, `section`, `article`, etc
   * @default div
   */
  element?: keyof JSX.IntrinsicElements;
  /**
   * Additional class name(s) to apply to the element
   */
  className?: string;
}

export const VerticalSpacingItem = (props: VerticalSpacingItemProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    children,
    className,
    element: Element = 'div',
    size = 1,
    ...rest
  } = getCurrentBreakpointProps<VerticalSpacingItemProps>(props);

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
