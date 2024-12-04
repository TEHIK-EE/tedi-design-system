import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { Link } from './link';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('Link component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps = {
    children: 'Visit Site',
    href: '#',
  };

  it('renders Link with default properties', () => {
    render(<Link {...defaultProps} />);
    const link = screen.getByRole('link', { name: /visit site/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
    expect(link).toHaveClass('tedi-btn--underline');
  });

  it('renders with underline by default', () => {
    render(<Link {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('tedi-btn--underline');
  });

  it('disables underline when underline prop is false', () => {
    render(<Link {...defaultProps} underline={false} />);
    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('tedi-btn--underline');
  });

  it('renders accessibility label when target is _blank', () => {
    render(<Link {...defaultProps} target="_blank" />);
    const link = screen.getByRole('link', { name: /visit site/i });
    expect(link).toBeInTheDocument();

    const accessibilityLabel = link.querySelector('.sr-only');
    expect(accessibilityLabel).toBeInTheDocument();
    expect(accessibilityLabel).toHaveTextContent(/opens in a new tab|anchor\.new-tab/i);
  });

  it('passes additional props to the rendered component', () => {
    render(<Link {...defaultProps} data-test-id="custom-link" />);
    const link = screen.getByRole('link', { name: /visit site/i });
    expect(link).toHaveAttribute('data-test-id', 'custom-link');
  });

  it('triggers onClick when clicked and not loading', () => {
    const handleClick = jest.fn();
    render(<Link {...defaultProps} onClick={handleClick} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
