import cn from 'classnames';

import styles from './spinner.module.scss';

export type SpinnerSizeProps = 10 | 16 | 48;
export type SpinnerColorProps = 'primary' | 'secondary';

export interface SpinnerProps {
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Size of the spinner
   * @default 16
   */
  size?: SpinnerSizeProps;
  /**
   * Which color spinner should be
   * @default 'primary'
   */
  color?: SpinnerColorProps;
  /**
   * Label for screen-readers
   * If omitted then the spinner is hidden for screen-readers
   */
  label?: string;
  /**
   * Position of the spinner
   */
  position?: 'absolute';
}

const Spinner = (props: SpinnerProps): JSX.Element => {
  const { className, size = 16, color = 'primary', label = props.label, position } = props;

  const spinnerBEM = cn(
    styles['tedi-spinner'],
    className,
    position && styles[`tedi-spinner--${position}`],
    size && styles[`tedi-spinner--size-${size}`],
    color && styles[`tedi-spinner--color-${color}`]
  );

  return (
    <span data-testid="spinner" className={spinnerBEM} aria-hidden={!label} aria-label={label}>
      <svg viewBox="22 22 44 44">
        <circle className={styles['tedi-spinner--inner']} cx="44" cy="44" r="20" fill="none"></circle>
      </svg>
    </span>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;
