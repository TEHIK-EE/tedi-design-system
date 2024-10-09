import cn from 'classnames';

import { BreakpointSupport, useBreakpointProps } from '../../helpers';
import { useLabels } from '../../providers/label-provider';
import styles from './spinner.module.scss';

export type SpinnerSize = 10 | 16 | 48;
export type SpinnerColor = 'primary' | 'secondary';
export type SpinnerPosition = 'absolute';

type SpinnerBreakpointProps = {
  /**
   * Defines the size of the spinner.
   * Accepted values: 10 (small), 16 (default), 48 (large).
   *
   * @default 16
   */
  size?: SpinnerSize;
  /**
   * Specifies the color theme of the spinner.
   * The color should meet accessibility standards for color contrast.
   *
   * @default 'primary'
   */
  color?: SpinnerColor;
  /**
   * Sets the spinner's positioning behavior.
   * This is useful when you want to position the spinner over other elements.
   */
  position?: SpinnerPosition;
};

export interface SpinnerProps extends BreakpointSupport<SpinnerBreakpointProps> {
  /**
   * Adds a custom CSS class to the spinner element for additional styling or theming purposes.
   */
  className?: string;
  /**
   * Provides a text label for screen readers to announce the spinner's purpose or status.
   */
  label?: string;
}

export const Spinner = (props: SpinnerProps): JSX.Element => {
  const { getLabel } = useLabels();
  const { getCurrentBreakpointProps } = useBreakpointProps();

  const {
    className,
    size = 16,
    color = 'primary',
    label = getLabel('spinner.loading'),
    position,
  } = getCurrentBreakpointProps<SpinnerProps>(props);

  const spinnerBEM = cn(
    styles['tedi-spinner'],
    className,
    position && styles[`tedi-spinner--${position}`],
    size && styles[`tedi-spinner--size-${size}`],
    color && styles[`tedi-spinner--color-${color}`]
  );

  return (
    <span className={spinnerBEM} role="status" aria-live="polite" aria-label={label} aria-hidden={!label}>
      <svg viewBox="22 22 44 44" aria-hidden="true">
        <circle className={styles['tedi-spinner--inner']} cx="44" cy="44" r="20" fill="none"></circle>
      </svg>
    </span>
  );
};
