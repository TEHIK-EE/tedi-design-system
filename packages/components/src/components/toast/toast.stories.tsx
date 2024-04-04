import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ToastContainer } from 'react-toastify';

import Button from '../button/button';
import { Col, Row } from '../grid';
import Notification, { NotificationProps } from '../notification/notification';
import { sendNotification } from './toast';

const meta: Meta<typeof Notification> = {
  title: 'components/toast',

  component: Notification,
  parameters: {
    docs: {
      description: {
        component: `Toast exports <code>sendNotification</code> function that takes notification props as input and when called shows Toast
          on bottom-left of the page. Second parameter of sendNotification function is react-toastify options to overwrite default behavior if needed.
          <code>ToastContainer</code> component is also exported and has to be added to index of
          application.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

const Template: StoryFn<NotificationProps> = (args) => (
  <>
    <ToastContainer />
    <Row>
      <Col width="auto">
        <Button
          color="positive"
          onClick={() =>
            sendNotification(
              { type: 'success', title: 'Notice', children: 'Something was successful!', ...args },
              { autoClose: 1000000 }
            )
          }
        >
          Success
        </Button>
      </Col>
      <Col width="auto">
        <Button
          color="important"
          onClick={() => sendNotification({ type: 'warning', title: 'Notice', children: 'Warning!', ...args })}
        >
          Warning
        </Button>
      </Col>
      <Col width="auto">
        <Button
          color="important"
          onClick={() =>
            sendNotification({ type: 'error', title: 'Notice', children: 'Something went wrong!', ...args })
          }
        >
          Error
        </Button>
      </Col>
      <Col width="auto">
        <Button
          onClick={() =>
            sendNotification({
              type: 'info',
              title: 'Notice',
              children: 'Some info text that can usually be very long!',
              ...args,
            })
          }
        >
          Info
        </Button>
      </Col>
    </Row>
  </>
);

export const Default: Story = {
  render: Template,
  args: {},
};
