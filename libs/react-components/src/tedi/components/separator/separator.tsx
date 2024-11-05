import cn from 'classnames';
import { CSSProperties } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../helpers';
import styles from './separator.module.scss';

export type SeparatorSpacing = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5 | 5;

export interface SeparatorSharedProps {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Rendered HTML element.
   * @default div
   */
  element?: 'hr' | 'div' | 'span';
  /**
   * Whether the separator should stretch to fill the full spacing inside cardContent.
   */
  isStretched?: boolean;
  /*
   * Color of separator
   * @default default
   */
  color?: 'primary' | 'secondary' | 'accent';
  /*
   * Separator style variant.
   */
  variant?: 'dotted' | 'dotted-small' | 'dot-only';
  /*
   * Dot size.
   * Only used when variant="dot-only"
   */
  dotSize?: 'large' | 'medium' | 'small';
  /*
   * Thickness in pixels (ignored if variant is used).
   * @default 1
   */
  thickness?: 1 | 2;
}

export interface SeparatorVerticalProps extends SeparatorSharedProps {
  /**
   * Height of separator. Use with vertical axis, when full-width separator is not needed.
   * Height can be number in rem units. It's customizable to allow for more flexibility around X components.
   */
  height?: number;
  /**
   * Axis of separator, vertical and horizontal separators support different props
   */
  axis: 'vertical';
  spacing?: undefined;
  topSpacing?: undefined;
  bottomSpacing?: undefined;
}

export interface SeparatorHorizontalProps extends SeparatorSharedProps {
  /**
   * Spacing on top and bottom of separator. Only for horizontal axis.
   */
  spacing?: SeparatorSpacing;
  /**
   * Spacing on top of separator. Ignored when spacing is also used. Only for horizontal axis.
   */
  topSpacing?: SeparatorSpacing;
  /**
   * Spacing on bottom of separator. Ignored when spacing is also used. Only for horizontal axis.
   */
  bottomSpacing?: SeparatorSpacing;
  /**
   * Axis of separator, vertical and horizontal separators support different props
   */
  axis?: 'horizontal';
  height?: undefined;
}

export type SeparatorBreakpointProps = {
  /**
   * Spacing values based on breakpoints.
   */
  spacing?: Omit<SeparatorHorizontalProps['spacing'], 'axis'>;
  /**
   * Height values based on breakpoints (for vertical separators).
   */
  height?: Omit<SeparatorVerticalProps['height'], 'axis'>;
};

export type SeparatorProps = BreakpointSupport<SeparatorHorizontalProps | SeparatorVerticalProps> &
  SeparatorBreakpointProps;

export const Separator = (props: SeparatorProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    className,
    element: Element = 'div',
    isStretched,
    spacing,
    topSpacing,
    bottomSpacing,
    axis = 'horizontal',
    color = 'default',
    variant,
    thickness = 1,
    height,
    dotSize,
    ...rest
  } = getCurrentBreakpointProps<SeparatorProps>(props);

  const SeparatorBEM = cn(
    styles['separator'],
    className,
    { [styles[`separator--${color}`]]: color },
    { [styles[`separator--${axis}`]]: axis },
    { [styles[`separator--${variant}`]]: variant },
    { [styles[`separator--${variant}-${dotSize}`]]: variant && dotSize },
    { [styles[`separator--thickness-${thickness}`]]: thickness && !variant },
    { [styles['separator--is-stretched']]: isStretched },
    { [styles[`separator--spacing-${spacing}`.replace('.', '-')]]: spacing },
    { [styles[`separator--top-${topSpacing}`.replace('.', '-')]]: !spacing && topSpacing },
    { [styles[`separator--bottom-${bottomSpacing}`.replace('.', '-')]]: !spacing && bottomSpacing }
  );

  const getCssVars = () => {
    const cssvars: CSSProperties = {};

    if (height) cssvars['--vertical-separator-height'] = `${height}rem`;

    return cssvars;
  };

  return <Element data-name="separator" {...rest} style={getCssVars()} className={SeparatorBEM} />;
};

export default Separator;
