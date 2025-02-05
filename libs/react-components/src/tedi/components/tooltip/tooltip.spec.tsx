import { fireEvent, render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';

import Tooltip, { TooltipProps } from './tooltip';

describe('Tooltip component', () => {
  const renderWithContext = (
    triggerProps: ComponentProps<typeof Tooltip.Trigger>,
    contentProps: ComponentProps<typeof Tooltip.Content>,
    tooltipProps?: Omit<TooltipProps, 'children'>
  ) => {
    return render(
      <Tooltip.Provider>
        <Tooltip {...tooltipProps}>
          <Tooltip.Trigger {...triggerProps} />
          <Tooltip.Content {...contentProps} />
        </Tooltip>
      </Tooltip.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders non-element Trigger children wrapped in a div', async () => {
    renderWithContext({ children: 'Trigger content' }, { children: 'Tooltip content' });

    const trigger = screen.getByText('Trigger content');
    expect(trigger.tagName).toBe('DIV');
    expect(trigger).toHaveClass('tedi-tooltip__trigger');
    expect(trigger).toHaveAttribute('tabIndex', '0');
  });

  it('renders correct Trigger children', async () => {
    renderWithContext({ children: <span>Trigger content</span> }, { children: 'Tooltip content' });

    const trigger = screen.getByText('Trigger content');
    expect(trigger.tagName).toBe('SPAN');
    expect(trigger).toHaveClass('tedi-tooltip__trigger');
    expect(trigger).toHaveAttribute('tabIndex', '0');
  });

  it('shows tooltip content on hover', async () => {
    renderWithContext({ children: 'Trigger content' }, { children: 'Tooltip content' });

    const trigger = screen.getByText('Trigger content');
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('shows tooltip content on click', () => {
    renderWithContext({ children: 'Trigger content' }, { children: 'Tooltip content' }, { openWith: 'click' });

    const trigger = screen.getByText('Trigger content');
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    expect(trigger).toHaveClass('tedi-tooltip__trigger--click');

    fireEvent.mouseEnter(trigger);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('clones element children with correct props', () => {
    renderWithContext(
      { children: <button className="custom-class">Click me</button> },
      { children: 'Tooltip content' }
    );

    const button = screen.getByText('Click me');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('tedi-tooltip__trigger', 'custom-class');
    expect(button).toHaveAttribute('tabIndex', '0');
  });

  it('passes through additional props on element children', () => {
    renderWithContext(
      {
        children: (
          <button aria-label="test button" data-testid="test-button">
            Tooltip trigger
          </button>
        ),
      },
      { children: 'Tooltip content' }
    );

    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'test button');
  });
});
