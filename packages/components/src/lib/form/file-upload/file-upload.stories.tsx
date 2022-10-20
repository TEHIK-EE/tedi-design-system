import { Meta, Story } from '@storybook/react';
import React from 'react';

import FileUpload, { FileUploadProps } from './file-upload';

export default {
  title: 'components/Form/FileUpload',
  component: FileUpload,
} as Meta;

const Template: Story<FileUploadProps> = (args) => <FileUpload {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'file-upload',
  name: 'file',
  label: 'Upload file',
};

export const Multiple = Template.bind({});
Multiple.args = {
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
};
