import { ArgsTable, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import { CardContent, CardHeader } from '../card';
import { Col, Row } from '../grid';
import { VerticalSpacing } from '../vertical-spacing';
import Modal, { ModalProps } from './modal';
import ModalCloser from './modal-closer';
import ModalProvider, { ModalProviderProps } from './modal-provider';
import ModalTrigger from './modal-trigger';

export default {
  title: 'components/Modal',
  component: ModalProvider,
  subcomponents: { ModalTrigger, Modal, ModalCloser },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>
            <p>
              Modal consist of 4 components: <b>ModalProvider</b>, <b>Modal</b>, <b>ModalTrigger</b> and{' '}
              <b>ModalCloser</b>
            </p>
          </Subtitle>
          <VerticalSpacing size={0.25} className="text-secondary">
            <p>ModalProvider - Provider context for other components. Handles modal open state.</p>
            <p>Modal - Visual UI component. Should always contain CardContent or CardHeader as children.</p>
            <p>ModalTrigger - Wrapper component around buttons/links to trigger modalOpen after click.</p>
            <p>ModalClose - Wrapper component around buttons/links to trigger modalClose after click.</p>
          </VerticalSpacing>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

interface TemplateProps extends ModalProps {
  heading?: string;
  content?: string;
  modalProvider?: Partial<ModalProviderProps>;
  renderHeader?: boolean;
  renderModalCloser?: boolean;
}

const Template: Story<TemplateProps> = (args: TemplateProps): JSX.Element => {
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
        <Button>Ava Modal</Button>
      </ModalTrigger>
      <Modal {...modal} aria-labelledby="label">
        {renderHeader && (
          <CardHeader variant="white">
            <h1 id="default-label">{heading}</h1>
          </CardHeader>
        )}
        <CardContent>
          {!renderHeader && <h1 id="default-label">{heading}</h1>}
          <p>{content}</p>
          {renderModalCloser && (
            <ModalCloser>
              <Button onClick={() => console.log('Im called')}>Sulge</Button>
            </ModalCloser>
          )}
        </CardContent>
      </Modal>
    </ModalProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  heading: 'Modal width 6',
};

export const Width12 = Template.bind({});
Width12.args = {
  size: 12,
  heading: 'Modal width 12',
};

export const Width10 = Template.bind({});
Width10.args = {
  size: 10,
  heading: 'Modal width 10',
};

export const Width8 = Template.bind({});
Width8.args = {
  size: 8,
  heading: 'Modal width 8',
};

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  heading: 'Opened by default',
  modalProvider: {
    defaultOpen: true,
  },
};

export const ErrorTopModal = Template.bind({});
ErrorTopModal.args = {
  heading: 'Error type modal',
  content: 'Use to display error notifications',
  cardProps: { type: 'error-top' },
  renderHeader: false,
  renderModalCloser: false,
};

export const SuccessTopModal = Template.bind({});
SuccessTopModal.args = {
  heading: 'Success type modal',
  content: 'Use to display success notifications',
  cardProps: { type: 'success-top' },
  renderHeader: false,
  renderModalCloser: false,
};

export const WarningTopModal = Template.bind({});
WarningTopModal.args = {
  heading: 'Warning type modal',
  content: 'Use to display Warning notifications',
  cardProps: { type: 'warning-top' },
  renderHeader: false,
  renderModalCloser: false,
};

export const Position: Story<ModalProps> = () => {
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
        <CardHeader variant="white">
          <h1>Modal with longer content to test out scrolling</h1>
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

export const ControlledOutSide = () => {
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
              <p id="controlled-outside">Mind saab kontrollida väljaspoolt komponenti!</p>
            </CardContent>
            <Button onClick={() => setIsOpen(false)}>close modal without ModalCloser</Button>
          </Modal>
        </ModalProvider>
      </Col>
      <Col width="auto">
        <Button onClick={() => setIsOpen(true)}>Open modal from outside modal</Button>
      </Col>
    </Row>
  );
};

export const TrapFocusFalse = Template.bind({});
TrapFocusFalse.args = {
  heading: 'Modal does not trap focus',
  content:
    'This modal does not trap focus. Pressing tab will move focus outside of the modal resulting in the modal closing.',
  trapFocus: false,
};

export const NotDismissableModal = Template.bind({});
NotDismissableModal.args = {
  heading: 'Modal is not dismissable',
  content:
    'This modal can not be dismissed by pressing escape or clicking outside of it. You can close it by pressing either close button.',
  modalProvider: {
    isDismissable: false,
  },
};

export const ScrollNotLocked = Template.bind({});
ScrollNotLocked.args = {
  heading: 'Scrolling is not locked.',
  content: 'You can scroll the main page while this modal is open.',
  lockScroll: false,
};

export const NoOverlay = Template.bind({});
NoOverlay.args = {
  heading: 'No overlay',
  content: 'This modal does not display an overlay on top of the page.',
  overlay: 'none',
};

export const CookieConsentModal = Template.bind({});
CookieConsentModal.args = {
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
};
