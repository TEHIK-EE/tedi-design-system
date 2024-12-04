import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../helpers';
import styles from './vertical-spacing.module.scss';

export type VerticalSpacingSize = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5 | 3 | 4 | 5;

type VerticalSpacingBreakpointProps = {
  /**
   * The size of the vertical spacing, applied as `margin-bottom`
   * The value corresponds to `em` units
   * @default 1
   */
  size?: VerticalSpacingSize;
};

export interface VerticalSpacingProps extends BreakpointSupport<VerticalSpacingBreakpointProps> {
  /**
   * Any content to be rendered within the spacing component
   */
  children: React.ReactNode | React.ReactNode[];
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

export const VerticalSpacing = (props: VerticalSpacingProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    children,
    className,
    element: Element = 'div',
    size = 1,
    ...rest
  } = getCurrentBreakpointProps<VerticalSpacingProps>(props);

  const VerticalSpacingBEM = cn(styles['tedi-vertical-spacing'], className);

  return (
    <Element
      data-name="vertical-spacing"
      role="presentation"
      {...rest}
      className={VerticalSpacingBEM}
      style={{ '--vertical-spacing-internal': size !== 0 ? `${size}em` : '0' }}
    >
      {children}
    </Element>
  );
};

export default VerticalSpacing;
