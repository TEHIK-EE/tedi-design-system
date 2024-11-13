import { fireEvent, render, screen } from '@testing-library/react';

import ButtonContent, { ButtonContentProps } from './button-content';

import '@testing-library/jest-dom';

describe('ButtonContent component', () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const defaultProps: ButtonContentProps<'button', {}, {}> = {
    children: 'Click Me',
  };

  it('renders button with default styles and children', () => {
    render(<ButtonContent {...defaultProps} />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn btn--primary btn--default');
  });

  it('applies custom class names', () => {
    render(<ButtonContent {...defaultProps} className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders with icon only', () => {
    render(<ButtonContent {...defaultProps} icon="check" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('btn__icon btn__icon--center');
  });

  it('renders with left icon', () => {
    render(<ButtonContent {...defaultProps} iconLeft="left-icon" />);
    const leftIcon = screen.getByRole('img', { hidden: true });
    expect(leftIcon).toBeInTheDocument();
    expect(leftIcon).toHaveClass('btn__icon btn__icon--left');
  });

  it('renders with right icon', () => {
    render(<ButtonContent {...defaultProps} iconRight="right-icon" />);
    const rightIcon = screen.getByRole('img', { hidden: true });
    expect(rightIcon).toBeInTheDocument();
    expect(rightIcon).toHaveClass('btn__icon btn__icon--right');
  });

  it('renders underline when underline prop is true', () => {
    render(<ButtonContent {...defaultProps} underline />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--underline');
  });

  it('renders in loading state with spinner', () => {
    render(<ButtonContent {...defaultProps} isLoading />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('btn__spinner');
  });

  it('renders with full width when fullWidth is true', () => {
    render(<ButtonContent {...defaultProps} fullWidth />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--full-width');
  });

  it('does not trigger onClick when isLoading is true', () => {
    const handleClick = jest.fn();
    render(<ButtonContent {...defaultProps} onClick={handleClick} isLoading />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('triggers onClick when clicked and not loading', () => {
    const handleClick = jest.fn();
    render(<ButtonContent {...defaultProps} onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
