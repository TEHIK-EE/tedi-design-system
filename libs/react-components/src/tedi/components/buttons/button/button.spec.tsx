import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { Button } from './button';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('Button component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps = {
    children: 'Click Me',
  };

  it('renders Button with default properties', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies correct button type and formNoValidate by default', () => {
    render(<Button {...defaultProps} type="submit" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('formnovalidate');
  });

  it('allows custom class names to be passed', () => {
    render(<Button {...defaultProps} className="custom-button-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-button-class');
  });

  it('renders with ButtonContent styles based on props', () => {
    render(<Button {...defaultProps} type="button" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn');
  });

  it('renders an icon if specified in ButtonContent', () => {
    render(<Button {...defaultProps} icon="check" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('btn__icon btn__icon--center');
  });

  it('renders with full width when fullWidth prop is true', () => {
    render(<Button {...defaultProps} fullWidth />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--full-width');
  });

  it('does not trigger onClick when isLoading is true', () => {
    const handleClick = jest.fn();
    render(<Button {...defaultProps} onClick={handleClick} isLoading />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('triggers onClick when clicked and not loading', () => {
    const handleClick = jest.fn();
    render(<Button {...defaultProps} onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
