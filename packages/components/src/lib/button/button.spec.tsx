import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button, { ButtonProps } from './button';

const getComponent = (props?: Partial<ButtonProps>) => {
  return <Button text="Click me" {...props} />;
};

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(getComponent());
    expect(baseElement).toBeTruthy();
  });

  it('should call onClick', () => {
    const onClick = jest.fn();
    render(getComponent({ onClick }));

    userEvent.click(screen.getByText('Click me'));
    expect(onClick).toBeCalledTimes(1);
  });
});
