import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import ToggleOpen from './toggle-open';

/**
 * Toggle helper that toggles the button open-close with expand_more icon. Toggle is already used in Accordion component.
 */
const meta: Meta<typeof ToggleOpen> = {
  component: ToggleOpen,
  title: 'Community/ToggleOpen',
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
    openText: 'Open',
    closeText: 'Close',
    visualType: 'secondary',
  },
};

export const TypeLink: Story = {
  render: Template,
  args: {
    openText: 'Open',
    closeText: 'Close',
    visualType: 'link',
  },
};
