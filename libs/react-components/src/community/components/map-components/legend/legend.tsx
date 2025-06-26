import cn from 'classnames';
import { JSX } from 'react';

import { Text } from '../../../../tedi';
import styles from './legend.module.scss';

export interface LegendProps {
  /**
   * Optional fixed width for the label section. Accepts a string (e.g., "100px", "10%") or a number (interpreted as pixels).
   */
  labelWidth?: string | number;
  /**
   * The main label text or React node to be shown in the legend.
   */
  label: React.ReactNode | string;
  /**
   * Optional icon to display alongside the label.
   */
  icon?: React.ReactNode;
  /**
   * Descriptive text associated with the legend item.
   */
  description: string;
  /**
   * Optional custom class name for styling the legend item.
   */
  className?: string;
}

export const Legend = (props: LegendProps): JSX.Element => {
  const { label, labelWidth, description, className } = props;

  const legendBEM = cn(styles['tedi-legend'], className);
  const labelWidthStyle = typeof labelWidth === 'number' ? `${labelWidth}%` : labelWidth;

  return (
    <dl className={legendBEM} style={{ '--label-width': labelWidthStyle } as React.CSSProperties}>
      <dt className={cn(styles['tedi-legend__label'])}>{label}</dt>
      <dd>
        <Text modifiers="small">{description}</Text>
      </dd>
    </dl>
  );
};

export default Legend;
