import { ArgsTable, Primary, PRIMARY_STORY, Stories, Title } from '@storybook/addon-docs';
import { Meta, StoryObj } from '@storybook/react';

import Anchor from '../anchor/anchor';
import Heading from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import Notification from './notification';

const meta: Meta<typeof Notification> = {
  component: Notification,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <VerticalSpacing size={0.5}>
            <Heading element="h2" modifiers="h3">
              Overview
            </Heading>
            <p>
              Notifications are messages that communicate information to the user. The two main types of notifications
              are toast notifications and inline notifications. Also modal type notifications are available.
            </p>
            <Heading element="h2" modifiers="h3">
              When to use
            </Heading>
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
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    title: 'Teade',
    children: (
      <p>
        Suunatud e-postile kasutaja kairi.sarapuu@gmail.com. Soovi korral muuda suunamine kohe siin või vasak menüüst “
        <Anchor href="#">Minu andmed”</Anchor> - “Suunamine.
      </p>
    ),
  },
};

export const Closable: Story = {
  args: {
    ...Default.args,
    onClose: () => null,
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    icon: 'check_circle',
  },
};
