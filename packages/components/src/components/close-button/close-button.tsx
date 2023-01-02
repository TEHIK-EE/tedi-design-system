import { useLabels } from '../../providers/label-provider';
import Button, { ButtonProps } from '../button/button';
import styles from './close-button.module.scss';

export type CloseButtonProps = Partial<ButtonProps>;

export const CloseButton = (props: CloseButtonProps): JSX.Element => {
  const { getLabel } = useLabels();
  const { children, ...rest } = props;

  return (
    <Button
      data-name="close-button"
      {...rest}
      className={styles['close-button']}
      icon="close"
      visualType="link"
      color="text-color"
    >
      {children || getLabel('close')}
    </Button>
  );
};

export default CloseButton;
