import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import ToggleOpen from './toggle-open';

const meta: Meta<typeof ToggleOpen> = {
  component: ToggleOpen,
  parameters: {
    docs: {
      description: {
        component:
          'Toggle helper that toggles the button open-close with expand_more icon. Toggle is already used in Accordion component.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleOpen>;

const Template: StoryFn<typeof ToggleOpen> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return <ToggleOpen {...args} isOpen={open} onClick={() => setOpen(!open)} />;
};

export const Default: Story = {
  render: Template,
  args: {
    openText: 'Avan',
    closeText: 'Sulgen',
    classNameIcon: 'text-bold',
    visualType: 'secondary',
  },
};
