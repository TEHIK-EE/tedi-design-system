import React from 'react';

import { useLabels } from '../../../providers/label-provider';
import Button, { ButtonProps } from '../../button/button';
import { Card, CardContent } from '../../card';
import CloseButton from '../../close-button/close-button';
import Ellipsis from '../../ellipsis/ellipsis';
import { Col, Row } from '../../grid';
import FormHelper, { FormHelperProps } from '../form-helper/form-helper';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import styles from './file-upload.module.scss';

export interface FileUploadFile extends Partial<File> {
  id?: string;
}

export interface FileUploadProps extends FormLabelProps {
  /**
   * Additional classes.
   */
  className?: string;
  /*
   * Field name
   */
  name: string;
  /**
   * Button props
   */
  button?: ButtonProps;
  /**
   * FileUpload helper
   */
  helper?: FormHelperProps;
  /**
   * The accept attribute value is a string that defines the file types the file input should accept
   */
  accept?: string;
  /**
   * When the multiple Boolean attribute is true, the file input allows the user to select more than one file.
   */
  multiple?: boolean;
  /**
   * onChange handler
   */
  onChange?: (files: FileUploadFile[]) => void;
  /**
   * defaultValue
   */
  defaultFiles?: FileUploadFile[];
}

export const FileUpload = (props: FileUploadProps): JSX.Element => {
  const { id, name, button, helper, accept, multiple, onChange, className, defaultFiles, ...rest } = props;
  const { getLabel } = useLabels();
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

  const [hovered, setHovered] = React.useState(false);
  const [files, setFiles] = React.useState<FileUploadFile[]>(defaultFiles || []);

  React.useEffect(() => {
    onChange?.(files);
  }, [files, onChange]);

  const validFileType = (file: File) => {
    if (!accept) {
      return true;
    }

    const fileTypes = accept?.replace(/,/g, '').split('.') || [];
    // Todo: Handle error handling

    const fileType = file.name.split('.').pop()?.toLowerCase();
    return !!fileType && fileTypes.includes(fileType);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const newFiles = [...Array.from(e.target.files)];

      setFiles([...files, ...newFiles.filter((file) => validFileType(file))]);
    }
  };

  const onFileRemove = (file: FileUploadFile): void => {
    setFiles([...files].filter((f) => f !== file));
  };

  return (
    <Row gutter={2} className={className}>
      <Col>
        <label
          htmlFor={id}
          className={styles['file-upload']}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <FormLabel id={id} {...rest} renderWithoutLabel={true} />
          <input id={id} type="file" name={name} accept={accept} onChange={onFileChange} multiple={multiple} />
          <Button
            visualType="secondary"
            iconLeft="file_upload"
            aria-describedby={helperId}
            {...button}
            isActive={hovered}
          >
            {getLabel('file-upload.add')}
          </Button>
        </label>
      </Col>
      {helper && (
        <Col width={12}>
          <FormHelper {...helper} id={helperId} />
        </Col>
      )}
      {files &&
        Array.from(files).map((file, index) => (
          <Col width={12} key={index}>
            <Card>
              <CardContent padding="xsmall" background="bg-subtle">
                <Row justifyContent="between" alignItems="center" wrap="nowrap">
                  <Col width={11}>
                    <Ellipsis lineClamp={1}>{file.name}</Ellipsis>
                  </Col>
                  <Col width="auto">
                    <CloseButton onClick={() => onFileRemove(file)} size="small">
                      {getLabel('remove')}
                    </CloseButton>
                  </Col>
                </Row>
              </CardContent>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default FileUpload;
