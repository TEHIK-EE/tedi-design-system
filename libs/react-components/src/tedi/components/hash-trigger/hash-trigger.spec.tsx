import { fireEvent, render, screen } from '@testing-library/react';

import HashTrigger from './hash-trigger';

import '@testing-library/jest-dom';

describe('HashTrigger Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children with the provided id ', () => {
    render(
      <HashTrigger id="test-id">
        <p>Test content</p>
      </HashTrigger>
    );

    const element = screen.getByText('Test content');
    expect(element).toHaveAttribute('id', 'test-id');
  });

  it('calls onMatch when hash changes', () => {
    const onMatchMock = jest.fn();

    render(
      <HashTrigger id="test-id" onMatch={onMatchMock}>
        <p>Test content</p>
      </HashTrigger>
    );

    window.location.hash = '#test-id';
    fireEvent(window, new HashChangeEvent('hashchange'));
    expect(onMatchMock).toHaveBeenCalledWith('test-id');
  });

  it('scrolls to element when hash matches', () => {
    const scrollIntoViewMock = jest.fn();
    const elementMock = document.createElement('div');
    elementMock.scrollIntoView = scrollIntoViewMock;
    jest.spyOn(document, 'getElementById').mockReturnValue(elementMock);

    jest.spyOn(elementMock, 'getBoundingClientRect').mockReturnValue({
      top: 1000,
      left: 0,
      bottom: 1200,
      right: 200,
      width: 200,
      height: 200,
      x: 0,
      y: 1000,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      toJSON: () => {},
    });

    render(
      <HashTrigger id="test-id">
        <div>Test Content</div>
      </HashTrigger>
    );

    window.location.hash = '#test-id';
    fireEvent(window, new HashChangeEvent('hashchange'));
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
  });
});
