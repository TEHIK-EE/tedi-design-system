import { render } from '@testing-library/react';

import { useBreakpointProps } from '../../helpers';
import { StatusBadge, StatusBadgeProps } from './status-badge';

import '@testing-library/jest-dom';

jest.mock('../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('Badge component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  it('renders with default props', () => {
    const { container } = render(<StatusBadge>Default Badge</StatusBadge>);
    const badge = container.querySelector('.tedi-status-badge');
    expect(badge).toHaveTextContent('Default Badge');
    expect(badge).toHaveClass('tedi-status-badge');
    expect(badge).toHaveClass('tedi-status-badge--variant-filled');
    expect(badge).toHaveClass('tedi-status-badge--color-neutral');
  });

  it('renders with specified color and variant', () => {
    const { container } = render(
      <StatusBadge color="brand" variant="bordered">
        Primary Bordered Badge
      </StatusBadge>
    );
    const badge = container.querySelector('.tedi-status-badge');
    expect(badge).toHaveTextContent('Primary Bordered Badge');
    expect(badge).toHaveClass('tedi-status-badge--variant-bordered');
    expect(badge).toHaveClass('tedi-status-badge--color-brand');
  });

  it('renders with large size', () => {
    const { container } = render(<StatusBadge size="large">Large Badge</StatusBadge>);
    const badge = container.querySelector('.tedi-status-badge');
    expect(badge).toHaveClass('tedi-status-badge--large');
  });

  it('renders with status indicator', () => {
    const { container } = render(
      <StatusBadge status="warning" color="neutral" variant="filled">
        Warning Badge
      </StatusBadge>
    );
    const badge = container.querySelector('.tedi-status-badge');
    expect(badge).toHaveClass('tedi-status-badge--status');
    expect(badge).toHaveClass('tedi-status-badge--status-warning');
  });

  it('renders with icon only', () => {
    const { container } = render(<StatusBadge icon="check_circle" />);
    const badge = container.querySelector('.tedi-status-badge');
    const icon = container.querySelector('.tedi-status-badge__icon-neutral');
    expect(badge).toHaveClass('tedi-status-badge__icon-only');
    expect(icon).toBeInTheDocument();
  });

  it('renders with icon and text', () => {
    const { container } = render(<StatusBadge icon="check_circle">Badge with Icon</StatusBadge>);
    const badge = container.querySelector('.tedi-status-badge');
    const icon = container.querySelector('.tedi-status-badge__icon-neutral');
    expect(badge).toHaveTextContent('Badge with Icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders as an abbreviation when title prop is provided', () => {
    const { container } = render(<StatusBadge title="Draft Status">DS</StatusBadge>);
    const badge = container.querySelector('abbr');
    expect(badge).toHaveAttribute('title', 'Draft Status');
    expect(badge).toHaveTextContent('DS');
  });

  it('applies custom class names', () => {
    const { container } = render(<StatusBadge className="custom-class">Custom Class Badge</StatusBadge>);
    const badge = container.querySelector('.tedi-status-badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders correctly with all props', () => {
    const props: StatusBadgeProps = {
      color: 'accent',
      variant: 'filled-bordered',
      size: 'large',
      status: 'success',
      icon: 'star',
      className: 'custom-class',
      title: 'Success Badge',
    };

    const { container } = render(<StatusBadge {...props}>All Props Badge</StatusBadge>);
    const badge = container.querySelector('.tedi-status-badge');
    expect(badge).toHaveClass('tedi-status-badge--variant-filled-bordered');
    expect(badge).toHaveClass('tedi-status-badge--color-accent');
    expect(badge).toHaveClass('tedi-status-badge--status-success');
    expect(badge).toHaveClass('tedi-status-badge--large');
    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveTextContent('All Props Badge');
    expect(badge).toHaveAttribute('title', 'Success Badge');
  });
});
