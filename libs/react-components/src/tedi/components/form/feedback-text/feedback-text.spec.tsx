import { render } from '@testing-library/react';

import { FeedbackText, FeedbackTextProps } from './feedback-text';

import '@testing-library/jest-dom';

describe('FeedbackText component', () => {
  const defaultProps: FeedbackTextProps = {
    text: 'Helper text',
  };

  it('renders with default props', () => {
    const { container } = render(<FeedbackText {...defaultProps} />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text');
    expect(helperElement).toHaveClass('tedi-feedback-text--hint');
    expect(helperElement).toHaveClass('tedi-feedback-text--left');
    expect(helperElement).toHaveTextContent('Helper text');
  });

  it('renders with custom id', () => {
    const { container } = render(<FeedbackText {...defaultProps} id="custom-id" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveAttribute('id', 'custom-id');
  });

  it('renders with additional className', () => {
    const { container } = render(<FeedbackText {...defaultProps} className="custom-class" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('custom-class');
  });

  it('applies the "valid" type style and role="alert"', () => {
    const { container } = render(<FeedbackText {...defaultProps} type="valid" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--valid');
    expect(helperElement).toHaveAttribute('role', 'alert');
  });

  it('applies the "error" type style and role="alert"', () => {
    const { container } = render(<FeedbackText {...defaultProps} type="error" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--error');
    expect(helperElement).toHaveAttribute('role', 'alert');
  });

  it('renders with "help" type without role attribute', () => {
    const { container } = render(<FeedbackText {...defaultProps} type="hint" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--hint');
    expect(helperElement).not.toHaveAttribute('role');
  });

  it('renders with the "left" position by default', () => {
    const { container } = render(<FeedbackText {...defaultProps} />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--left');
  });

  it('renders with the "right" position when specified', () => {
    const { container } = render(<FeedbackText {...defaultProps} position="right" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--right');
  });
});
