import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { Icon } from '../../base/icon/icon';
import ClosingButton from '../../buttons/closing-button/closing-button';
import { Spinner } from '../../loaders/spinner/spinner';
import styles from './tag.module.scss';

type TagColor = 'primary' | 'secondary' | 'danger';

type TagBreakpointProps = {
  /**
   * Determines Tag color
   * When true, the Tag will be styled accordingly and an error icon will be displayed.
   * @default 'primary'
   */
  color?: TagColor;
  /**
   * Additional classes to apply custom styles to the Tag.
   */
  className?: string;
};

export interface TagProps extends BreakpointSupport<TagBreakpointProps> {
  /**
   * The content inside the Tag.
   * Typically this will be text or any JSX elements to be displayed.
   */
  children: React.ReactNode;
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
}

export const Tag = (props: TagProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    children,
    className,
    onClose,
    isLoading = false,
    color = 'primary',
    ...rest
  } = getCurrentBreakpointProps<TagProps>(props);

  const tagBEM = cn(
    styles['tedi-tag'],
    color && styles[`tedi-tag--color-${color}`],
    onClose && !isLoading && styles['tedi-tag__close'],
    className
  );

  return (
    <div className={tagBEM} role="status" aria-live={isLoading ? 'polite' : undefined} {...rest}>
      {color === 'danger' && (
        <div className={styles['tedi-tag__icon-wrapper']}>
          <Icon name="info" color="danger" size={16} className={styles['tedi-tag__icon--error']} />
        </div>
      )}
      <div className={styles['tedi-tag__content']}>{children}</div>
      {isLoading && !onClose && (
        <div className={styles['tedi-tag__icon-wrapper']}>
          <Spinner className={styles['tedi-tag__loader']} />
        </div>
      )}
      {!isLoading && onClose && <ClosingButton onClick={onClose} />}
    </div>
  );
};
