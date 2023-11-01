import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../providers/label-provider';
import { TColorsBackground } from '../commonTypes';
import styles from './spinner.module.scss';

export interface SpinnerProps {
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Size of the Spinner.
   * @default 16
   */
  size?: 10 | 16 | 48;
  /**
   * Which color Spinner should be.
   * @default 'bg-disabled'
   */
  color?: Extract<TColorsBackground, 'bg-disabled' | 'bg-default'>;
  /**
   * Label for screen-readers.
   * If omitted then the Spinner is hidden for screen-readers.
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

  const { className, size = 16, color = 'bg-disabled', label = getLabel('spinner.loading'), position } = props;

  const strokeWidth = size === 48 ? 6 : 4;
  const radius = 24 - strokeWidth;

  const spinnerVariant = {
    '--spinner-internal-variation-size': `${size / 16}rem`,
    '--spinner-internal-variation-stroke-width': `${strokeWidth / 16}rem`,
    '--spinner-internal-variation-stroke-color': `var(--color-${color})`,
  } as React.CSSProperties;

  const spinnerBEM = cn(styles['spinner'], className, {
    [styles[`spinner--${position}`]]: !!position,
  });

  return (
    <span className={spinnerBEM} style={spinnerVariant} aria-hidden={!label} aria-label={label}>
      <svg viewBox="22 22 44 44">
        <circle className={styles['spinner__inner']} cx="44" cy="44" r={radius} fill="none"></circle>
      </svg>
    </span>
  );
};

export default Spinner;
