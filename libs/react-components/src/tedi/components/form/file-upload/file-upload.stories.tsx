import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../grid';
import { Text } from '../../typography/text/text';
import { MultipleHandledTemplate } from './examples/multiple-handled';
import FileUpload, { FileUploadProps } from './file-upload';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4536-78765&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/90c693-number-field" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  title: 'TEDI-Ready/Components/Form/FileUpload',
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

const sizesArray: Array<'default' | 'small'> = ['default', 'small'];

const TemplateSizes: StoryFn<FileUploadProps> = (args) => {
  return (
    <div className="example-list">
      {sizesArray.map((size, key) => (
        <Row className={`${key === sizesArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col>
            <Text modifiers="bold">{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
          </Col>
          <Col>
            <FileUpload {...args} size={size} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Default: Story = {
  args: {
    id: 'file-upload',
    name: 'file',
    label: 'Upload file',
  },
};

export const Sizes: Story = {
  render: TemplateSizes,
  args: {
    id: 'example-1',
    label: 'Label',
  },
};

export const WithHint: Story = {
  args: {
    id: 'file-upload',
    name: 'file',
    label: 'Upload file',
    helper: {
      text: 'JPG, PNG, PDF with size 0.001MB.',
    },
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

export const ValidationFailed: Story = {
  args: {
    id: 'file-upload-validation-failed',
    name: 'file-validation-failed',
    label: 'Upload file',
    maxSize: 0.001,
    accept: '.pdf,.txt',
    multiple: true,
    validateIndividually: true,
    defaultFiles: [{ name: 'taotlus_scan_lk_1.pdf', isValid: false }],
  },
  render: (args) => (
    <FileUpload
      {...args}
      helper={{
        type: 'error',
        text: 'Feedback text',
      }}
    />
  ),
};

export const ValidationSuccess: Story = {
  args: {
    id: 'file-upload-validation-failed',
    name: 'file-validation-failed',
    label: 'Upload file',
    maxSize: 0.001,
    accept: '.pdf,.txt',
    multiple: true,
    validateIndividually: true,
    defaultFiles: [{ name: 'taotlus_scan_lk_1.pdf', isValid: false }],
  },
  render: (args) => (
    <FileUpload
      {...args}
      helper={{
        type: 'valid',
        text: 'Feedback text',
      }}
    />
  ),
};

export const MultipleWithIndividualValidation: Story = {
  args: {
    id: 'file-upload-multiple-individual-validation',
    name: 'file-multiple-individual-validation',
    label: 'Upload files',
    multiple: true,
    maxSize: 0.01,
    accept: '.pdf,.txt',
    validateIndividually: true,
    hasClearButton: true,
    defaultFiles: [
      { name: 'taotlus_scan_lk_1.pdf.pdf' },
      { name: 'taotlus_scan_lk_2.pdf.pdf' },
      { name: 'taotlus_scan_lk_3.pdf.pdf' },
      { name: 'taotlus_scan_lk_4.pdf.pdf' },
      { name: 'taotlus_scan_lk_5.pdf.pdf', isValid: false },
    ],
    helper: {
      text: 'Only .pdf and .txt files under 1KB are allowed.',
      type: 'error',
    },
  },
  render: (args) => (
    <FileUpload
      {...args}
      onChange={(files) => {
        console.log('Uploaded files:', files);
      }}
      helper={{
        type: 'error',
        text: 'Invalid file uploaded. Only .pdf and .txt files are allowed, and must be under 1KB.',
      }}
    />
  ),
};

export const LoadingState: Story = {
  args: {
    id: 'file-upload-loading',
    name: 'file-loading',
    label: 'Upload file',
    defaultFiles: [{ name: 'report.pdf', isLoading: true }, { name: 'report_1.pdf' }],
  },
};

export const Multiple: Story = {
  args: {
    id: 'file-upload-MULTIPLE',
    name: 'file-multiple',
    label: 'Upload file',
    multiple: true,
    defaultFiles: [{ name: 'report.pdf' }, { name: 'report_1.pdf' }, { name: 'report_2.pdf' }],
    helper: {
      text: 'JPG, PNG, PDF with size 0.001MB.',
    },
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
    defaultFiles: [{ name: 'report.pdf' }, { name: 'report_1.pdf' }, { name: 'report_2.pdf' }],
    onChange: (files) => {
      console.log(files);
    },
    readOnly: true,
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

export const SizeLimited: Story = {
  args: {
    id: 'file-upload-size-limited',
    name: 'file-size-limited',
    label: 'Upload file',
    maxSize: 0.001,
    multiple: true,
  },
};

export const ExtensionAndSizeLimit: Story = {
  args: {
    id: 'file-upload-size-extension-limited',
    name: 'file-size-extension-limited',
    label: 'Upload file',
    maxSize: 0.001,
    accept: '.pdf,.txt',
    multiple: true,
  },
};
