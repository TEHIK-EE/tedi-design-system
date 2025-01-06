import { fireEvent, render } from '@testing-library/react';

import ScrollFade from './scroll-fade';

import '@testing-library/jest-dom';

jest.mock('lodash-es/throttle', () => {
  const mockThrottledFunction = jest.fn((fn) => {
    const throttledFn = fn;
    throttledFn.cancel = jest.fn();
    return throttledFn;
  });
  return mockThrottledFunction;
});

describe('ScrollFade component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<ScrollFade>Test Content</ScrollFade>);
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom class name', () => {
    const { container } = render(<ScrollFade className="custom-class">Test Content</ScrollFade>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should have custom scrollbar', () => {
    const { container } = render(<ScrollFade>Test Content</ScrollFade>);
    expect(container.firstChild).toHaveClass('tedi-scroll-fade--custom-scroll');
  });

  it('should not have custom scrollbar', () => {
    const { container } = render(<ScrollFade scrollBar="default">Test Content</ScrollFade>);
    expect(container.firstChild).not.toHaveClass('tedi-scroll-fade--custom-scroll');
  });

  it('should have fade top and bottom', () => {
    const { container } = render(<ScrollFade fadeSize={20}>Test Content</ScrollFade>);

    const innerDiv = container.querySelector('.tedi-scroll-fade__inner') as HTMLDivElement;
    Object.defineProperty(innerDiv, 'scrollTop', { value: 10, writable: true });
    Object.defineProperty(innerDiv, 'scrollHeight', { value: 400 });
    Object.defineProperty(innerDiv, 'clientHeight', { value: 200 });

    fireEvent.scroll(innerDiv);
    expect(container.firstChild).toHaveClass('tedi-scroll-fade--top-20 tedi-scroll-fade--bottom-20');
  });

  it('should not have fade top when scroll is at top', () => {
    const { container } = render(<ScrollFade fadeSize={20}>Test Content</ScrollFade>);

    const innerDiv = container.querySelector('.tedi-scroll-fade__inner') as HTMLDivElement;
    Object.defineProperty(innerDiv, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(innerDiv, 'scrollHeight', { value: 400 });
    Object.defineProperty(innerDiv, 'clientHeight', { value: 200 });

    fireEvent.scroll(innerDiv);
    expect(container.firstChild).not.toHaveClass('tedi-scroll-fade--top-20');
  });

  it('should not have fade bottom when scroll is at bottom', () => {
    const { container } = render(<ScrollFade fadeSize={20}>Test Content</ScrollFade>);

    const innerDiv = container.querySelector('.tedi-scroll-fade__inner') as HTMLDivElement;
    Object.defineProperty(innerDiv, 'scrollTop', { value: 200, writable: true });
    Object.defineProperty(innerDiv, 'scrollHeight', { value: 400 });
    Object.defineProperty(innerDiv, 'clientHeight', { value: 200 });

    fireEvent.scroll(innerDiv);
    expect(container.firstChild).not.toHaveClass('tedi-scroll-fade--bottom-20');
  });

  it('should not have fade top when fadePosition is bottom', () => {
    const { container } = render(
      <ScrollFade fadeSize={20} fadePosition="bottom">
        Test Content
      </ScrollFade>
    );

    const innerDiv = container.querySelector('.tedi-scroll-fade__inner') as HTMLDivElement;
    Object.defineProperty(innerDiv, 'scrollTop', { value: 10, writable: true });
    Object.defineProperty(innerDiv, 'scrollHeight', { value: 400 });
    Object.defineProperty(innerDiv, 'clientHeight', { value: 200 });

    fireEvent.scroll(innerDiv);
    expect(container.firstChild).not.toHaveClass('tedi-scroll-fade--top-20');
  });

  it('should not have fade bottom when fadePosition is top', () => {
    const { container } = render(
      <ScrollFade fadeSize={20} fadePosition="top">
        Test Content
      </ScrollFade>
    );

    const innerDiv = container.querySelector('.tedi-scroll-fade__inner') as HTMLDivElement;
    Object.defineProperty(innerDiv, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(innerDiv, 'scrollHeight', { value: 400 });
    Object.defineProperty(innerDiv, 'clientHeight', { value: 200 });

    fireEvent.scroll(innerDiv);
    expect(container.firstChild).not.toHaveClass('tedi-scroll-fade--bottom-20');
  });

  it('should call onScrollToTop when scrolled to top', () => {
    const onScrollToTop = jest.fn();

    const { container } = render(
      <ScrollFade fadeSize={20} onScrollToTop={() => onScrollToTop()}>
        Test Content
      </ScrollFade>
    );

    const innerDiv = container.querySelector('.tedi-scroll-fade__inner') as HTMLDivElement;
    Object.defineProperty(innerDiv, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(innerDiv, 'scrollHeight', { value: 400 });
    Object.defineProperty(innerDiv, 'clientHeight', { value: 200 });

    fireEvent.scroll(innerDiv);
    expect(onScrollToTop).toHaveBeenCalled();
  });

  it('should call onScrollToBottom when scrolled to bottom', () => {
    const onScrollToBottom = jest.fn();

    const { container } = render(
      <ScrollFade fadeSize={20} onScrollToTop={() => onScrollToBottom()}>
        Test Content
      </ScrollFade>
    );

    const innerDiv = container.querySelector('.tedi-scroll-fade__inner') as HTMLDivElement;
    Object.defineProperty(innerDiv, 'scrollTop', { value: 200, writable: true });
    Object.defineProperty(innerDiv, 'scrollHeight', { value: 400 });
    Object.defineProperty(innerDiv, 'clientHeight', { value: 200 });

    fireEvent.scroll(innerDiv);
    expect(onScrollToBottom).toHaveBeenCalled();
  });
});
