import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../helpers';
import ClosingButton from '../closing-button/closing-button';
import { Icon } from '../icon/icon';
import { Spinner } from '../spinner/spinner';
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
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const {
    children,
    className,
    onClose,
    isLoading = false,
    color = 'primary',
    ...rest
  } = getCurrentBreakpointProps<TagProps>(props);

  const tagBEM = cn(styles['tedi-tag'], color && styles[`tedi-tag--color-${color}`], className);

  return (
    <div className={tagBEM} role="status" aria-live={isLoading ? 'polite' : undefined} {...rest}>
      {color === 'danger' && <Icon name="info" color="danger" size={16} />}
      {children}
      {isLoading && <Spinner className={styles['tedi-tag__loader']} />}
      {!isLoading && onClose && <ClosingButton onClick={onClose} size="small" />}
    </div>
  );
};
