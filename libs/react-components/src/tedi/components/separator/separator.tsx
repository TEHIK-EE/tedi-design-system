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
  dotSize?: 'large' | 'medium' | 'small' | 'extra-small';
  /*
   * Thickness in pixels (ignored if variant is used).
   * @default 1
   */
  thickness?: 1 | 2;
  /**
   * Spacing applied based on the axis:
   * - For horizontal axis, spacing is applied to top and bottom of the separator.
   * - For vertical axis, spacing is applied to left and right of the separator.
   */
  spacing?: SeparatorSpacing;
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
  topSpacing?: undefined;
  bottomSpacing?: undefined;
  display?: 'block' | 'inline';
}

export interface SeparatorHorizontalProps extends SeparatorSharedProps {
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
  display?: 'block';
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
    display = 'block',
    ...rest
  } = getCurrentBreakpointProps<SeparatorProps>(props);

  const SeparatorBEM = cn(
    styles['tedi-separator'],
    className,
    { [styles[`tedi-separator--${color}`]]: color },
    { [styles[`tedi-separator--${axis}`]]: axis },
    { [styles[`tedi-separator--${variant}`]]: variant },
    { [styles[`tedi-separator--${display}`]]: display },
    { [styles[`tedi-separator--${variant}-${dotSize}`]]: variant && dotSize },
    { [styles[`tedi-separator--thickness-${thickness}`]]: thickness && !variant },
    { [styles['tedi-separator--is-stretched']]: isStretched },
    { [styles[`tedi-separator--spacing-${spacing}`.replace('.', '-')]]: spacing },
    { [styles[`tedi-separator--top-${topSpacing}`.replace('.', '-')]]: !spacing && topSpacing },
    { [styles[`tedi-separator--bottom-${bottomSpacing}`.replace('.', '-')]]: !spacing && bottomSpacing }
  );

  const getCssVars = () => {
    const cssvars: CSSProperties = {};

    if (height) cssvars['--vertical-separator-height'] = `${height}rem`;

    return cssvars;
  };

  return <Element data-name="separator" {...rest} style={getCssVars()} className={SeparatorBEM} />;
};

export default Separator;
