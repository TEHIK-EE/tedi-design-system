import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import TextArea, { TextAreaProps } from './textarea';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('TextArea component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps: TextAreaProps = {
    id: 'test-textarea',
    label: 'Test Label',
    placeholder: 'Enter text...',
    name: 'testTextarea',
    onChange: jest.fn(),
  };

  it('renders the TextArea with default properties', () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'test-textarea');
    expect(textarea).toHaveAttribute('name', 'testTextarea');
  });

  it('applies the correct CSS classes', () => {
    render(<TextArea {...defaultProps} className="custom-class" />);
    const wrapper = screen.getByRole('textbox').closest('div[data-name="textarea"]');
    expect(wrapper).toHaveClass('tedi-textarea', 'custom-class');
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('tedi-textarea__input');
  });

  it('calls onChange when the textarea value changes', () => {
    const handleChange = jest.fn();
    render(<TextArea {...defaultProps} onChange={handleChange} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('New Value');
  });

  it('displays error when char count is over character limit', () => {
    const handleChange = jest.fn();
    const charLimit = 10;
    const newText = 'This text is too long';
    render(<TextArea {...defaultProps} characterLimit={charLimit} onChange={handleChange} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: newText } });
    const error = screen.getByText(`${newText.length}/${charLimit}`);
    expect(error).toHaveClass('tedi-feedback-text--error');
  });

  it('disables the textarea when disabled prop is true', () => {
    render(<TextArea {...defaultProps} disabled />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    expect(textarea).toBeDisabled();
  });

  it('renders helper text when provided', () => {
    render(<TextArea {...defaultProps} helper={{ type: 'hint', text: 'Helper text', id: 'helper-id' }} />);
    const helper = screen.getByText(/helper text/i);
    expect(helper).toBeInTheDocument();
  });

  it('displays validation error if invalid prop is true', () => {
    render(<TextArea {...defaultProps} invalid helper={{ type: 'error', text: 'Error message' }} />);
    const error = screen.getByText(/error message/i);
    expect(error).toHaveClass('tedi-feedback-text--error');
  });

  it('displays a character counter when characterLimit is set', () => {
    render(<TextArea {...defaultProps} characterLimit={15} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: 'Some text' } });
    const counter = screen.getByText(/9\/15/i);
    expect(counter).toBeInTheDocument();
  });

  it('does not display a character counter when characterLimit is not set', () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: 'Some text' } });
    const counter = screen.queryByText(/\d+\/\d+/i);
    expect(counter).not.toBeInTheDocument();
  });
});
