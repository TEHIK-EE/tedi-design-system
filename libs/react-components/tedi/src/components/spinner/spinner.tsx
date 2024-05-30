import cn from 'classnames';

import styles from './spinner.module.scss';

export type SpinnerSize = 10 | 16 | 48;
export type SpinnerColor = 'primary' | 'secondary';
export type SpinnerPosition = 'absolute';

export interface SpinnerProps {
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Size of the spinner
   * @default 16
   */
  size?: SpinnerSize;
  /**
   * Which color spinner should be
   * @default 'primary'
   */
  color?: SpinnerColor;
  /**
   * Label for screen-readers
   * If omitted then the spinner is hidden for screen-readers
   */
  label: string;
  /**
   * Position of the spinner
   */
  position?: SpinnerPosition;
}

export const Spinner = (props: SpinnerProps): JSX.Element => {
  const { className, size = 16, color = 'primary', label = props.label, position } = props;

  const spinnerBEM = cn(
    styles['tedi-spinner'],
    className,
    position && styles[`tedi-spinner--${position}`],
    size && styles[`tedi-spinner--size-${size}`],
    color && styles[`tedi-spinner--color-${color}`]
  );

  return (
    <span className={spinnerBEM} role="status" aria-live="polite">
      <svg viewBox="22 22 44 44" aria-hidden="true">
        <circle className={styles['tedi-spinner--inner']} cx="44" cy="44" r="20" fill="none"></circle>
      </svg>
      <label className="sr-only">{label}</label>
    </span>
  );
};

Spinner.displayName = 'Spinner';
