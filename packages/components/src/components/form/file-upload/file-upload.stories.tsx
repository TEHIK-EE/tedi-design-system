import { Meta, StoryObj } from '@storybook/react';

import FileUpload from './file-upload';

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    id: 'file-upload',
    name: 'file',
    label: 'Upload file',
  },
};

export const Multiple: Story = {
  args: {
    id: 'file-upload-MULTIPLE',
    name: 'file-multiple',
    label: 'Upload file',
    multiple: true,
    helper: {
      text: 'JPG, PNG, PDF suuruses 000MB.',
    },
    onChange: (files) => {
      console.log(files);
    },
  },
};
