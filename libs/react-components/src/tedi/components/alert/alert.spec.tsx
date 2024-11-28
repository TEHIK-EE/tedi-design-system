import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../helpers';
import { Alert } from './alert';

jest.mock('../../helpers', () => ({
  useBreakpointProps: jest.fn(),
  useIsMounted: jest.fn(() => true),
}));

describe('Alert component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  it('renders the alert with default props', () => {
    render(<Alert>Default Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('tedi-alert tedi-alert--info');
  });

  it('renders a custom class name', () => {
    render(<Alert className="custom-class">Custom Class Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert custom-class');
  });

  it('renders with a title', () => {
    render(<Alert title="Alert Title">Alert Content</Alert>);

    const title = screen.getByText('Alert Title');
    const content = screen.getByText('Alert Content');

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(title.tagName).toBe('H5');
  });

  it('renders an icon when provided', () => {
    const { container } = render(<Alert icon="info">Alert with Icon</Alert>);

    const iconElement = container.querySelector('span[data-name="icon"]');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon');
    expect(iconElement).toHaveClass('tedi-icon--size-18');
  });

  it('applies global styles when isGlobal is true', () => {
    render(<Alert isGlobal>Global Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert--global');
  });

  it('removes side borders when noSideBorders is true', () => {
    render(<Alert noSideBorders>Alert without Side Borders</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert--no-side-borders');
  });

  it('renders a close button when onClose is provided', () => {
    const onCloseMock = jest.fn();
    render(<Alert onClose={onCloseMock}>Closable Alert</Alert>);

    const closeButton = screen.getByRole('button', { name: 'close' });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render close button when onClose is not provided', () => {
    render(<Alert>No Close Button</Alert>);

    const closeButton = screen.queryByRole('button', { name: /close alert/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('sets aria-live based on role prop', () => {
    render(<Alert role="status">Status Alert</Alert>);

    const alert = screen.getByRole('status');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  it('renders with danger type and applies correct class', () => {
    render(<Alert type="danger">Danger Alert</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tedi-alert--danger');
  });

  it('renders children without a title', () => {
    render(<Alert>Alert without Title</Alert>);

    const content = screen.getByText('Alert without Title');
    expect(content).toBeInTheDocument();
  });
});
