import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ToastContainer } from 'react-toastify';

import Alert, { AlertProps } from '../../../tedi/components/alert/alert';
import { Col, Row } from '../../../tedi/components/grid';
import Button from '../button/button';
import { sendNotification } from './toast';

/**
 * Toast exports `sendNotification` function that takes notification props as input and when called shows Toast on bottom-left of the page.<br/>
 * Second parameter of sendNotification function is react-toastify options to overwrite default behavior if needed.<br/>
 * `ToastContainer` component is also exported and has to be added to index of application.
 */
const meta: Meta<typeof Alert> = {
  title: 'Community/Toast',
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

const Template: StoryFn<AlertProps> = (args) => (
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
            sendNotification({ type: 'danger', title: 'Notice', children: 'Something went wrong!', ...args })
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
