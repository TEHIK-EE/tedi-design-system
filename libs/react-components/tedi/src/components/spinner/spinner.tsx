import cn from 'classnames';
import React from 'react';

import styles from './spinner.module.scss';

export interface SpinnerProps {
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Size of the spinner.
   * @default 16
   */
  size?: 10 | 16 | 48;
  /**
   * Which color spinner should be.
   * @default 'primary'
   */
  color?: 'primary' | 'secondary';
  /**
   * Label for screen-readers.
   * If omitted then the spinner is hidden for screen-readers.
   */
  label?: string;
  /**
   * Position of the spinner.
   */
  position?: 'absolute';
}

/**
 * Spinner is used to indicate a loading state when the structure or content of the page is unknown. It can be used on its own or inside other
 * components. If possible, it is recommended to use the Skeleton loader over the Spinner.
 */
export const Spinner = (props: SpinnerProps): JSX.Element => {
  const { className, size = 16, color = 'primary', label = props.label, position } = props;

  const strokeWidth = 4;
  const radius = 24 - strokeWidth;

  const spinnerVariant = {
    '--spinner-internal-variation-size': `${size / 16}rem`,
    '--spinner-internal-variation-stroke-width': `${strokeWidth / 16}rem`,
    '--spinner-internal-variation-stroke-color': `var(--loader-color-${color})`,
  } as React.CSSProperties;

  const spinnerBEM = cn(styles['tedi-spinner'], className, {
    [styles[`tedi-spinner--${position}`]]: !!position,
  });

  return (
    <span data-testid="spinner" className={spinnerBEM} style={spinnerVariant} aria-hidden={!label} aria-label={label}>
      <svg viewBox="22 22 44 44">
        <circle className={styles['tedi-spinner__inner']} cx="44" cy="44" r={radius} fill="none"></circle>
      </svg>
    </span>
  );
};

export default Spinner;
