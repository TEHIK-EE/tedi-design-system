import cn from 'classnames';
import React from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { FileUploadFile, useFileUpload } from '../../../helpers/hooks/use-file-upload';
import { useLabels } from '../../../providers/label-provider';
import { Button } from '../../buttons/button/button';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import { FormLabel, FormLabelProps } from '../../form/form-label/form-label';
import { Col, Row } from '../../grid';
import { Separator } from '../../separator/separator';
import { Tag } from '../../tag/tag';
import { Text } from '../../typography/text/text';
import { FeedbackText, FeedbackTextProps } from '../feedback-text/feedback-text';
import styles from './file-upload.module.scss';

export interface FileUploadProps extends FormLabelProps {
  className?: string;
  name: string;
  helper?: FeedbackTextProps;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileUploadFile[]) => void;
  defaultFiles?: FileUploadFile[];
  onDelete?: (file: FileUploadFile) => void;
  hasClearButton?: boolean;
  files?: FileUploadFile[];
  readOnly?: boolean;
  disabled?: boolean;
  maxSize?: number;
  validateIndividually?: boolean;
  size?: 'small' | 'default';
}

export const FileUpload = (props: FileUploadProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    id,
    name,
    accept,
    multiple,
    onChange,
    className,
    defaultFiles,
    onDelete,
    hasClearButton = true,
    files,
    readOnly,
    disabled = false,
    maxSize,
    validateIndividually = false,
    size = 'default',
    helper,
    ...rest
  } = props;

  const { innerFiles, uploadErrorHelper, onFileChange, onFileRemove, handleClear } = useFileUpload({
    accept,
    maxSize,
    multiple,
    validateIndividually,
    defaultFiles,
    onChange,
    onDelete,
  });

  const [hovered, setHovered] = React.useState(false);
  const currentBreakpoint = useBreakpoint();

  const fileUploadBEM = cn(styles['tedi-file-upload'], { [styles['tedi-file-upload--disabled']]: disabled }, className);
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

  const getFiles = React.useMemo(() => {
    return !!files && !!onChange ? files : innerFiles;
  }, [files, innerFiles, onChange]);

  const getFileElement = (file: FileUploadFile, index: number) => {
    return (
      <li key={index}>
        <Tag
          color={file.isValid === false ? 'danger' : 'primary'}
          onClose={!file.isLoading && !disabled && !readOnly ? () => onFileRemove(file) : undefined}
          isLoading={file.isLoading}
        >
          {file.name}
        </Tag>
      </li>
    );
  };

  const showFiles = () => {
    if (getFiles.length > 1) {
      return (
        <ul className={styles['tedi-file-upload__items']}>
          {getFiles.map((file, index) => getFileElement(file, index))}
        </ul>
      );
    } else if (getFiles.length === 1) {
      return <Text className={styles['tedi-file-upload__items']}>{getFiles[0].name}</Text>;
    }
    return null;
  };

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={styles['tedi-file-upload__label-wrapper']}
      >
        <FormLabel
          id={id}
          {...rest}
          renderWithoutLabel={readOnly}
          className={styles['tedi-file-upload__label']}
          size={size}
        />
      </div>
      {readOnly ? (
        showFiles()
      ) : (
        <div
          className={cn(
            styles['tedi-file-upload__container'],
            {
              [styles['tedi-file-upload--disabled']]: disabled,
              [styles['tedi-file-upload--error']]: (uploadErrorHelper?.type || helper?.type) === 'error',
              [styles['tedi-file-upload--valid']]: (uploadErrorHelper?.type || helper?.type) === 'valid',
            },
            { [styles[`tedi-file-upload__container--${size}`]]: size }
          )}
        >
          <div className={styles['tedi-file-upload__content']}>
            <Row>
              <Col className="display-flex">{showFiles()}</Col>
              <Col xs={12} md="auto">
                <div className={fileUploadBEM}>
                  <input
                    id={id}
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={onFileChange}
                    multiple={multiple}
                    disabled={disabled}
                    aria-invalid={!!uploadErrorHelper}
                  />
                  {hasClearButton && getFiles.length > 0 && !disabled && (
                    <>
                      {isBreakpointBelow(currentBreakpoint, 'md') ? (
                        <Button
                          visualType="neutral"
                          iconLeft="close"
                          aria-describedby={helperId}
                          isActive={hovered}
                          disabled={disabled}
                          onClick={handleClear}
                          className={styles['tedi-file-upload__button']}
                        >
                          {getLabel('clear')}
                        </Button>
                      ) : (
                        <ClosingButton onClick={handleClear} size="medium" title={getLabel('clear')} />
                      )}
                      <Separator axis="vertical" height={1.5} spacing={0.5} color="primary" />
                    </>
                  )}
                  <Button
                    visualType="neutral"
                    iconLeft="file_upload"
                    aria-describedby={helperId}
                    isActive={hovered}
                    disabled={disabled}
                    onClick={() => document.getElementById(id)?.click()}
                    className={styles['tedi-file-upload__button']}
                    size={size}
                  >
                    {getLabel('file-upload.add')}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
      {(uploadErrorHelper || helper) && (
        <FeedbackText {...((uploadErrorHelper || helper) as FeedbackTextProps)} id={helperId} />
      )}
    </>
  );
};

export default FileUpload;
