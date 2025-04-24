import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import styles from './stretch-content.module.scss';

type StretchContentDirection = 'both' | 'horizontal' | 'vertical';

interface StretchContentBreakpointProps {
  /**
   * An optional additional CSS class name to customize the styling of the container.
   * This will be appended to the default BEM class generated for the component.
   */
  className?: string;
  /**
   * Specifies the axis along which the child element should be stretched.
   * - `both` (default): Stretches the child element both horizontally and vertically.
   * - `horizontal`: Stretches the child element only horizontally (width).
   * - `vertical`: Stretches the child element only vertically (height).
   * @default 'both'
   */
  direction?: StretchContentDirection;
}

export interface StretchContentProps extends BreakpointSupport<StretchContentBreakpointProps> {
  /**
   * Element that will be stretched within the container.
   */
  children: React.ReactElement;
  /**
   * Accessibility role for the container.
   * @default none
   */
  role?: React.AriaRole;
}

export const StretchContent = (props: StretchContentProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    children,
    role,
    direction = 'both',
    className,
    ...rest
  } = getCurrentBreakpointProps<StretchContentProps>(props);

  const stretchContentBEM = cn(styles[`tedi-stretch-content--${direction}`], className);

  return (
    <div className={stretchContentBEM} role={role} {...rest}>
      {children}
    </div>
  );
};

export default StretchContent;
