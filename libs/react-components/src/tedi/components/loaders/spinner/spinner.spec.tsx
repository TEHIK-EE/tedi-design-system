import { render } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { Spinner } from './spinner';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('Spinner component with breakpoint support', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  it('renders with default props at the current breakpoint', () => {
    const { container } = render(<Spinner label="loading" />);
    const spinner = container.querySelector('.tedi-spinner');

    expect(spinner).toHaveClass('tedi-spinner--size-16');
    expect(spinner).toHaveClass('tedi-spinner--color-primary');
  });

  it('renders with custom props and current breakpoint values', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn(() => ({
        className: 'custom-spinner',
        size: 48,
        color: 'secondary',
        position: 'absolute',
      })),
    });

    const { container } = render(<Spinner label="Loading..." />);
    const spinner = container.querySelector('.tedi-spinner');

    expect(spinner).toHaveClass('custom-spinner');
    expect(spinner).toHaveClass('tedi-spinner--size-48');
    expect(spinner).toHaveClass('tedi-spinner--color-secondary');
    expect(spinner).toHaveClass('tedi-spinner--absolute');
  });

  it('is exposed to screen readers via accessible name', () => {
    const { getByRole, getByText } = render(<Spinner label="Loading..." />);
    const spinner = getByRole('status');

    const hiddenText = getByText('Loading...');
    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText).toHaveClass('sr-only');

    expect(spinner).toHaveTextContent('Loading...');
  });

  it('falls back to default label if none provided', () => {
    const { getByText } = render(<Spinner />);
    const hiddenText = getByText('spinner.loading');
    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText).toHaveClass('sr-only');
  });

  it('uses different size and color based on breakpoint props', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn(() => ({
        size: 10,
        color: 'secondary',
      })),
    });

    const { container } = render(<Spinner label="loading" />);
    const spinner = container.querySelector('.tedi-spinner');

    expect(spinner).toHaveClass('tedi-spinner--size-10');
    expect(spinner).toHaveClass('tedi-spinner--color-secondary');
  });
});
