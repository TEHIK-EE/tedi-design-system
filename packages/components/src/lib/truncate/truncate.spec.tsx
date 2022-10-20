import { fireEvent, render, screen } from '@testing-library/react';

import Truncate from './truncate';

const generateString = (length: number): string => {
  return new Array(length + 1).join('t');
};

describe('Truncate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Truncate>Some text</Truncate>);
    expect(baseElement).toBeTruthy();
  });

  it('should render show more button when text is longer than max-length', () => {
    const children = generateString(220);
    render(<Truncate>{children}</Truncate>);
    expect(screen.getByRole('button', { name: /Näita rohkem/i })).toBeDefined();
  });

  it('should not render button when text is shorter or equal than max-length', () => {
    const children = generateString(199);
    render(<Truncate>{children}</Truncate>);
    const buttonMore = screen.queryByText('Näita rohkem');
    const buttonLess = screen.queryByText('Näita vähem');
    expect(buttonMore).toBeNull();
    expect(buttonLess).toBeNull();
  });

  it('should call button onClick when passed', () => {
    const children = generateString(220);
    const onClick = jest.fn();

    render(<Truncate button={{ onClick }}>{children}</Truncate>);
    fireEvent.click(screen.getByRole('button', { name: /Näita rohkem/i }));
    expect(onClick).toBeCalledTimes(1);
  });

  it('should call onOpen & onClose when buttons are clicked', () => {
    const children = generateString(220);
    const onOpen = jest.fn();
    const onClose = jest.fn();
    render(
      <Truncate onOpen={onOpen} onClose={onClose}>
        {children}
      </Truncate>
    );
    fireEvent.click(screen.getByRole('button', { name: /Näita rohkem/i }));
    expect(onOpen).toBeCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: /Näita vähem/i }));
    expect(onClose).toBeCalledTimes(1);
  });
});
