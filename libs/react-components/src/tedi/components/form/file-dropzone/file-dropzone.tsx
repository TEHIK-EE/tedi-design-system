import cn from 'classnames';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import { FileUploadFile, useFileUpload, UseFileUploadProps } from '../../../helpers/hooks/use-file-upload';
import ClosingButton from '../../buttons/closing-button/closing-button';
import { Card, CardContent } from '../../cards/card';
import { Col, Row } from '../../grid';
import { Icon } from '../../icon/icon';
import { VerticalSpacing } from '../../vertical-spacing';
import FeedbackText, { FeedbackTextProps } from '../feedback-text/feedback-text';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import styles from './file-dropzone.module.scss';

export interface FileDropzoneProps extends Omit<FormLabelProps, 'size' | 'hideLabel'>, UseFileUploadProps {
  /*
   * Additional CSS class names to apply to the dropzone for custom styling
   */
  className?: string;
  /*
   * The name attribute for the file input, used for form submission and identifying the field.
   */
  name: string;
  /*
   * The text label displayed for the file dropzone, providing context for users.
   */
  label: string;
  /*
   * Provides helper text or feedback (such as an error or instruction message) to guide the user.
   */
  helper?: FeedbackTextProps;
  /*
   * Disables the file dropzone, preventing user interaction.
   */
  disabled?: boolean;
}

export const FileDropzone = (props: FileDropzoneProps): JSX.Element => {
  const { label = 'Drop files here, or click to browse', className, disabled = false, helper, id } = props;
  const { innerFiles, uploadErrorHelper, onFileChange, onFileRemove } = useFileUpload(props);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: props.accept ? { 'application/*': [props.accept] } : undefined,
    multiple: props.multiple,
    maxSize: props.maxSize ? props.maxSize * 1024 ** 2 : undefined,
    onDrop: (acceptedFiles) => {
      const event = {
        target: { files: acceptedFiles },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onFileChange(event);
    },
  });

  const fileDropzoneBEM = cn(
    styles['tedi-file-dropzone'],
    { [styles['tedi-file-dropzone--disabled']]: disabled },
    { [styles['tedi-file-dropzone--invalid']]: (uploadErrorHelper?.type || helper?.type) === 'error' },
    { [styles['tedi-file-dropzone--valid']]: (uploadErrorHelper?.type || helper?.type) === 'valid' },
    { [styles['tedi-file-dropzone--drop-over']]: isDragActive },
    className
  );
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

  return (
    <>
      <div className={fileDropzoneBEM}>
        <div {...getRootProps()} className="tedi-file-dropzone__inner">
          <input {...getInputProps()} />
          <div className={styles['tedi-file-dropzone__label']}>
            <Icon color={disabled ? 'tertiary' : 'secondary'} size={24} name="attach_file" />
            <FormLabel id={id} label={label} className={styles['tedi-file-dropzone__label']} />
          </div>
        </div>
      </div>
      {(uploadErrorHelper || helper) && (
        <FeedbackText {...((uploadErrorHelper || helper) as FeedbackTextProps)} id={helperId} />
      )}
      <VerticalSpacing size={0.5} className={styles['tedi-file-dropzone__file-list']}>
        {innerFiles.map((file: FileUploadFile) => (
          <Card
            background={file.isValid === false ? 'danger-primary' : 'tertiary'}
            borderless
            className={styles['tedi-file-dropzone__file-item']}
            key={file.id || file.name}
          >
            <CardContent
              padding={{
                bottom: 0.5,
                left: 0.5,
                right: 0.5,
                top: 0.5,
              }}
            >
              <Row>
                <Col>{file.name}</Col>
                <Col width="auto">
                  <ClosingButton onClick={() => onFileRemove(file)} />
                </Col>
              </Row>
            </CardContent>
          </Card>
        ))}
      </VerticalSpacing>
    </>
  );
};

export default FileDropzone;
