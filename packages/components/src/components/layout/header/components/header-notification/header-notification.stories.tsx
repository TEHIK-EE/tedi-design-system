import { Meta, StoryObj } from '@storybook/react';

import Text from '../../../../typography/text/text';
import HeaderNotification from './header-notification';

const meta: Meta<typeof HeaderNotification> = {
  component: HeaderNotification,
};

export default meta;
type Story = StoryObj<typeof HeaderNotification>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Text element="span" modifiers="bold">
          Tähelepanu!
        </Text>{' '}
        Praegu on probleeme &quot;tervis&quot; menüüpunktiga. Oleme teadlikud ja juba töötame probleemi lahendamisega.
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
