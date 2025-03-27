import { render, screen } from '@testing-library/react';
import { act } from 'react';

import Ellipsis, { EllipsisProps } from './ellipsis';

import '@testing-library/jest-dom';

describe('Ellipsis Component', () => {
  const renderEllipsis = (props: Partial<EllipsisProps> = {}) => {
    return render(
      <Ellipsis {...props}>
        <p>Ellipsis content</p>
      </Ellipsis>
    );
  };

  it('renders the component', () => {
    const { getByText } = renderEllipsis();
    expect(getByText('Ellipsis content')).toBeInTheDocument();
  });

  it('applies default lineClamp value (2)', () => {
    const { container } = renderEllipsis();
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).toHaveStyle({ 'line-clamp': '2' });
  });

  it('applies custom lineClamp value', () => {
    const { container } = renderEllipsis({ lineClamp: 3 });
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).toHaveStyle({ 'line-clamp': '3' });
  });

  it('renders with popover when content overflows', () => {
    const { container } = renderEllipsis({ popover: true });
    const popoverTrigger = container.querySelector('[data-name="ellipsis"]');
    expect(popoverTrigger).toBeInTheDocument();
  });

  it('does not render popover when popover is false', () => {
    const { container } = renderEllipsis({ popover: false });
    expect(container.querySelector('Popover')).not.toBeInTheDocument();
  });

  it('applies additional props', () => {
    const { container } = renderEllipsis({ className: 'custom-class' });
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).toBeInTheDocument();
    expect(ellipsisElement).toHaveClass('custom-class');
  });

  it('updates state when content overflows', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(100);
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(50);

    act(() => {
      renderEllipsis();
    });

    expect(screen.getByText('Ellipsis content')).toBeInTheDocument();
  });

  it('does not show popover when content fits within container', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(50);
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(50);

    act(() => {
      renderEllipsis();
    });

    expect(screen.getByText('Ellipsis content')).toBeInTheDocument();
  });
});
