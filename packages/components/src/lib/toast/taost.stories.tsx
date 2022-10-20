import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';
import React from 'react';
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
      page: () => (
        <>
          <Title />
          <Subtitle>Toast helper function to call taost notifications.</Subtitle>
          <Description>
            Toast exports `sendNotification` function that takes notification props as input and when called shows Toast
            on bottom-left of the page. `ToastContainer` component from react-toastify has to be added to index of
            application.
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<NotificationProps> = (args) => (
  <>
    <ToastContainer />
    <Row>
      <Col width="auto">
        <Button
          text="Success"
          color="success"
          onClick={() => sendNotification({ type: 'success', title: 'Teade', children: 'Miskit õnnestus!', ...args })}
        />
      </Col>
      <Col width="auto">
        <Button
          text="Warning"
          color="error"
          onClick={() => sendNotification({ type: 'warning', title: 'Teade', children: 'Hoiatus!', ...args })}
        />
      </Col>
      <Col width="auto">
        <Button
          text="Error"
          color="error"
          onClick={() => sendNotification({ type: 'error', title: 'Teade', children: 'Miskit läks valesti!', ...args })}
        />
      </Col>
      <Col width="auto">
        <Button
          text="Info"
          onClick={() =>
            sendNotification({
              type: 'info',
              title: 'Teade',
              children: 'Info kirjeldus pikk väga pikk kirjeldus!',
              ...args,
            })
          }
        />
      </Col>
    </Row>
  </>
);

export const Default = Template.bind({});
Default.args = {};
