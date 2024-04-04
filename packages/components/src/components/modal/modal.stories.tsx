import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import { CardContent, CardHeader } from '../card';
import { Col, Row } from '../grid';
import Heading from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import Modal, { ModalProps } from './modal';
import ModalCloser from './modal-closer';
import ModalProvider, { ModalProviderProps } from './modal-provider';
import ModalTrigger from './modal-trigger';
/**
 * Modal consist of 4 components: <b>ModalProvider</b>, <b>Modal</b>, <b>ModalTrigger</b> and <b>ModalCloser</b>.<br />
 * **ModalProvider** - Provider context for other components. Handles modal open state.<br />
 * **Modal** - Visual UI component. Should always contain CardContent or CardHeader as children.<br />
 * **ModalTrigger** - Wrapper component around buttons/links to trigger modalOpen after click.<br />
 * **ModalClose** - Wrapper component around buttons/links to trigger modalClose after click.
 */
const meta: Meta<typeof ModalProvider> = {
  component: ModalProvider,
  subcomponents: { Modal, ModalTrigger, ModalCloser } as never,
};

export default meta;

interface TemplateProps extends ModalProps {
  heading?: string;
  content?: string;
  modalProvider?: Partial<ModalProviderProps>;
  renderHeader?: boolean;
  renderModalCloser?: boolean;
}

type Story = StoryObj<TemplateProps>;

const Template: StoryFn<TemplateProps> = (args): JSX.Element => {
  const {
    heading = 'Heading',
    content = 'Default content',
    modalProvider,
    renderHeader = true,
    renderModalCloser = true,
    ...modal
  } = args;
  return (
    <ModalProvider {...modalProvider}>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal {...modal} aria-labelledby="label">
        {renderHeader && (
          <CardHeader background="white">
            <Heading id="default-label">{heading}</Heading>
          </CardHeader>
        )}
        <CardContent>
          {!renderHeader && <Heading id="default-label">{heading}</Heading>}
          <p>{content}</p>
          {renderModalCloser && (
            <ModalCloser>
              <Button onClick={() => console.log('Im called')}>Close</Button>
            </ModalCloser>
          )}
        </CardContent>
      </Modal>
    </ModalProvider>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    heading: 'Modal width 6',
  },
};

export const Width12: Story = {
  render: Template,

  args: {
    size: 12,
    heading: 'Modal width 12',
  },
};

export const Width10: Story = {
  render: Template,

  args: {
    size: 10,
    heading: 'Modal width 10',
  },
};

export const Width8: Story = {
  render: Template,

  args: {
    size: 8,
    heading: 'Modal width 8',
  },
};

export const OpenByDefault: Story = {
  render: Template,

  args: {
    heading: 'Opened by default',
    modalProvider: {
      defaultOpen: true,
    },
  },
};

export const ErrorTopModal: Story = {
  render: Template,

  args: {
    heading: 'Error type modal',
    content: 'Use to display error notifications',
    cardProps: { border: 'top-important-main' },
    renderHeader: false,
    renderModalCloser: false,
  },
};

export const SuccessTopModal: Story = {
  render: Template,

  args: {
    heading: 'Success type modal',
    content: 'Use to display success notifications',
    cardProps: { border: 'top-positive-main' },
    renderHeader: false,
    renderModalCloser: false,
  },
};

export const WarningTopModal: Story = {
  render: Template,

  args: {
    heading: 'Warning type modal',
    content: 'Use to display Warning notifications',
    cardProps: { border: 'top-warning-main' },
    renderHeader: false,
    renderModalCloser: false,
  },
};

export const Position: StoryFn<ModalProps> = () => {
  const ipsum = (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores culpa dolore ipsam mollitia numquam sapiente!
      At consequuntur cupiditate est excepturi facere facilis fugit maiores, nihil odio pariatur quam vel vero. Lorem
      ipsum dolor sit amet, consectetur adipisicing elit. Asperiores culpa dolore ipsam mollitia numquam sapiente! At
      consequuntur cupiditate est excepturi facere facilis fugit maiores, nihil odio pariatur quam vel vero.
    </p>
  );

  const content = (
    <VerticalSpacing>
      {ipsum}
      {ipsum}
      {ipsum}
      <ModalCloser>
        <Button>Close</Button>
      </ModalCloser>
    </VerticalSpacing>
  );

  const modal = (position?: ModalProps['position']) => (
    <ModalProvider>
      <ModalTrigger>
        <Button className="text-capitalize">{position}</Button>
      </ModalTrigger>
      <Modal aria-labelledby="open-center" position={position}>
        <CardHeader background="white">
          <Heading>Modal with longer content to test out scrolling</Heading>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Modal>
    </ModalProvider>
  );

  return (
    <Row>
      <Col width="auto">{modal('center')}</Col>
      <Col width="auto">{modal('right')}</Col>
      <Col width="auto">{modal('bottom')}</Col>
    </Row>
  );
};

export const ControlledOutside = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Row>
      <Col width="auto">
        <ModalProvider open={isOpen} onToggle={setIsOpen}>
          <ModalTrigger>
            <Button>Open modal from trigger</Button>
          </ModalTrigger>
          <Modal aria-labelledby="controlled-outside">
            <CardContent>
              <p id="controlled-outside">I can be controlled externally!</p>
            </CardContent>
            <Button onClick={() => setIsOpen(false)}>Close modal without ModalCloser</Button>
          </Modal>
        </ModalProvider>
      </Col>
      <Col width="auto">
        <Button onClick={() => setIsOpen(true)}>Open modal from outside modal</Button>
      </Col>
    </Row>
  );
};

export const TrapFocusFalse: Story = {
  render: Template,

  args: {
    heading: 'Modal does not trap focus',
    content:
      'This modal does not trap focus. Pressing tab will move focus outside of the modal resulting in the modal closing.',
    trapFocus: false,
  },
};

export const NotDismissibleModal: Story = {
  render: Template,

  args: {
    heading: 'Modal is not dismissible',
    content:
      'This modal can not be dismissed by pressing escape or clicking outside of it and does not have a built in close button. You can close it by pressing the custom close button.',
    modalProvider: {
      isDismissable: false,
    },
    trapFocus: false,
    overlay: 'none',
    hideCloseButton: true,
  },
};

export const ScrollNotLocked: Story = {
  render: Template,

  args: {
    heading: 'Scrolling is not locked.',
    content: 'You can scroll the main page while this modal is open.',
    lockScroll: false,
  },
};

export const NoOverlay: Story = {
  render: Template,

  args: {
    heading: 'No overlay',
    content: 'This modal does not display an overlay on top of the page.',
    overlay: 'none',
  },
};

export const CookieConsentModal: Story = {
  render: Template,

  args: {
    heading: 'Cookie modal example',
    content:
      'This modal does not block the user from interacting with the rest of the page. This modal will only close when the user explicitly closes it via the close button or any other dedicated button. This modal combines all of the following props: trapFocus: false, isDismissable: false, scrollLocked: false, overlay: "none"',
    trapFocus: false,
    lockScroll: false,
    overlay: 'none',
    modalProvider: {
      isDismissable: false,
    },
    position: 'bottom',
  },
};
