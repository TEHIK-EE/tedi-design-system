import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { useLabels } from '../../providers/label-provider';
import { Icon } from '../icon/icon';
import styles from './closing-button.module.scss';

type ClosingButtonSize = 'small' | 'medium' | 'large';

export interface ClosingButtonProps {
  /**
   * Additional classes to apply custom styles to the ClosingButton.
   */
  className?: string;
  /**
   * Size of the ClosingButton
   * @default 'medium'
   */
  size: ClosingButtonSize;
  /**
   * Event handler for the button click event. Triggered when the user clicks on the close button.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /*
   * Title for the button.
   * Used for accessibility and as a tooltip on hover. If not provided, the label provider's 'close' label will be used as a fallback.
   */
  title?: string;
}

export const ClosingButton = (props: ClosingButtonProps): JSX.Element => {
  const { getLabel } = useLabels();
  const { title = getLabel('close'), onClick, size = 'medium', className, ...rest } = props;

  const buttonClass = cn(
    styles['tedi-closing-button'],
    {
      [styles['tedi-closing-button--small']]: size === 'small',
      [styles['tedi-closing-button--large']]: size === 'large',
    },
    className
  );

  const iconSize = size === 'large' ? 24 : size === 'small' ? 16 : 18;

  return (
    <button
      data-name="closing-button"
      {...rest}
      className={buttonClass}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      <Icon name="close" size={iconSize} />
    </button>
  );
};

export default ClosingButton;
