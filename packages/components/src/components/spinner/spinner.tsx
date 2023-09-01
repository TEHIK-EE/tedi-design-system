import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../providers/label-provider';
import { IconSize } from '../icon/icon';
import { TextColor } from '../typography/text/text';
import styles from './spinner.module.scss';

export type SpinnerStrokeWidth = 4 | 6;

export interface SpinnerProps {
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Size of the spinner.
   * @default 16
   */
  size?: IconSize;
  /**
   * Thickness of the Spinner.
   * @default 4
   */
  strokeWidth?: SpinnerStrokeWidth;
  /**
   * Which color Spinner should be.
   * Use 'positive', 'important' or 'warning' with caution, usually they should not be in application UI.
   * @default default
   */
  color?: TextColor;
  /**
   * Label for screen-readers.
   * If omitted then the spinner is hidden for screen-readers.
   */
  label?: string;
  /**
   * Position of the Spinner.
   */
  position?: 'absolute';
}

/**
 * Spinner is used to indicate a loading state when the structure or content of the page is unknown. It can be used on its own or inside other
 * components. If possible, it is recommended to use the Skeleton loader over the Spinner.
 */
export const Spinner = (props: SpinnerProps): JSX.Element => {
  const { getLabel } = useLabels();

  const { className, size = 16, color, label = getLabel('spinner.loading'), position, strokeWidth = 4 } = props;

  const spinnerVariant = {
    '--spinner-internal-variation-size': `${size / 16}rem`,
    '--spinner-internal-variation-stroke-width': `${strokeWidth / 16}rem`,
  } as React.CSSProperties;

  const spinnerBEM = cn(styles['spinner'], className, {
    [styles[`spinner--${position}`]]: !!position,
    [`text-${color}`]: color,
  });

  const radius = 24 - strokeWidth;

  return (
    <span className={spinnerBEM} style={spinnerVariant} aria-hidden={!label} aria-label={label}>
      <svg viewBox="22 22 44 44">
        <circle className={styles['spinner__inner']} cx="44" cy="44" r={radius} fill="none"></circle>
      </svg>
    </span>
  );
};

export default Spinner;
