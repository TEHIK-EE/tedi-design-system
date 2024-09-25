import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../helpers';
import { VerticalSpacingItem, VerticalSpacingProps } from '../vertical-spacing';
import styles from './text-group.module.scss';

type TextGroupType = 'vertical' | 'horizontal';

type TextGroupBreakpointProps = {
  /**
   * Type of text group layout
   */
  type?: TextGroupType;
  /**
   * Width for the label (e.g., '200px', '30%', etc.)
   * @default 'auto'
   */
  labelWidth?: string;
  /**
   * VerticalSpacing props, if needed different spacing between items
   */
  verticalSpacing?: Omit<VerticalSpacingProps, 'element' | 'children'>;
};

export interface TextGroupProps extends BreakpointSupport<TextGroupBreakpointProps> {
  /**
   * Label for the text group
   */
  label: React.ReactNode;
  /**
   * Value displayed alongside the label
   */
  value: React.ReactNode | React.ReactNode[];
  /**
   * Additional class name(s) to apply to the element
   */
  className?: string;
}

export const TextGroup = (props: TextGroupProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    label,
    value,
    labelWidth = 'auto',
    verticalSpacing = { size: 0.5 },
    className,
    type = 'vertical',
  } = getCurrentBreakpointProps<TextGroupProps>(props);
  const textGroupBEM = cn(styles['tedi-text-group'], styles[`tedi-text-group--${type}`], className);

  return (
    <dl className={textGroupBEM} style={{ '--label-width': labelWidth }} role="group">
      <VerticalSpacingItem element="dt" className={cn(styles['tedi-text-group__label'])} {...verticalSpacing}>
        {label}
      </VerticalSpacingItem>
      <VerticalSpacingItem element="dd" className={cn(styles['tedi-text-group__value'])} {...verticalSpacing}>
        {value}
      </VerticalSpacingItem>
    </dl>
  );
};
