import { fireEvent, render, screen } from '@testing-library/react';

import { useLabels } from '../../../providers/label-provider';
import Popover from './popover';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key) => `Mocked Label for ${key}`),
  })),
}));

describe('Popover component', () => {
  it('should render children within OverlayContent', () => {
    render(
      <Popover>
        <Popover.Trigger>Trigger</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    const content = screen.getByTestId('overlay-content');
    expect(content).toHaveTextContent('Content');
  });

  it('should render title when provided', () => {
    render(
      <Popover>
        <Popover.Trigger>Trigger</Popover.Trigger>
        <Popover.Content title="Heading">Content</Popover.Content>
      </Popover>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    const title = screen.getByText('Heading');
    expect(title).toHaveTextContent('Heading');
  });

  it('should render closing button when provided', () => {
    const mockOnToggle = jest.fn();
    const { getLabel } = useLabels();

    render(
      <Popover onToggle={mockOnToggle}>
        <Popover.Trigger>Trigger</Popover.Trigger>
        <Popover.Content close>Content</Popover.Content>
      </Popover>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    const close = screen.getByTitle(getLabel('close'));
    fireEvent.click(close);

    expect(mockOnToggle).toHaveBeenCalledWith(false);
  });
});
