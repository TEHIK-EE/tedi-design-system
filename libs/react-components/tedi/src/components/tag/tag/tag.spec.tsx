import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Tag } from './tag';

describe('Tag component', () => {
  it('renders default tag', () => {
    render(<Tag>Default Tag</Tag>);

    const tag = screen.getByText('Default Tag');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('tedi-tag');
  });

  it('renders custom class names', () => {
    render(<Tag className="custom-class">Custom Class Tag</Tag>);

    const tag = screen.getByText('Custom Class Tag');
    expect(tag).toHaveClass('tedi-tag custom-class');
  });

  it('renders with error state and displays error icon', () => {
    render(<Tag hasError>Tag</Tag>);

    const errorIconWrapper = screen.getByText('info');
    expect(errorIconWrapper).toHaveAttribute('role', 'img');
    expect(errorIconWrapper).toHaveClass('tedi-icon--color-danger');
    expect(errorIconWrapper).toHaveClass('tedi-icon--size-16');
  });

  it('does not render close button when hasError is true', () => {
    const onCloseMock = jest.fn();
    render(
      <Tag onClose={onCloseMock} hasError>
        Tag
      </Tag>
    );

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
  it('does not render error icon or loading spinner when neither isLoading nor hasError are true', () => {
    render(<Tag>Tag</Tag>);

    const tag = screen.getByRole('status');
    expect(tag).toBeInTheDocument();
    expect(tag).not.toHaveAttribute('aria-live');

    const errorIcon = screen.queryByText('info');
    expect(errorIcon).not.toBeInTheDocument();
  });

  it('renders with error state and displays error icon', () => {
    render(<Tag hasError>Tag</Tag>);

    const errorIconWrapper = screen.getByText('info');
    expect(errorIconWrapper).toHaveAttribute('role', 'img');
    expect(errorIconWrapper).toHaveClass('tedi-icon--color-danger');
    expect(errorIconWrapper).toHaveClass('tedi-icon--size-16');
  });

  it('accessibility', () => {
    render(<Tag>Tag</Tag>);

    const tag = screen.getByRole('status');
    expect(tag).toBeInTheDocument();
    expect(tag).not.toHaveAttribute('aria-live');
  });
});
