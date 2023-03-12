import { Meta, Story } from '@storybook/react';
import { ToastContainer } from 'react-toastify';

import Button from '../button/button';
import { Col, Row } from '../grid';
import Notification, { NotificationProps } from '../notification/notification';
import { sendNotification } from './toast';

export default {
  title: 'components/Toast',
  component: Notification,
  parameters: {
    docs: {
      description: {
        component: `Toast exports <code>sendNotification</code> function that takes notification props as input and when called shows Toast
          on bottom-left of the page. <code>ToastContainer</code> component is also exported and has to be added to index of
          application.`,
      },
    },
  },
} as Meta;

const Template: Story<NotificationProps> = (args) => (
  <>
    <ToastContainer />
    <Row>
      <Col width="auto">
        <Button
          color="success"
          onClick={() => sendNotification({ type: 'success', title: 'Teade', children: 'Miskit õnnestus!', ...args })}
        >
          Success
        </Button>
      </Col>
      <Col width="auto">
        <Button
          color="error"
          onClick={() => sendNotification({ type: 'warning', title: 'Teade', children: 'Hoiatus!', ...args })}
        >
          Warning
        </Button>
      </Col>
      <Col width="auto">
        <Button
          color="error"
          onClick={() => sendNotification({ type: 'error', title: 'Teade', children: 'Miskit läks valesti!', ...args })}
        >
          Error
        </Button>
      </Col>
      <Col width="auto">
        <Button
          onClick={() =>
            sendNotification({
              type: 'info',
              title: 'Teade',
              children: 'Info kirjeldus pikk väga pikk kirjeldus!',
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

export const Default = Template.bind({});
Default.args = {};
