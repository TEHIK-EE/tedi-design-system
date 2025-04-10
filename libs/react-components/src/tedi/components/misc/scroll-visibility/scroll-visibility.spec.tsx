import { fireEvent, render } from '@testing-library/react';

import ScrollVisibility from './scroll-visibility';

import '@testing-library/jest-dom';

jest.mock('lodash-es/throttle', () => {
  const mockThrottledFunction = jest.fn((fn) => {
    const throttledFn = fn;
    throttledFn.cancel = jest.fn();
    return throttledFn;
  });
  return mockThrottledFunction;
});

describe('ScrollVisibility component', () => {
  let scrollContainer: HTMLElement;

  beforeEach(() => {
    scrollContainer = document.createElement('div');
    Object.defineProperties(scrollContainer, {
      scrollTop: { writable: true, value: 0 },
      scrollHeight: { writable: true, value: 1000 },
      clientHeight: { writable: true, value: 500 },
    });

    jest.spyOn(document, 'documentElement', 'get').mockReturnValue(scrollContainer);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <ScrollVisibility>
        <div>Test Content</div>
      </ScrollVisibility>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ScrollVisibility className="custom-class">
        <div>Test Content</div>
      </ScrollVisibility>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('wraps non-element children in a div', () => {
    const { container } = render(<ScrollVisibility>Test Content</ScrollVisibility>);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('hides component when scrolling down past scroll distance', () => {
    const { container } = render(
      <ScrollVisibility scrollDistance={100}>
        <div>Test Content</div>
      </ScrollVisibility>
    );

    scrollContainer.scrollTop = 0;
    scrollContainer.scrollTop = 150;

    fireEvent.scroll(window);
    jest.runAllTimers();
    expect(container.firstChild).toHaveClass('tedi-scroll-visibility--hidden');
  });

  it('shows component when scrolling to top', () => {
    const { container } = render(
      <ScrollVisibility scrollDistance={100}>
        <div>Test Content</div>
      </ScrollVisibility>
    );

    scrollContainer.scrollTop = 150;
    fireEvent.scroll(window);
    jest.runAllTimers();

    scrollContainer.scrollTop = 0;
    fireEvent.scroll(window);
    jest.runAllTimers();

    expect(container.firstChild).not.toHaveClass('tedi-scroll-visibility--hidden');
  });

  it('shows component when toggle visibility is set and scrolling up', () => {
    const { container } = render(
      <ScrollVisibility scrollDistance={100} toggleVisibility>
        <div>Test Content</div>
      </ScrollVisibility>
    );

    scrollContainer.scrollTop = 150;
    fireEvent.scroll(window);
    jest.runAllTimers();

    scrollContainer.scrollTop = 140;
    fireEvent.scroll(window);
    jest.runAllTimers();

    expect(container.firstChild).not.toHaveClass('tedi-scroll-visibility--hidden');
  });
});
