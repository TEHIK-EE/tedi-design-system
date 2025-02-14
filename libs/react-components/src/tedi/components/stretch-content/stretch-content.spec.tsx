import { render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../helpers';
import { StretchContent } from './stretch-content';

jest.mock('../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('StretchContent component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  it('renders children correctly', () => {
    render(
      <StretchContent>
        <span>Stretched Content</span>
      </StretchContent>
    );

    const childElement = screen.getByText('Stretched Content');
    expect(childElement).toBeInTheDocument();
  });

  it('applies default stretch direction', () => {
    render(
      <StretchContent>
        <span>Default Direction Content</span>
      </StretchContent>
    );

    const container = screen.getByText('Default Direction Content').closest('div');
    expect(container).toHaveClass('tedi-stretch-content--both');
  });

  it('applies custom stretch direction', () => {
    render(
      <StretchContent direction="horizontal">
        <span>Horizontal Stretch Content</span>
      </StretchContent>
    );

    const container = screen.getByText('Horizontal Stretch Content').closest('div');
    expect(container).toHaveClass('tedi-stretch-content--horizontal');
  });

  it('renders with custom class name', () => {
    render(
      <StretchContent className="custom-stretch-class">
        <span>Custom Class Content</span>
      </StretchContent>
    );

    const container = screen.getByText('Custom Class Content').closest('div');
    expect(container).toHaveClass('custom-stretch-class');
  });

  it('renders with specified role', () => {
    render(
      <StretchContent role="region">
        <span>Role Content</span>
      </StretchContent>
    );

    const container = screen.getByRole('region');
    expect(container).toBeInTheDocument();
  });

  it('accessibility - renders without role attribute if not provided', () => {
    render(
      <StretchContent>
        <span>No Role Content</span>
      </StretchContent>
    );

    const container = screen.getByText('No Role Content').closest('div');
    expect(container).not.toHaveAttribute('role');
  });
});
