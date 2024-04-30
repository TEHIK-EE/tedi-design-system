import { Meta, StoryObj } from '@storybook/react';

import TextArea from './textarea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'Community-components/Form/TextArea',
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
  },
};
