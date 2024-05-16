import { render } from '@testing-library/react';

import Spinner from './spinner';

import '@testing-library/jest-dom';

describe('Spinner component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<Spinner />);
    const spinner = getByTestId('spinner');
    expect(spinner).toHaveClass('tedi-spinner');
    expect(spinner).toHaveClass('tedi-spinner--size-16');
    expect(spinner).toHaveClass('tedi-spinner--color-primary');
  });

  it('renders with custom props', () => {
    const { getByTestId } = render(
      <Spinner className="custom-spinner" size={48} color="secondary" label="Loading..." position="absolute" />
    );
    const spinner = getByTestId('spinner');

    expect(spinner).toHaveClass('custom-spinner');
    expect(spinner).toHaveClass('tedi-spinner--size-48');
    expect(spinner).toHaveClass('tedi-spinner--color-secondary');
    expect(spinner).toHaveClass('tedi-spinner--absolute');
    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
  });

  it('hides label for screen readers if label prop is not provided', () => {
    const { getByTestId } = render(<Spinner />);
    const spinner = getByTestId('spinner');

    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows label for screen readers if label prop is provided', () => {
    const { getByTestId } = render(<Spinner label="Loading..." />);
    const spinner = getByTestId('spinner');

    expect(spinner).toHaveAttribute('aria-hidden', 'false');
    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
  });
});
