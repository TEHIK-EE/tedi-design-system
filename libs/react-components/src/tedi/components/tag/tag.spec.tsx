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

    const tagContent = screen.getByText('Default Tag');
    const tagWrapper = tagContent.closest('.tedi-tag');

    expect(tagWrapper).toBeInTheDocument();
    expect(tagWrapper).toHaveClass('tedi-tag tedi-tag--color-primary');
  });

  it('renders custom class names', () => {
    render(<Tag className="custom-class">Custom Class Tag</Tag>);

    const tagContent = screen.getByText('Custom Class Tag');
    const tagWrapper = tagContent.closest('.tedi-tag');

    expect(tagWrapper).toBeInTheDocument();
    expect(tagWrapper).toHaveClass('tedi-tag custom-class');
  });

  it('renders with danger color and displays error icon', () => {
    render(<Tag color="danger">Danger Tag</Tag>);

    const tag = screen.getByRole('status');
    expect(tag).toHaveClass('tedi-tag tedi-tag--color-danger');

    const errorIcon = tag.querySelector('span[data-name="icon"]');
    expect(errorIcon).toBeInTheDocument();
    expect(errorIcon).toHaveClass('tedi-icon');
    expect(errorIcon).toHaveClass('tedi-icon--color-danger');
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

    const tag = screen.getByText('Tag');
    expect(tag).not.toHaveClass('tedi-tag__close');
  });

  it('renders close button and close class when onClose prop is provided', () => {
    const onCloseMock = jest.fn();
    render(<Tag onClose={onCloseMock}>Closable Tag</Tag>);

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();

    const tagWrapper = closeButton.closest('.tedi-tag');
    expect(tagWrapper).toHaveClass('tedi-tag__close');

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

    const closeButton = screen.queryByRole('button');
    expect(closeButton).not.toBeInTheDocument();

    const tagWrapper = screen.getByText('Loading Tag').closest('.tedi-tag');
    expect(tagWrapper).not.toHaveClass('tedi-tag__close');
  });

  it('accessibility', () => {
    render(<Tag>Tag</Tag>);

    const tag = screen.getByRole('status');
    expect(tag).toBeInTheDocument();
    expect(tag).not.toHaveAttribute('aria-live');
  });
});
