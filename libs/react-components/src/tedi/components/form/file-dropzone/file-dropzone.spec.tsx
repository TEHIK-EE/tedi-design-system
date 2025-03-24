import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import { useFileUpload } from '../../../helpers/hooks/use-file-upload';
import { useLabels } from '../../../providers/label-provider';
import FileDropzone from './file-dropzone';

jest.mock('../../../helpers/hooks/use-file-upload');
jest.mock('../../../providers/label-provider');

jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(),
}));

describe('FileDropzone', () => {
  const mockUseFileUpload = useFileUpload as jest.Mock;
  const mockUseLabels = useLabels as jest.Mock;
  const mockUseDropzone = useDropzone as jest.Mock;

  beforeEach(() => {
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: undefined,
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    mockUseLabels.mockReturnValue({
      getLabel: (key: string) => key,
    });

    mockUseDropzone.mockImplementation((props) => {
      return {
        getRootProps: jest.fn(() => ({
          className: 'tedi-file-dropzone',
        })),
        getInputProps: jest.fn(() => ({
          type: 'file',
        })),
        isDragActive: false,
        ...props,
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dropzone with the correct label', () => {
    render(<FileDropzone id="1" name="file" label="Upload File" />);
    expect(screen.getByText('Upload File')).toBeInTheDocument();
  });

  it('renders the dropzone with a helper text', () => {
    render(<FileDropzone id="2" name="file" label="Upload File" helper={{ text: 'Helper text' }} />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('renders the dropzone with an error message', () => {
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: { type: 'error', text: 'Error message' },
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="3" name="file" label="Upload File" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('configures useDropzone with correct props and handles file drop', () => {
    const onFileChange = jest.fn();
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: undefined,
      onFileChange,
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="5" name="file" label="Upload File" accept="image/png" multiple maxSize={5} />);

    const useDropzoneMock = useDropzone as jest.Mock;
    const dropzoneProps = useDropzoneMock.mock.calls[0][0];

    expect(dropzoneProps.accept).toEqual({ 'application/*': ['image/png'] });
    expect(dropzoneProps.multiple).toBe(true);
    expect(dropzoneProps.maxSize).toBe(5 * 1024 ** 2);

    const file = new File(['file content'], 'file.png', { type: 'image/png' });
    dropzoneProps.onDrop([file]);

    expect(onFileChange).toHaveBeenCalledWith({
      target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  });

  it('renders uploaded files', () => {
    const file = { id: '1', name: 'file.png', isValid: true };
    mockUseFileUpload.mockReturnValue({
      innerFiles: [file],
      uploadErrorHelper: undefined,
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="6" name="file" label="Upload File" />);
    expect(screen.getByText('file.png')).toBeInTheDocument();
  });

  it('calls onFileRemove when a file is removed', () => {
    const onFileRemove = jest.fn();
    const file = { id: '1', name: 'file.png', isValid: true };
    mockUseFileUpload.mockReturnValue({
      innerFiles: [file],
      uploadErrorHelper: undefined,
      onFileChange: jest.fn(),
      onFileRemove,
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="test-file-dropzone" name="file" label="Upload File" />);
    const removeButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(removeButton);

    expect(onFileRemove).toHaveBeenCalledWith(file);
  });

  it('disables the dropzone when disabled prop is true', () => {
    render(<FileDropzone id="7" name="file" label="Upload File" disabled />);
    const dropzone = screen.getByText('Upload File').closest('.tedi-file-dropzone');
    expect(dropzone).toHaveClass('tedi-file-dropzone--disabled');
  });
});
