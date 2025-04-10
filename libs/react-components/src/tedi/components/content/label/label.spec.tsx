import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { Label } from './label';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
  useIsTouchDevice: jest.fn(),
  useIsMounted: jest.fn(() => true),
}));

describe('Label component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  it('renders with default props', () => {
    const { container } = render(<Label>Label</Label>);
    const label = container.querySelector('.tedi-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label');
    expect(label).not.toHaveClass('tedi-label--bold');
    expect(label).not.toHaveClass('tedi-label--small');
  });

  it('renders with isBold and required props', () => {
    const { container } = render(
      <Label isBold required>
        Label
      </Label>
    );
    const label = container.querySelector('.tedi-label');
    const required = container.querySelector('.tedi-label__required');
    expect(label).toHaveClass('tedi-label--bold');
    expect(required).toBeInTheDocument();
  });

  it('renders with isSmall size', () => {
    const { container } = render(<Label isSmall>Label</Label>);
    const label = container.querySelector('.tedi-label');
    expect(label).toHaveClass('tedi-label--small');
  });

  it('renders with a custom class name', () => {
    const { container } = render(<Label className="custom-class">Label</Label>);
    const label = container.querySelector('.tedi-label');
    expect(label).toHaveClass('custom-class');
  });

  it('handles breakpoint props correctly for isBold', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn(() => ({
        isBold: true,
      })),
    });

    const { container } = render(<Label>Label</Label>);
    const label = container.querySelector('.tedi-label');
    expect(label).toHaveClass('tedi-label--bold');
  });

  it('handles breakpoint props correctly for isSmall', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn(() => ({
        isSmall: true,
      })),
    });

    const { container } = render(<Label>Label</Label>);
    const label = container.querySelector('.tedi-label');
    expect(label).toHaveClass('tedi-label--small');
  });

  it('renders required symbol when required is true', () => {
    const { container } = render(<Label required>Label</Label>);
    const required = container.querySelector('.tedi-label__required');
    expect(required).toBeInTheDocument();
  });

  it('renders an InfoButton when tooltip is provided', () => {
    render(<Label tooltip="This is a tooltip">Label</Label>);

    const infoButton = screen.getByRole('button');
    expect(infoButton).toBeInTheDocument();

    fireEvent.mouseEnter(infoButton);

    expect(screen.getByRole('tooltip', { name: 'This is a tooltip' })).toBeInTheDocument();
  });

  it('does not render InfoButton if tooltip is not provided', () => {
    const { queryByRole } = render(<Label>Label</Label>);
    const infoButton = queryByRole('button');
    expect(infoButton).not.toBeInTheDocument();
  });
});
