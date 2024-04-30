import { Meta, StoryObj } from '@storybook/react';

import { MultipleHandledTemplate } from './examples/multiple-handled';
import FileUpload from './file-upload';

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  title: 'Community-components/Form/FileUpload',
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
      text: 'JPG, PNG, PDF with size 1MB.',
    },
  },
};

export const LoadingState: Story = {
  args: {
    id: 'file-upload-loading',
    name: 'file-loading',
    label: 'Upload file',
    defaultFiles: [{ name: 'report.pdf', isLoading: true }],
  },
};

export const MultipleHandled: Story = {
  render: MultipleHandledTemplate,
  args: {
    id: 'file-upload-handled',
    name: 'file-loading-handled',
    label: 'Upload file',
    multiple: true,
    onDelete: (file) => {
      console.log(`Deleted - ${file.name}`);
    },
  },
};

export const ReadOnlyFiles: Story = {
  args: {
    id: 'file-upload-read-only',
    name: 'file-loading',
    label: 'Upload file',
    files: [{ name: 'report.pdf' }],
    onChange: (files) => {
      console.log(files);
    },
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'file-upload-disabled',
    name: 'file-loading',
    label: 'Upload file',
    defaultFiles: [{ name: 'report.pdf' }],
    disabled: true,
  },
};

export const PdfAndTxtOnly: Story = {
  args: {
    id: 'file-upload-accepts',
    name: 'file-accepts',
    label: 'Upload file',
    accept: '.pdf,.txt',
  },
};
