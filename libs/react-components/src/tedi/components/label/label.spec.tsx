import { fireEvent, render } from '@testing-library/react';

import { useBreakpointProps } from '../../helpers';
import { Label } from './label';

import '@testing-library/jest-dom';

jest.mock('../../helpers', () => ({
  useBreakpointProps: jest.fn(),
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

  it('renders InfoButton when infoButtonProps are provided', () => {
    const mockOnClick = jest.fn();

    const { container, getByRole } = render(
      <Label
        infoButton={{
          onClick: mockOnClick,
          children: 'More Info',
          title: 'Additional Info',
        }}
        required
      >
        Label
      </Label>
    );

    const infoButton = getByRole('button');
    expect(infoButton).toBeInTheDocument();
    const required = container.querySelector('.tedi-label__required');
    expect(required?.nextSibling).toBe(infoButton);

    fireEvent.click(infoButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not render InfoButton if infoButtonProps is not provided', () => {
    const { queryByRole } = render(<Label>Label</Label>);

    const infoButton = queryByRole('button', { name: 'More Info' });
    expect(infoButton).not.toBeInTheDocument();
  });
});
