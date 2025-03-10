import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import FileUpload, { FileUploadProps } from './file-upload';

import '@testing-library/jest-dom';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: () => ({ getLabel: jest.fn((key) => key) }),
}));

describe('FileUpload component', () => {
  const defaultProps: FileUploadProps = {
    id: 'test-file-upload',
    name: 'file-upload',
    onChange: jest.fn(),
    onDelete: jest.fn(),
    accept: '.jpg,.png',
    multiple: true,
    maxSize: 5,
    label: 'Upload files',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the FileUpload component', () => {
    render(<FileUpload {...defaultProps} />);
    const input = screen.getByLabelText(/Upload files/i);
    expect(input).toBeInTheDocument();
  });

  it('allows file selection', () => {
    render(<FileUpload {...defaultProps} />);
    const input = screen.getByLabelText(/Upload files/i);
    const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(defaultProps.onChange).toHaveBeenCalledWith([expect.objectContaining({ name: 'test.jpg' })]);
  });

  describe('File Validation', () => {
    it('rejects files with invalid extensions', async () => {
      render(<FileUpload {...defaultProps} />);
      const input = screen.getByLabelText(/Upload files/i);
      const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
      fireEvent.change(input, { target: { files: [file] } });
      await waitFor(() => {
        expect(defaultProps.onChange).not.toHaveBeenCalled();
        expect(screen.getByText(/file-upload.extension-rejected/i)).toBeInTheDocument();
      });
    });

    it('rejects files exceeding max size', () => {
      render(<FileUpload {...defaultProps} />);
      const input = screen.getByLabelText(/Upload files/i);
      const file = new File(['a'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024 });
      fireEvent.change(input, { target: { files: [file] } });
      expect(defaultProps.onChange).not.toHaveBeenCalled();
      expect(screen.getByText(/file-upload.size-rejected/i)).toBeInTheDocument();
    });
  });

  describe('File Management', () => {
    it('does not render close button when there is only one file', () => {
      render(<FileUpload {...defaultProps} defaultFiles={[{ name: 'test.jpg', id: '1' }]} />);
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('renders file list but no input when readOnly is true', () => {
      render(<FileUpload {...defaultProps} defaultFiles={[{ name: 'test.jpg', id: '1' }]} readOnly />);
      expect(screen.getByText('test.jpg')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /Upload files/i })).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Upload files/i)).not.toBeInTheDocument();
    });

    it('clears all files when clear button is clicked', () => {
      render(<FileUpload {...defaultProps} hasClearButton defaultFiles={[{ name: 'test.jpg', id: '1' }]} />);
      const clearButton = screen.getByRole('button', { name: /clear/i });
      fireEvent.click(clearButton);
      expect(defaultProps.onChange).toHaveBeenCalledWith([]);
    });

    it('renders the file list correctly', () => {
      const files = [
        { name: 'test1.jpg', id: '1' },
        { name: 'test2.png', id: '2' },
      ];
      render(<FileUpload {...defaultProps} defaultFiles={files} />);
      files.forEach((file) => {
        expect(screen.getByText(file.name)).toBeInTheDocument();
      });
    });
  });

  describe('Helper Text', () => {
    it('should return helper text when accept and maxSize are provided', () => {
      const props = { ...defaultProps, accept: '.jpg,.png', maxSize: 5 };
      render(<FileUpload {...props} />);
      expect(screen.getByText(/file-upload.accept .jpg, .png/i)).toBeInTheDocument();
      expect(screen.getByText(/file-upload.max-size 5MB/i)).toBeInTheDocument();
    });

    it('should not return helper text when accept and maxSize are not provided', () => {
      const props = { ...defaultProps, accept: undefined, maxSize: undefined };
      render(<FileUpload {...props} />);
      expect(screen.queryByText(/file-upload.accept/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/file-upload.max-size/i)).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message for files with invalid extensions', () => {
      render(<FileUpload {...defaultProps} />);
      const input = screen.getByLabelText(/Upload files/i);
      const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
      fireEvent.change(input, { target: { files: [file] } });
      expect(screen.getByText(/file-upload.extension-rejected/i)).toBeInTheDocument();
    });

    it('should display error message for files exceeding max size', () => {
      render(<FileUpload {...defaultProps} />);
      const input = screen.getByLabelText(/Upload files/i);
      const file = new File(['a'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024 });
      fireEvent.change(input, { target: { files: [file] } });
      expect(screen.getByText(/file-upload.size-rejected/i)).toBeInTheDocument();
    });
  });

  describe('File Validation Edge Cases', () => {
    it('handles empty accept prop', () => {
      const { container } = render(<FileUpload {...defaultProps} accept={undefined} />);
      const fileInput = container.querySelector('input[type="file"]');
      expect((fileInput as HTMLInputElement)?.accept).toBe('');

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      fireEvent.change(fileInput!, {
        target: { files: [file] },
      });
      expect(defaultProps.onChange).toHaveBeenCalled();
    });
  });

  describe('State Management Edge Cases', () => {
    it('handles controlled and uncontrolled state transitions', () => {
      const files = [{ name: 'test.pdf', id: '1' }];
      render(<FileUpload {...defaultProps} files={files} onChange={jest.fn()} />);
      expect(screen.getByText('test.pdf')).toBeInTheDocument();

      render(<FileUpload {...defaultProps} />);
      const input = screen.getByLabelText(/Upload files/i);
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      fireEvent.change(input, { target: { files: [file] } });
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });
  });

  describe('Error Handling Edge Cases', () => {
    it('handles multiple error conditions', () => {
      render(<FileUpload {...defaultProps} />);
      const input = screen.getByLabelText(/Upload files/i);

      const invalidFiles = [
        new File(['test'], 'test.txt', { type: 'text/plain' }),
        new File(['a'.repeat(6 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' }),
      ];

      fireEvent.change(input, { target: { files: invalidFiles } });
      expect(screen.getByText(/file-upload.extension-rejected/i)).toBeInTheDocument();
      expect(screen.getByText(/file-upload.size-rejected/i)).toBeInTheDocument();
    });
  });
});
