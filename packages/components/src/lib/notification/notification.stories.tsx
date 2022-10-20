import { ArgsTable, Primary, PRIMARY_STORY, Stories, Title } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';

import Anchor from '../anchor/anchor';
import { VerticalSpacing } from '../vertical-spacing';
import Notification, { NotificationProps } from './notification';

export default {
  title: 'components/Notification',
  component: Notification,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <VerticalSpacing size={0.5}>
            <h2 className="h3">Overview</h2>
            <p>
              Notifications are messages that communicate information to the user. The two main types of notifications
              are toast notifications and inline notifications.
            </p>
            <h2 className="h3">When to use</h2>
            <p>
              Use notifications to inform users of updates or changes to system status. Communicating with users and
              providing immediate feedback are important for building trust. While notifications are an effective method
              of communicating with users, they are disruptive and should be used sparingly.
            </p>
          </VerticalSpacing>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<NotificationProps> = (args) => <Notification {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Teade',
  children: (
    <p>
      Suunatud e-postile kasutaja kairi.sarapuu@gmail.com. Soovi korral muuda suunamine kohe siin või vasak menüüst “
      <Anchor url="#">Minu andmed”</Anchor> - “Suunamine.
    </p>
  ),
};

export const Closable = Template.bind({});
Closable.args = {
  ...Default.args,
  onClose: () => null,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  icon: 'check_circle',
};
