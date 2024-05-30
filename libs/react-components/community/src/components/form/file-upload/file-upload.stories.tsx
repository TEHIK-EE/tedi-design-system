import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

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

const AcceptTemplate: StoryFn<ComponentProps<typeof FileUpload>> = (args) => {
  const [helperText, setHelperText] = useState<string | undefined>();
  const handleInvalidFiles = (files: File[]) => {
    setHelperText(`File(s) ${files.map((file) => `'${file.name}'`).join(', ')} have the wrong extension`);
  };
  return (
    <FileUpload
      {...args}
      onInvalidExtension={handleInvalidFiles}
      onChange={() => setHelperText(undefined)}
      helper={helperText ? { text: helperText, type: 'error' } : undefined}
    />
  );
};

export const PdfAndTxtOnly: Story = {
  args: {
    id: 'file-upload-accepts',
    name: 'file-accepts',
    label: 'Upload file',
    accept: '.pdf,.txt',
  },
  render: AcceptTemplate,
};

const MaxSizeTemplate: StoryFn<ComponentProps<typeof FileUpload>> = (args) => {
  const [helperText, setHelperText] = useState<string | undefined>();
  const handleInvalidFiles = (files: File[]) => {
    setHelperText(`File(s) ${files.map((file) => `'${file.name}'`).join(', ')} are too big`);
  };
  return (
    <FileUpload
      {...args}
      onInvalidSize={handleInvalidFiles}
      onChange={() => setHelperText(undefined)}
      helper={helperText ? { text: helperText, type: 'error' } : undefined}
    />
  );
};

export const SizeLimited: Story = {
  args: {
    id: 'file-upload-size-limited',
    name: 'file-size-limited',
    label: 'Upload file',
    maxSize: 0.001,
    multiple: true,
  },
  render: MaxSizeTemplate,
};
