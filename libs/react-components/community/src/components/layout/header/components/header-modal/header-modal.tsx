import { useLabels } from '../../../../../providers/label-provider';
import Button, { ButtonProps } from '../../../../button/button';
import { Card, CardContent } from '../../../../card';
import { Modal, ModalCloser, ModalProvider, ModalTrigger } from '../../../../modal';
import { Text } from '../../../../typography/text/text';

export interface HeaderModalProps {
  /**
   * Content of Modal
   */
  children: React.ReactNode;
  /**
   * Id of aria-Labelledby element
   */
  ariaLabelledby: string;
  /**
   * Trigger of Dropdown
   */
  triggerProps: ButtonProps;
  /**
   * Should Tooltip be initially shown. Won't work with open and onToggle.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Should the Tooltip be open or closed.
   * Use to handle state outside of component, should use with onToggle prop.
   */
  open?: boolean;
  /**
   * Callback when Tooltip is toggled.
   * Use to handle state outside of component, should use with open prop.
   */
  onToggle?: (open: boolean) => void;
}

export const HeaderModal = (props: HeaderModalProps) => {
  const { triggerProps, defaultOpen, open, onToggle, children, ariaLabelledby } = props;
  const { getLabel } = useLabels();

  return (
    <ModalProvider defaultOpen={defaultOpen} open={open} onToggle={onToggle}>
      <ModalTrigger>
        <Button {...triggerProps} />
      </ModalTrigger>
      <Modal aria-labelledby={ariaLabelledby} hideCloseButton={true} position="right">
        <CardContent padding={0}>
          <Card borderless background="primary-highlight-subtle" padding={0.5} borderRadius={false}>
            <CardContent>
              <Text element="div" modifiers="right">
                <ModalCloser>
                  <Button visualType="tertiary" icon={{ name: 'close', color: 'primary', size: 24 }}>
                    {getLabel('modal.close')}
                  </Button>
                </ModalCloser>
              </Text>
            </CardContent>
          </Card>
          <Card border="top-border-default" borderRadius={false} padding={0}>
            <CardContent>{children}</CardContent>
          </Card>
        </CardContent>
      </Modal>
    </ModalProvider>
  );
};

export default HeaderModal;
