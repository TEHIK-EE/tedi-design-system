import cn from 'classnames';
import React from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { ILabelContext, useLabels } from '../../../providers/label-provider';
import { Button } from '../../buttons/button/button';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import { FormLabel, FormLabelProps } from '../../form/form-label/form-label';
import { Col, Row } from '../../grid';
import { Separator } from '../../separator/separator';
import { Tag } from '../../tag/tag';
import { Text } from '../../typography/text/text';
import { FeedbackText, FeedbackTextProps } from '../feedback-text/feedback-text';
import styles from './file-upload.module.scss';

export interface FileUploadFile extends Partial<File> {
  id?: string;
  /**
   * Is the file currently loading. Used when files are uploaded immediately
   */
  isLoading?: boolean;
  isValid?: boolean;
}

export type FileRejectionType = 'size' | 'extension';

export interface RejectedFile {
  type: FileRejectionType;
  file: File;
}

export interface FileUploadProps extends FormLabelProps {
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Field name
   */
  name: string;
  /**
   * FileUpload helper
   */
  helper?: FeedbackTextProps;
  /**
   * The accept attribute value is a string that defines the file types the file input should accept
   * For example '.pdf,.jpg'
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
  /**
   * onDelete handler
   */
  onDelete?: (file: FileUploadFile) => void;
  /**
   * Displays clearing button when files are uploaded
   * @default true
   */
  hasClearButton?: boolean;
  /**
   * Value of input to control input value from outside of component.
   * Do not use with defaultValue
   */
  files?: FileUploadFile[];
  /**
   * Is the fileUpload read-only
   */
  readOnly?: boolean;
  /**
   * If fileUpload is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Size limit in megabytes
   */
  maxSize?: number;
  /**
   * If true, allows valid files to be uploaded even if some are rejected.
   * If false, rejects all files if any fail validation.
   * @default false
   */
  validateIndividually?: boolean;
  /**
   * FileUpload size
   * @default 'default'
   */
  size?: 'small' | 'default';
}

const getDefaultHelpers = (
  { accept, maxSize }: Partial<FileUploadProps>,
  getLabel: ILabelContext['getLabel']
): FeedbackTextProps | undefined => {
  if (!accept && !maxSize) return;
  const text = [
    accept && `${getLabel('file-upload.accept')} ${accept.replaceAll(',', ', ')}`,
    maxSize && `${getLabel('file-upload.max-size')} ${maxSize}MB`,
  ]
    .filter(Boolean)
    .join('. ');
  return text.length ? { text } : undefined;
};

const getUploadErrorHelperText = (rejectedFiles: RejectedFile[], getLabel: ILabelContext['getLabel']): string => {
  const textMap = rejectedFiles.reduce(
    (acc, { type, file }) => {
      acc[type].push(file.name);
      return acc;
    },
    { extension: [] as string[], size: [] as string[] }
  );

  // Get labels based on rejection type
  return Object.entries(textMap)
    .filter(([_, names]) => names.length)
    .map(([type, names]) => {
      const joinedNames = names.map((name) => `'${name}'`).join(', ');
      const label = getLabel(`file-upload.${type as FileRejectionType}-rejected`);
      if (typeof label === 'string') {
        return label;
      }
      return label(joinedNames);
    })
    .join('. ');
};

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
    helper = getDefaultHelpers({ accept, maxSize }, getLabel),
    ...rest
  } = props;
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

  const [innerFiles, setInnerFiles] = React.useState<FileUploadFile[]>(defaultFiles || []);
  const [uploadErrorHelper, setUploadErrorHelper] = React.useState<FeedbackTextProps | undefined>();
  const currentBreakpoint = useBreakpoint();

  const fileUploadBEM = cn(styles['tedi-file-upload'], { [styles['tedi-file-upload--disabled']]: disabled }, className);

  const validFileType = (file: File) => {
    if (!accept) {
      return true;
    }

    const fileTypes = accept.split(',').map((type) => type.trim().toLowerCase());

    const fileExtension = file.name.includes('.') ? `.${file.name.split('.').pop()?.toLowerCase()}` : '';
    const fileMimeType = file.type.toLowerCase();

    return fileTypes.includes(fileExtension) || fileTypes.includes(fileMimeType);
  };

  const getFiles = React.useMemo(() => {
    return !!files && !!onChange ? files : innerFiles;
  }, [files, innerFiles, onChange]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const rejectedFiles: RejectedFile[] = [];
      const uploadedFiles = [...Array.from(e.target.files)].map((file) => {
        const isValidExtension = validFileType(file);
        const isValidSize = !maxSize || file.size <= maxSize * 1024 ** 2;

        if (!isValidExtension) {
          rejectedFiles.push({ type: 'extension', file });
        }
        if (!isValidSize) {
          rejectedFiles.push({ type: 'size', file });
        }

        return {
          ...file,
          isLoading: false,
          name: file.name,
          isValid: isValidExtension && isValidSize,
        };
      });

      if (!multiple && uploadedFiles.length > 0) {
        const newFiles = [uploadedFiles[0]];
        if (typeof files === 'undefined') {
          setInnerFiles(newFiles);
        }
        onChange?.(newFiles);
      } else {
        if (validateIndividually) {
          const newFiles = [...getFiles, ...uploadedFiles];
          if (typeof files === 'undefined') {
            setInnerFiles(newFiles);
          }
          onChange?.(newFiles);
        } else {
          const validFiles = uploadedFiles.filter((file) => file.isValid);
          if (validFiles.length > 0) {
            const newFiles = [...getFiles, ...validFiles];
            if (typeof files === 'undefined') {
              setInnerFiles(newFiles);
            }
            onChange?.(newFiles);
          }
        }
      }

      if (rejectedFiles.length) {
        setUploadErrorHelper({ type: 'error', text: getUploadErrorHelperText(rejectedFiles, getLabel) });
      } else {
        setUploadErrorHelper(undefined);
      }

      (e.target as HTMLInputElement).value = '';
    }
  };

  const onFileRemove = (file: FileUploadFile): void => {
    const newFiles = [...getFiles].filter((f) => f !== file);

    if (onDelete) {
      onDelete(file);
    }

    if (typeof files === 'undefined') {
      setInnerFiles(newFiles);
    }

    onChange?.(newFiles);
  };

  const handleClear = (): void => {
    if (typeof files === 'undefined') {
      setInnerFiles([]);
    }
    onChange?.([]);
    setUploadErrorHelper(undefined);

    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input) {
      input.value = '';
    }
  };

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
      <div className={styles['tedi-file-upload__label-wrapper']}>
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
