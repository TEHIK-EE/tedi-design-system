import cn from 'classnames';
import { HTMLAttributes, MouseEventHandler } from 'react';

import { Icon } from '../../icon/icon';
import { Spinner } from '../../spinner/spinner';
import styles from './tag.module.scss';

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content inside the Tag.
   * Typically this will be text or any JSX elements to be displayed.
   */
  children: React.ReactNode;
  /**
   * Additional classes to apply custom styles to the Tag.
   */
  className?: string;
  /**
   * Function to be called when the close button is clicked.
   * If provided, a close button will be rendered inside the Tag.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Determines whether the Tag is in a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Determines whether the Tag is in an error state.
   * When true, the Tag will be styled accordingly and an error icon will be displayed.
   * @default false
   */
  hasError?: boolean;
}

export const Tag = (props: TagProps): JSX.Element => {
  const { children, className, onClose, isLoading = false, hasError = false, ...rest } = props;

  const tagBEM = cn(styles['tedi-tag'], hasError && styles['tedi-tag--has-error'], className);

  return (
    <div
      className={tagBEM}
      {...rest}
      role="status"
      aria-live={isLoading || hasError ? (hasError ? 'assertive' : 'polite') : undefined}
    >
      {hasError && <Icon name="info" color="danger" size={16} />}
      {children}
      {isLoading && <Spinner className={styles['tedi-tag__loader']} label="Loading" />}
      {!isLoading && !hasError && onClose && (
        <button className={styles['tedi-tag__close']} aria-label="Close" onClick={onClose}>
          <Icon name="close" size={16} color="primary" />
        </button>
      )}
    </div>
  );
};
