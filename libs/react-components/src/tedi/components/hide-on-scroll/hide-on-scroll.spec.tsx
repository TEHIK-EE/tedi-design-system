import { fireEvent, render } from '@testing-library/react';

import HideOnScroll from './hide-on-scroll';

import '@testing-library/jest-dom';

jest.mock('lodash-es/throttle', () => {
  const mockThrottledFunction = jest.fn((fn) => {
    const throttledFn = fn;
    throttledFn.cancel = jest.fn();
    return throttledFn;
  });
  return mockThrottledFunction;
});

describe('HideOnScroll component', () => {
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
      <HideOnScroll>
        <div>Test Content</div>
      </HideOnScroll>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <HideOnScroll className="custom-class">
        <div>Test Content</div>
      </HideOnScroll>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('wraps non-element children in a div', () => {
    const { container } = render(<HideOnScroll>Test Content</HideOnScroll>);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('hides component when scrolling down past scroll distance', () => {
    const { container } = render(
      <HideOnScroll scrollDistance={100}>
        <div>Test Content</div>
      </HideOnScroll>
    );

    scrollContainer.scrollTop = 0;
    scrollContainer.scrollTop = 150;

    fireEvent.scroll(window);
    jest.runAllTimers();
    expect(container.firstChild).toHaveClass('tedi-hide-on-scroll--hidden');
  });

  it('shows component when scrolling up', () => {
    const { container } = render(
      <HideOnScroll scrollDistance={100}>
        <div>Test Content</div>
      </HideOnScroll>
    );

    scrollContainer.scrollTop = 150;
    fireEvent.scroll(window);
    jest.runAllTimers();

    scrollContainer.scrollTop = 50;
    fireEvent.scroll(window);
    jest.runAllTimers();

    expect(container.firstChild).not.toHaveClass('tedi-hide-on-scroll--hidden');
  });
});
