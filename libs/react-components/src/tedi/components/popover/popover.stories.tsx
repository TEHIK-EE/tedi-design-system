import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import Popover from './popover';

const meta: Meta<ComponentProps<typeof Popover>> = {
  component: Popover,
  subcomponents: {
    'Popover.Trigger': Popover.Trigger,
    'Popover.Content': Popover.Content,
  } as never,
  title: 'TEDI-Ready/Components/Helpers/Popover',
};

export default meta;
type Story = StoryObj<ComponentProps<typeof Popover>>;

const Template: StoryFn<ComponentProps<typeof Popover>> = (args) => {
  return (
    <Popover {...args}>
      <Popover.Trigger>Popover trigger can be text</Popover.Trigger>
      <Popover.Content title="Heading" showClose>
        The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
      </Popover.Content>
    </Popover>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};
