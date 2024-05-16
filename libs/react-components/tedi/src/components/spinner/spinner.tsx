import cn from 'classnames';

import styles from './spinner.module.scss';

export interface SpinnerProps {
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Size of the spinner
   * @default 16
   */
  size?: 10 | 16 | 48;
  /**
   * Which color spinner should be
   * @default 'primary'
   */
  color?: 'primary' | 'secondary';
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

export const Spinner = (props: SpinnerProps): JSX.Element => {
  const { className, size = 16, color = 'primary', label = props.label, position } = props;

  const spinnerBEM = cn(styles['tedi-spinner'], className, {
    [styles[`tedi-spinner--${position}`]]: !!position,
    [styles[`tedi-spinner--size-${size}`]]: !!size,
    [styles[`tedi-spinner--color-${color}`]]: !!color,
  });

  return (
    <span data-testid="spinner" className={spinnerBEM} aria-hidden={!label} aria-label={label}>
      <svg viewBox="22 22 44 44">
        <circle className={styles['tedi-spinner--inner']} cx="44" cy="44" r="20" fill="none"></circle>
      </svg>
    </span>
  );
};

export default Spinner;
