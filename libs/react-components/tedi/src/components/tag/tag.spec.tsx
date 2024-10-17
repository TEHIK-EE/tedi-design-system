import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../helpers';
import { Tag } from './tag';

jest.mock('../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('Tag component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  it('renders default tag', () => {
    render(<Tag>Default Tag</Tag>);

    const tag = screen.getByText('Default Tag');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('tedi-tag tedi-tag--color-primary');
  });

  it('renders custom class names', () => {
    render(<Tag className="custom-class">Custom Class Tag</Tag>);

    const tag = screen.getByText('Custom Class Tag');
    expect(tag).toHaveClass('tedi-tag custom-class');
  });

  it('renders with danger color and displays error icon', () => {
    render(<Tag color="danger">Danger Tag</Tag>);

    const tag = screen.getByRole('status');
    expect(tag).toHaveClass('tedi-tag tedi-tag--color-danger');

    const errorIconWrapper = tag.querySelector('.tedi-icon--wrapper');
    expect(errorIconWrapper).toBeInTheDocument();

    const errorIcon = errorIconWrapper?.querySelector('[role="img"]');
    expect(errorIcon).toBeInTheDocument();
    expect(errorIcon).toHaveClass('tedi-icon tedi-icon--color-danger');
    expect(errorIcon).toHaveClass('tedi-icon--size-16');
  });

  it('renders with loading state', () => {
    render(<Tag isLoading>Loading Tag</Tag>);

    const tag = screen.getByRole('status', { name: '' });
    expect(tag).toHaveAttribute('aria-live', 'polite');

    const spinner = screen.getByRole('status', { name: 'spinner.loading' });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('tedi-spinner tedi-tag__loader');
    expect(spinner).toHaveClass('tedi-spinner--size-16');
    expect(spinner).toHaveClass('tedi-spinner--color-primary');
  });

  it('does not render close button when onClose prop is not provided', () => {
    render(<Tag>Tag</Tag>);

    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('renders close button when onClose prop is provided', () => {
    const onCloseMock = jest.fn();
    render(<Tag onClose={onCloseMock}>Closable Tag</Tag>);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render close button when isLoading is true', () => {
    const onCloseMock = jest.fn();
    render(
      <Tag isLoading onClose={onCloseMock}>
        Loading Tag
      </Tag>
    );

    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('accessibility', () => {
    render(<Tag>Tag</Tag>);

    const tag = screen.getByRole('status');
    expect(tag).toBeInTheDocument();
    expect(tag).not.toHaveAttribute('aria-live');
  });
});
