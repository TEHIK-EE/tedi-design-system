import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import NumberField, { NumberFieldProps } from './number-field';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('NumberField component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps: NumberFieldProps = {
    id: 'test-number-field',
    label: 'Test Label',
    step: 1,
    min: 0,
    max: 10,
    onChange: jest.fn(),
    helper: { type: 'hint', text: 'Helper text', id: 'helper-id' },
  };

  it('renders the NumberField with default properties', () => {
    render(<NumberField {...defaultProps} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-number-field');
  });

  it('renders the label', () => {
    render(<NumberField {...defaultProps} />);
    const label = screen.getByText(/test label/i);
    expect(label).toBeInTheDocument();
  });

  it('increments the value when the increment button is clicked', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} />);
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(incrementButton);

    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('decrements the value when the decrement button is clicked', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} defaultValue={5} />);
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    fireEvent.click(decrementButton);

    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('does not decrement below the minimum value', () => {
    render(<NumberField {...defaultProps} defaultValue={0} />);
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    fireEvent.click(decrementButton);

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(0);
  });

  it('does not increment above the maximum value', () => {
    render(<NumberField {...defaultProps} defaultValue={10} />);
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(incrementButton);

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(10);
  });

  it('renders helper text when provided', () => {
    render(<NumberField {...defaultProps} />);
    const helper = screen.getByText(/helper text/i);
    expect(helper).toBeInTheDocument();
  });

  it('disables the input and buttons when the disabled prop is true', () => {
    render(<NumberField {...defaultProps} disabled />);
    const input = screen.getByRole('spinbutton');
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const decrementButton = screen.getByRole('button', { name: /decrement/i });

    expect(input).toBeDisabled();
    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
  });

  it('shows validation error when invalid prop is true', () => {
    render(<NumberField {...defaultProps} invalid />);
    const container = document.querySelector('.tedi-number-field');
    expect(container).toHaveClass('tedi-number-field--invalid');
  });

  it('displays the suffix when provided', () => {
    render(<NumberField {...defaultProps} suffix="kg" />);
    const suffix = screen.getByText(/kg/i);
    expect(suffix).toBeInTheDocument();
  });

  it('updates value on manual input', () => {
    const handleChange = jest.fn();
    render(<NumberField {...defaultProps} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });

    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it('applies the "small" class when size is set to "small"', () => {
    render(<NumberField {...defaultProps} size="small" />);
    const container = document.querySelector('.tedi-number-field');
    expect(container).toHaveClass('tedi-number-field--small');
  });
});
