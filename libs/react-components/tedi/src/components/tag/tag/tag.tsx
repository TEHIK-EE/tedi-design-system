import cn from 'classnames';
import { HTMLAttributes, MouseEventHandler } from 'react';

import { Icon } from '../../icon/icon';
import { Spinner } from '../../spinner/spinner';
import styles from './tag.module.scss';

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content inside the tag.
   * Typically this will be text or any JSX elements to be displayed.
   */
  children: React.ReactNode;
  /**
   * Additional class
   */
  className?: string;
  /**
   * Function to be called when the close button is clicked.
   * If provided, a close button will be rendered inside the tag.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Determines whether the tag is in a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * The accessible label for the loading spinner.
   * Useful for screen readers to describe the loading state.
   */
  loadingLabel?: string;
}

export const Tag = (props: TagProps) => {
  const { children, className, onClose, isLoading = false, loadingLabel, ...rest } = props;

  const tagBEM = cn(styles['tedi-tag'], className);

  return (
    <div className={tagBEM} {...rest} role="status" aria-live={isLoading ? 'polite' : undefined}>
      {children}
      {isLoading && loadingLabel && <Spinner className="tedi-tag__loader" label={loadingLabel} size={10} />}
      {onClose && !isLoading && (
        <button className={styles['tedi-tag__close']} aria-label="Close" onClick={onClose}>
          <Icon name="close" size={16} color="primary" />
        </button>
      )}
    </div>
  );
};
