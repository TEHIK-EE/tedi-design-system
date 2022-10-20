import Icon, { IconProps } from '../icon/icon';
import { useLabels } from '../label-provider';
import styles from './close-button.module.scss';

export interface CloseButtonProps {
  /**
   * On button click handler
   */
  onClick: () => void;
  /**
   * text label for screen readers.
   */
  label?: string;
  /**
   * icon props
   */
  icon?: Omit<IconProps, 'name'>;
}

export const CloseButton = (props: CloseButtonProps): JSX.Element => {
  const { getLabel } = useLabels();
  const { onClick, label, icon } = props;
  return (
    <button type="button" className={styles['close-button']} onClick={onClick}>
      <span className="visually-hidden">{label || getLabel('close')}</span>
      <Icon name="close" {...icon} />
    </button>
  );
};

export default CloseButton;
