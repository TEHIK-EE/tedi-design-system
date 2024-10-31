import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
    expect(screen.getByText(/truncate.see-more/i)).toBeDefined();
  });

  it('should not render button when text is shorter or equal than max-length', () => {
    const children = generateString(199);
    render(<Truncate>{children}</Truncate>);
    const buttonMore = screen.queryByText(/truncate.see-more/i);
    const buttonLess = screen.queryByText(/truncate.see-less/i);
    expect(buttonMore).toBeNull();
    expect(buttonLess).toBeNull();
  });

  it('should call button onClick when passed', async () => {
    const children = generateString(220);
    const onClick = jest.fn();

    render(<Truncate button={{ onClick }}>{children}</Truncate>);
    await act(async () => {
      await userEvent.click(screen.getByText(/truncate.see-more/i));
    });
    expect(onClick).toBeCalledTimes(1);
  });

  it('should call onOpen & onClose when buttons are clicked', async () => {
    const children = generateString(220);
    const onOpen = jest.fn();
    const onClose = jest.fn();
    render(
      <Truncate onOpen={onOpen} onClose={onClose}>
        {children}
      </Truncate>
    );
    await act(async () => {
      await userEvent.click(screen.getByText(/truncate.see-more/i));
    });
    expect(onOpen).toBeCalledTimes(1);
    await act(async () => {
      await userEvent.click(screen.getByText(/truncate.see-less/i));
    });
    expect(onClose).toBeCalledTimes(1);
  });
});
