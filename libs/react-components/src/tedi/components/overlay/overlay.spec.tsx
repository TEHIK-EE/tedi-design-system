import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';

import * as helpers from '../../helpers';
import { useLabels } from '../../providers/label-provider';
import Button from '../buttons/button/button';
import { Icon } from '../icon/icon';
import Overlay, { OverlayContext } from './overlay';

jest.mock('../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key) => `Mocked Label for ${key}`),
  })),
}));

jest.mock('../../helpers', () => ({
  ...jest.requireActual('../../helpers'),
  useIsTouchDevice: jest.fn(),
  useIsMounted: jest.fn(() => true),
}));

describe('Overlay component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('applies class names correctly for overlay components', () => {
    render(
      <Overlay>
        <Overlay.Trigger className="custom-class">Trigger Text</Overlay.Trigger>
        <Overlay.Content classNames={{ content: 'custom-content', arrow: 'custom-arrow' }}>Content</Overlay.Content>
      </Overlay>
    );
    const trigger = screen.getByText('Trigger Text');

    expect(trigger).toHaveClass('tedi-overlay__trigger');
    expect(trigger).toHaveClass('tedi-overlay__trigger--text');
    expect(trigger).toHaveClass('custom-class');

    fireEvent.click(trigger);
    const content = screen.getByTestId('overlay-content');
    const arrow = screen.getByTestId('overlay-arrow');

    expect(content).toHaveClass('custom-content');
    expect(arrow).toHaveClass('custom-arrow');
  });

  it('applies correct aria attributes when child is an Icon', () => {
    const { getLabel } = useLabels();

    render(
      <Overlay>
        <Overlay.Trigger>
          <Icon name="search" />
        </Overlay.Trigger>
        <Overlay.Content>Content</Overlay.Content>
      </Overlay>
    );
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', getLabel('tooltip.icon-trigger'));
  });

  it('does not apply aria attributes when child is not an Icon', () => {
    const { getLabel } = useLabels();

    render(
      <Overlay>
        <Overlay.Trigger>
          <Button>Trigger</Button>
        </Overlay.Trigger>
        <Overlay.Content>Content</Overlay.Content>
      </Overlay>
    );
    expect(screen.getByText('Trigger')).not.toHaveAttribute('aria-label', getLabel('tooltip.icon-trigger'));
  });

  it('should provide default values for getReferenceProps and getFloatingProps', () => {
    const TestComponent = () => {
      const context = useContext(OverlayContext);
      const referenceProps = context.getReferenceProps();
      const floatingProps = context.getFloatingProps();

      return (
        <div data-testid="test-component">
          <div data-testid="reference-props">{JSON.stringify(referenceProps)}</div>
          <div data-testid="floating-props">{JSON.stringify(floatingProps)}</div>
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    expect(JSON.parse(getByTestId('reference-props').textContent!)).toEqual({});
    expect(JSON.parse(getByTestId('floating-props').textContent!)).toEqual({});
  });

  it('should set openWith to click for touch devices', () => {
    (helpers.useIsTouchDevice as jest.Mock).mockReturnValue(true);

    render(
      <Overlay>
        <Overlay.Trigger>Trigger</Overlay.Trigger>
        <Overlay.Content>Content</Overlay.Content>
      </Overlay>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    const content = screen.getByTestId('overlay-content');
    expect(content).toBeInTheDocument();
  });

  it('should set openWith to hover for non-touch devices', () => {
    (helpers.useIsTouchDevice as jest.Mock).mockReturnValue(false);

    render(
      <Overlay>
        <Overlay.Trigger>Trigger</Overlay.Trigger>
        <Overlay.Content>Content</Overlay.Content>
      </Overlay>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    const content = screen.getByTestId('overlay-content');
    expect(content).toBeInTheDocument();
  });

  it('should handle controlled state with onToggle', () => {
    const onToggleMock = jest.fn();

    render(
      <Overlay open={false} onToggle={onToggleMock}>
        <Overlay.Trigger>Trigger</Overlay.Trigger>
        <Overlay.Content>Content</Overlay.Content>
      </Overlay>
    );

    fireEvent.click(screen.getByText('Trigger'));
    expect(onToggleMock).toHaveBeenCalledWith(true);
  });
});
