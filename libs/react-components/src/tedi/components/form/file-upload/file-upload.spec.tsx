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

  it('calls handleClear when clicked', () => {
    const handleClear = jest.fn();
    render(
      <FileUpload
        {...defaultProps}
        hasClearButton
        defaultFiles={[{ name: 'test.pdf', id: '1' }]}
        onChange={handleClear}
      />
    );

    const clearButton = screen.getByRole('button', {
      name: /clear/i,
    });

    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalled();
  });

  it('should use files prop when provided and onChange is defined', () => {
    const files = [{ name: 'test.jpg', id: '1' }];
    render(<FileUpload {...defaultProps} files={files} onChange={jest.fn()} />);
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
  });

  it('should use innerFiles when files prop is not provided', () => {
    render(<FileUpload {...defaultProps} defaultFiles={[{ name: 'test.jpg', id: '1' }]} />);
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
  });

  it('should add valid files individually when validateIndividually is true', () => {
    render(<FileUpload {...defaultProps} validateIndividually />);
    const input = screen.getByLabelText(/Upload files/i);
    const validFile = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
    const invalidFile = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [validFile, invalidFile] } });
    expect(defaultProps.onChange).toHaveBeenCalledWith([
      expect.objectContaining({
        name: 'test.jpg',
        isValid: true,
        isLoading: false,
      }),
      expect.objectContaining({
        name: 'test.txt',
        isValid: false,
        isLoading: false,
      }),
    ]);
  });

  it('should update innerFiles when files prop is not provided', () => {
    render(<FileUpload {...defaultProps} defaultFiles={[{ name: 'test.jpg', id: '1' }]} />);
    const removeButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(removeButton);
    expect(screen.queryByText('test.jpg')).not.toBeInTheDocument();
  });

  it('should render Tag component for each file', () => {
    render(<FileUpload {...defaultProps} defaultFiles={[{ name: 'test.jpg', id: '1' }]} />);
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
  });

  it('should handle file size validation correctly', () => {
    render(<FileUpload {...defaultProps} maxSize={5} />);

    const input = screen.getByLabelText(/Upload files/i);
    const largeFile = new File(['a'.repeat(6 * 1024 * 1024)], 'large.jpg', {
      type: 'image/jpeg',
    });

    fireEvent.change(input, { target: { files: [largeFile] } });

    expect(defaultProps.onChange).not.toHaveBeenCalled();
    expect(screen.getByText(/file-upload.size-rejected/i)).toBeInTheDocument();
  });

  it('should update innerFiles when files prop is not provided', () => {
    render(<FileUpload {...defaultProps} defaultFiles={[{ name: 'test.jpg', id: '1' }]} />);

    const removeButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(removeButton);

    expect(screen.queryByText('test.jpg')).not.toBeInTheDocument();
  });

  it('should call onChange with the updated list of files', () => {
    const onChange = jest.fn();
    render(<FileUpload {...defaultProps} onChange={onChange} defaultFiles={[{ name: 'test.jpg', id: '1' }]} />);

    const removeButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(removeButton);

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('should use files prop when files and onChange are provided', () => {
    const files = [{ name: 'test.jpg', id: '1' }];
    render(<FileUpload {...defaultProps} files={files} onChange={jest.fn()} />);
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
  });

  it('renders Tag component with onClose prop when file is valid and not read-only', () => {
    const file = { name: 'test.jpg', id: '1', isValid: true, isLoading: false };
    render(<FileUpload {...defaultProps} defaultFiles={[file]} />);

    const closeButton = screen.getByRole('button', { name: /clear/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('does not render onClose prop for Tag when file is disabled and read-only', () => {
    const file = { name: 'test.jpg', id: '1', isValid: true, isLoading: true };
    render(<FileUpload {...defaultProps} defaultFiles={[file]} disabled readOnly />);

    const closeButton = screen.queryByRole('button', { name: /clear/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('does not render onClose prop for Tag when file is disabled', () => {
    const file = { name: 'test.jpg', id: '1', isValid: true, isLoading: false };
    render(<FileUpload {...defaultProps} defaultFiles={[file]} disabled />);

    const closeButton = screen.queryByRole('button', { name: /clear/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('does not render onClose prop for Tag when file is read-only', () => {
    const file = { name: 'test.jpg', id: '1', isValid: true, isLoading: false };
    render(<FileUpload {...defaultProps} defaultFiles={[file]} readOnly />);

    const closeButton = screen.queryByRole('button', { name: /clear/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('renders single file name using Text component', () => {
    const file = { name: 'test.jpg', id: '1' };
    render(<FileUpload {...defaultProps} defaultFiles={[file]} />);

    const fileName = screen.getByText('test.jpg');
    expect(fileName).toBeInTheDocument();
    expect(fileName.tagName.toLowerCase()).toBe('p');
  });

  it('triggers file input click when the "Add" button is clicked', () => {
    render(<FileUpload {...defaultProps} />);

    const fileInput = screen.getByLabelText(/Upload files/i) as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, 'click');

    const addButton = screen.getByRole('button', { name: /file-upload.add/i });
    fireEvent.click(addButton);

    expect(clickSpy).toHaveBeenCalled();
  });
});
