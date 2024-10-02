import { Meta, StoryObj } from '@storybook/react';

import FormLabel from './form-label';

const meta: Meta<typeof FormLabel> = {
  component: FormLabel,
  title: 'TEDI-ready/Form/FormLabel',
};

export default meta;
type Story = StoryObj<typeof FormLabel>;

export const Default: Story = {
  args: {
    id: 'input-id-1',
    label: 'Label of input',
  },
};

export const Required: Story = {
  args: {
    id: 'input-id-2',
    label: 'Label of input',
    required: true,
  },
};
