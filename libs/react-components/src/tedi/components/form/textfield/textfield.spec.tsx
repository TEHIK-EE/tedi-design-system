import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import TextField, { TextFieldProps } from './textfield';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('TextField component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps: TextFieldProps = {
    id: 'test-field',
    label: 'Test Label',
    placeholder: 'Enter text...',
    name: 'testField',
    onChange: jest.fn(),
  };

  it('renders the TextField with default properties', () => {
    render(<TextField {...defaultProps} />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-field');
    expect(input).toHaveAttribute('name', 'testField');
  });

  it('renders the label', () => {
    render(<TextField {...defaultProps} />);
    const label = screen.getByText(/test label/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-field');
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<TextField {...defaultProps} onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('New Value');
  });

  it('renders with an icon when the icon prop is provided', () => {
    render(<TextField {...defaultProps} icon="search" />);
    const icon = screen.getByText('search');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('tedi-icon');
  });

  it('renders a clear button and clears the input when the clear button is clicked', () => {
    const handleClear = jest.fn();
    render(<TextField {...defaultProps} isClearable onClear={handleClear} />);
    const input = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(input, { target: { value: 'To Be Cleared' } });
    const clearButton = screen.getByTitle(/clear/i);
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('');
  });

  it('renders helper text when provided', () => {
    render(<TextField {...defaultProps} helper={{ type: 'hint', text: 'Helper text', id: 'helper-id' }} />);
    const helper = screen.getByText(/helper text/i);
    expect(helper).toBeInTheDocument();
  });

  it('displays validation error if invalid prop is true', () => {
    render(<TextField {...defaultProps} invalid helper={{ type: 'error', text: 'Error message' }} />);
    const error = screen.getByText(/error message/i);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('tedi-feedback-text--error');
  });

  it('renders a textarea when isTextArea is true', () => {
    render(<TextField {...defaultProps} isTextArea />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('disables the input when disabled prop is true', () => {
    render(<TextField {...defaultProps} disabled />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeDisabled();
  });

  it('renders correctly with different sizes', () => {
    const { rerender } = render(<TextField {...defaultProps} size="small" />);

    const container = document.querySelector('[data-name="textfield"]') as HTMLElement;
    expect(container).toHaveClass('tedi-textfield--small');

    rerender(<TextField {...defaultProps} size="large" />);
    expect(container).toHaveClass('tedi-textfield--large');
  });

  it('triggers onIconClick when icon is clicked', () => {
    const handleIconClick = jest.fn();
    render(<TextField {...defaultProps} icon="search" onIconClick={handleIconClick} />);
    const icon = screen.getByRole('button');
    fireEvent.click(icon);
    expect(handleIconClick).toHaveBeenCalledTimes(1);
  });
});
