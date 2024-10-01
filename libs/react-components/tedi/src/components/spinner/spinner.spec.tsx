import { render } from '@testing-library/react';

import { Spinner } from './spinner';

import '@testing-library/jest-dom';

describe('Spinner component', () => {
  it('renders with default props', () => {
    const { container } = render(<Spinner label="loading" />);
    const spinner = container.querySelector('.tedi-spinner');
    expect(spinner).toHaveClass('tedi-spinner--size-16');
    expect(spinner).toHaveClass('tedi-spinner--color-primary');
  });

  it('renders with custom props', () => {
    const { container } = render(
      <Spinner className="custom-spinner" size={48} color="secondary" label="Loading..." position="absolute" />
    );
    const spinner = container.querySelector('.tedi-spinner');

    expect(spinner).toHaveClass('custom-spinner');
    expect(spinner).toHaveClass('tedi-spinner--size-48');
    expect(spinner).toHaveClass('tedi-spinner--color-secondary');
    expect(spinner).toHaveClass('tedi-spinner--absolute');
  });

  it('applies aria-label for screen readers if label prop is provided', () => {
    const { getByRole } = render(<Spinner label="Loading..." />);
    const spinner = getByRole('status');

    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
  });
});
