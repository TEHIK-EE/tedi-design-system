import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button, { ButtonProps } from './button';

const getComponent = (props?: Partial<ButtonProps>) => {
  return <Button {...props}>Click me</Button>;
};

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(getComponent());
    expect(baseElement).toBeTruthy();
  });

  it('should call onClick', async () => {
    const onClick = jest.fn();
    render(getComponent({ onClick }));

    await act(async () => {
      await userEvent.click(screen.getByText('Click me'));
    });
    expect(onClick).toBeCalledTimes(1);
  });
});
