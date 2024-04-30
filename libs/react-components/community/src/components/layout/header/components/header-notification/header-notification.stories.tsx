import { Meta, StoryObj } from '@storybook/react';

import Text from '../../../../typography/text/text';
import HeaderNotification from './header-notification';

/**
 * HeaderNotification can be used to display important system-wide messages to user.
 */
const meta: Meta<typeof HeaderNotification> = {
  component: HeaderNotification,
  title: 'Community-components/Layout/Header/HeaderNotification',
};

export default meta;
type Story = StoryObj<typeof HeaderNotification>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Text element="span" modifiers="bold">
          Attention!
        </Text>{' '}
        There are issues with &quot;health&quot; menu links. We are aware and are already working the problem.
      </>
    ),
  },
};

export const CustomIcon: Story = {
  args: {
    ...Default.args,
    icon: 'key',
  },
};

export const CustomColor: Story = {
  args: {
    ...Default.args,
    background: 'warning-highlight',
  },
};
