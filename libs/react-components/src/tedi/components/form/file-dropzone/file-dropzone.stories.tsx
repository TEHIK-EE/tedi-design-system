import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../grid';
import { FileDropzone, FileDropzoneProps } from './file-dropzone';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4536-78765&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/90c693-number-field" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof FileDropzone> = {
  component: FileDropzone,
  title: 'TEDI-Ready/Components/Form/FileDropzone',
  args: {
    name: 'file-dropzone',
  },
};

export default meta;
type Story = StoryObj<typeof FileDropzone>;

export const Default: Story = {};

const Template: StoryFn<FileDropzoneProps> = (args) => (
  <Row>
    <Col md={6}>
      <FileDropzone {...args} />
    </Col>
  </Row>
);

export const WithHint: Story = {
  render: Template,
  args: {
    name: 'file',
    helper: {
      text: 'JPG, PNG, PDF with size 1MB.',
    },
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    id: 'file-dropzone-disabled',
    name: 'file-loading',
    label: 'Drop files here',
    disabled: true,
  },
};

export const Multiple: Story = {
  render: Template,
  args: {
    id: 'file-dropzone-multiple',
    name: 'file-multiple',
    multiple: true,
    defaultFiles: [{ name: 'report.pdf' }, { name: 'report_1.pdf' }, { name: 'report_2.pdf' }],
    helper: {
      text: 'JPG, PNG, PDF with size 1MB.',
    },
  },
};

export const ValidationFailed: Story = {
  args: {
    id: 'file-dropzone-validation-failed',
    name: 'file-validation-failed',
    maxSize: 1,
    accept: '.pdf,.txt',
    multiple: true,
    validateIndividually: true,
    defaultFiles: [{ name: 'invalid_file.pdf', isValid: false }],
  },
  render: (args) => (
    <Row>
      <Col md={6}>
        <FileDropzone
          {...args}
          helper={{
            type: 'error',
            text: 'Invalid file uploaded. Only .pdf and .txt files under 1MB are allowed.',
          }}
        />
      </Col>
    </Row>
  ),
};

export const MultipleWithIndividualValidation: Story = {
  args: {
    id: 'file-dropzone-multiple-individual-validation',
    name: 'file-multiple-individual-validation',
    multiple: true,
    maxSize: 0.01,
    accept: '.pdf,.txt',
    validateIndividually: true,
    defaultFiles: [
      { name: 'taotlus_scan_lk_1.pdf' },
      { name: 'taotlus_scan_lk_2.pdf' },
      { name: 'taotlus_scan_lk_3.pdf' },
      { name: 'taotlus_scan_lk_4.pdf' },
      { name: 'taotlus_scan_lk_5.pdf', isValid: false },
    ],
    helper: {
      text: 'Only .pdf and .txt files under 1KB are allowed.',
      type: 'error',
    },
  },
  render: (args) => (
    <Row>
      <Col md={6}>
        <FileDropzone
          {...args}
          onChange={(files) => {
            console.log('Uploaded files:', files);
          }}
        />
      </Col>
    </Row>
  ),
};
