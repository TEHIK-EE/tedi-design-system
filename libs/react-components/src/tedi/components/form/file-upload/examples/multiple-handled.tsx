/* istanbul ignore file */
import { StoryFn } from '@storybook/react';
import React from 'react';

import FileUpload, { FileUploadFile } from '../file-upload';

export const MultipleHandledTemplate: StoryFn<typeof FileUpload> = (args) => {
  const [files, setFiles] = React.useState<FileUploadFile[]>([{ name: 'avaldus.pdf' }]);

  return <FileUpload files={files} onChange={setFiles} {...args} />;
};
