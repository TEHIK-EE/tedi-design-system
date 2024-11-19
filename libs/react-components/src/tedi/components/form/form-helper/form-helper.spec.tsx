import { render } from '@testing-library/react';

import { FormHelper, FormHelperProps } from './form-helper';

import '@testing-library/jest-dom';

describe('FormHelper component', () => {
  const defaultProps: FormHelperProps = {
    text: 'Helper text',
  };

  it('renders with default props', () => {
    const { container } = render(<FormHelper {...defaultProps} />);
    const helperElement = container.querySelector('div[data-name="form-helper"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-form-helper');
    expect(helperElement).toHaveClass('tedi-form-helper--help');
    expect(helperElement).toHaveClass('tedi-form-helper--left');
    expect(helperElement).toHaveTextContent('Helper text');
  });

  it('renders with custom id', () => {
    const { container } = render(<FormHelper {...defaultProps} id="custom-id" />);
    const helperElement = container.querySelector('div[data-name="form-helper"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveAttribute('id', 'custom-id');
  });

  it('renders with additional className', () => {
    const { container } = render(<FormHelper {...defaultProps} className="custom-class" />);
    const helperElement = container.querySelector('div[data-name="form-helper"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('custom-class');
  });

  it('applies the "valid" type style and role="alert"', () => {
    const { container } = render(<FormHelper {...defaultProps} type="valid" />);
    const helperElement = container.querySelector('div[data-name="form-helper"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-form-helper--valid');
    expect(helperElement).toHaveAttribute('role', 'alert');
  });

  it('applies the "error" type style and role="alert"', () => {
    const { container } = render(<FormHelper {...defaultProps} type="error" />);
    const helperElement = container.querySelector('div[data-name="form-helper"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-form-helper--error');
    expect(helperElement).toHaveAttribute('role', 'alert');
  });

  it('renders with "help" type without role attribute', () => {
    const { container } = render(<FormHelper {...defaultProps} type="help" />);
    const helperElement = container.querySelector('div[data-name="form-helper"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-form-helper--help');
    expect(helperElement).not.toHaveAttribute('role');
  });

  it('renders with the "left" position by default', () => {
    const { container } = render(<FormHelper {...defaultProps} />);
    const helperElement = container.querySelector('div[data-name="form-helper"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-form-helper--left');
  });

  it('renders with the "right" position when specified', () => {
    const { container } = render(<FormHelper {...defaultProps} position="right" />);
    const helperElement = container.querySelector('div[data-name="form-helper"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-form-helper--right');
  });
});
