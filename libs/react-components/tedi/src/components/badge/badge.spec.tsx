import { render } from '@testing-library/react';

import { useBreakpointProps } from '../../helpers';
import { Badge, BadgeProps } from './badge';

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
    const { container } = render(<Badge>Default Badge</Badge>);
    const badge = container.querySelector('.tedi-badge');
    expect(badge).toHaveTextContent('Default Badge');
    expect(badge).toHaveClass('tedi-badge');
    expect(badge).toHaveClass('tedi-badge--filled--default');
  });

  it('renders with specified color and variant', () => {
    const { container } = render(
      <Badge color="primary" variant="bordered">
        Primary Bordered Badge
      </Badge>
    );
    const badge = container.querySelector('.tedi-badge');
    expect(badge).toHaveTextContent('Primary Bordered Badge');
    expect(badge).toHaveClass('tedi-badge--bordered--primary');
  });

  it('renders with large size', () => {
    const { container } = render(<Badge size="large">Large Badge</Badge>);
    const badge = container.querySelector('.tedi-badge');
    expect(badge).toHaveClass('tedi-badge--large');
  });

  it('renders with status indicator', () => {
    const { container } = render(
      <Badge status="warning" color="default" variant="filled">
        Warning Badge
      </Badge>
    );
    const badge = container.querySelector('.tedi-badge');
    expect(badge).toHaveClass('tedi-badge--status');
    expect(badge).toHaveClass('tedi-badge--status-warning');
  });

  it('renders with icon only', () => {
    const { container } = render(<Badge icon="check_circle" />);
    const badge = container.querySelector('.tedi-badge');
    const icon = container.querySelector('.tedi-badge__icon-default');
    expect(badge).toHaveClass('tedi-badge--icon-only');
    expect(icon).toBeInTheDocument();
  });

  it('renders with icon and text', () => {
    const { container } = render(<Badge icon="check_circle">Badge with Icon</Badge>);
    const badge = container.querySelector('.tedi-badge');
    const icon = container.querySelector('.tedi-badge__icon-default');
    expect(badge).toHaveTextContent('Badge with Icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders as an abbreviation when title prop is provided', () => {
    const { container } = render(<Badge title="Draft Status">DS</Badge>);
    const badge = container.querySelector('abbr');
    expect(badge).toHaveAttribute('title', 'Draft Status');
    expect(badge).toHaveTextContent('DS');
  });

  it('applies custom class names', () => {
    const { container } = render(<Badge className="custom-class">Custom Class Badge</Badge>);
    const badge = container.querySelector('.tedi-badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders correctly with all props', () => {
    const props: BadgeProps = {
      color: 'accent',
      variant: 'filled-bordered',
      size: 'large',
      status: 'success',
      icon: 'star',
      className: 'custom-class',
      title: 'Success Badge',
    };

    const { container } = render(<Badge {...props}>All Props Badge</Badge>);
    const badge = container.querySelector('.tedi-badge');
    expect(badge).toHaveClass('tedi-badge--filled-bordered--accent');
    expect(badge).toHaveClass('tedi-badge--status-success');
    expect(badge).toHaveClass('tedi-badge--large');
    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveTextContent('All Props Badge');
    expect(badge).toHaveAttribute('title', 'Success Badge');
  });
});
