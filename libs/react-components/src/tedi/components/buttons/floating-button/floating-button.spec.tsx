import { render, screen } from '@testing-library/react';

import FloatingButton, { FloatingButtonProps } from './floating-button';

import '@testing-library/jest-dom';

describe('FloatingButton component', () => {
  const defaultProps: FloatingButtonProps = {
    children: 'Click Me',
  };

  it('renders floating button with default styles and children', () => {
    render(<FloatingButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'tedi-floating-button tedi-floating-button--horizontal tedi-floating-button--primary tedi-floating-button--medium'
    );
  });

  it('applies custom class names', () => {
    render(<FloatingButton {...defaultProps} className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders with icon only', () => {
    render(<FloatingButton {...defaultProps} icon="check" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('tedi-floating-button--icon-only');
  });

  it('renders vertical button', () => {
    render(<FloatingButton {...defaultProps} axis="vertical" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('tedi-floating-button--vertical');
  });

  it('renders large button', () => {
    render(<FloatingButton {...defaultProps} size="large" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('tedi-floating-button--large');
  });

  it('renders secondary button', () => {
    render(<FloatingButton {...defaultProps} visualType="secondary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('tedi-floating-button--secondary');
  });

  it('renders button top left', () => {
    render(<FloatingButton {...defaultProps} placement={{ vertical: 'top', horizontal: 'left' }} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      top: 0,
      left: 0,
    });
  });

  it('renders button top right', () => {
    render(<FloatingButton {...defaultProps} placement={{ vertical: 'top', horizontal: 'right' }} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      top: 0,
      right: 0,
    });
  });

  it('renders button bottom left', () => {
    render(<FloatingButton {...defaultProps} placement={{ vertical: 'bottom', horizontal: 'left' }} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      bottom: 0,
      left: 0,
    });
  });

  it('renders button bottom right', () => {
    render(<FloatingButton {...defaultProps} placement={{ vertical: 'bottom', horizontal: 'right' }} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      bottom: 0,
      right: 0,
    });
  });
});
