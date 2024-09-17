import { fireEvent, render, screen } from '@testing-library/react';

import { Tag } from './tag';

import '@testing-library/jest-dom';

describe('Tag component', () => {
  it('renders with default props', () => {
    render(<Tag>Tag</Tag>);
    const tag = screen.getByText('Tag');
    expect(tag).toBeInTheDocument();
  });

  it('renders with a close button and triggers onClose callback', () => {
    const onCloseMock = jest.fn();
    render(<Tag onClose={onCloseMock}>Tag</Tag>);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('does not render close button when isLoading is true', () => {
    const onCloseMock = jest.fn();
    render(
      <Tag onClose={onCloseMock} isLoading={true}>
        Tag
      </Tag>
    );

    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('renders loading state with loading label', () => {
    render(
      <Tag isLoading={true} loadingLabel="Loading...">
        Tag
      </Tag>
    );

    const spinner = screen.getByText(/loading/i);
    expect(spinner).toBeInTheDocument();
  });
});
