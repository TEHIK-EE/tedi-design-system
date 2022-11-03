import { useLabels } from '../../providers/label-provider';
import Button, { ButtonProps } from '../button/button';
import styles from './close-button.module.scss';

export interface CloseButtonProps extends Omit<ButtonProps, 'text'> {
  /**
   * text label for screen readers.
   */
  text?: string;
}

export const CloseButton = (props: CloseButtonProps): JSX.Element => {
  const { getLabel } = useLabels();
  const { onClick, text } = props;

  return (
    <Button
      className={styles['close-button']}
      onClick={onClick}
      text={text || getLabel('close')}
      icon="close"
      type="link"
      color="text-color"
    />
  );
};

export default CloseButton;
