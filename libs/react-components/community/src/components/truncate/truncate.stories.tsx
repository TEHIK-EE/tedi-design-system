import { Meta, StoryObj } from '@storybook/react';

import Truncate from './truncate';

const meta: Meta<typeof Truncate> = {
  component: Truncate,
  title: 'Community-components/Truncate',
};

export default meta;
type Story = StoryObj<typeof Truncate>;

export const Default: Story = {
  args: {
    onClose: () => console.log('Closed'),
    onOpen: () => console.log('Opened'),
    children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
};

export const ShortText: Story = {
  args: {
    ...Default.args,
    children: 'Short Text',
  },
};
