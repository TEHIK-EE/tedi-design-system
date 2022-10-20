import { useField } from 'formik';
import React from 'react';

import FileUpload, { FileUploadFile, FileUploadProps } from './file-upload';

export const FileUploadFormik = (props: FileUploadProps): JSX.Element => {
  const [, meta, helpers] = useField<FileUploadFile[]>({ name: props.name });

  const handleChange = React.useCallback(
    (files: FileUploadFile[]): void => {
      props.onChange?.(files);
      helpers.setValue(files);
      helpers.setTouched(true);
    },
    [helpers, props]
  );

  return (
    <FileUpload
      {...props}
      onChange={handleChange}
      helper={meta.touched && meta.error ? { type: 'error', text: meta.error } : props.helper}
    />
  );
};

export default FileUploadFormik;
