import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Button from '../button/button';
import { ButtonGroup } from './button-group';

describe('ButtonGroup Component', () => {
  it('renders child buttons correctly', () => {
    render(
      <ButtonGroup>
        <Button id="button1">Button 1</Button>
        <Button id="button2">Button 2</Button>
      </ButtonGroup>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Button 1');
    expect(buttons[1]).toHaveTextContent('Button 2');
  });

  it('applies the stretch class when the stretch prop is true', () => {
    const { container } = render(
      <ButtonGroup stretch>
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('tedi-button-group--stretch');
  });

  it('does not apply the stretch class when the stretch prop is false', () => {
    const { container } = render(
      <ButtonGroup stretch={false}>
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).not.toHaveClass('tedi-button-group--stretch');
  });

  it('triggers onSelectionChange when a button is clicked', () => {
    const onSelectionChange = jest.fn();
    render(
      <ButtonGroup onSelectionChange={onSelectionChange}>
        <Button id="button1">Button 1</Button>
        <Button id="button2">Button 2</Button>
      </ButtonGroup>
    );
    const button1 = screen.getByText('Button 1');
    fireEvent.click(button1);
    expect(onSelectionChange).toHaveBeenCalledWith('button1');
  });

  it('does not trigger onSelectionChange for a disabled button', () => {
    const onSelectionChange = jest.fn();
    render(
      <ButtonGroup onSelectionChange={onSelectionChange}>
        <Button id="button1" disabled>
          Button 1
        </Button>
        <Button id="button2">Button 2</Button>
      </ButtonGroup>
    );
    const button1 = screen.getByText('Button 1');
    fireEvent.click(button1);
    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('applies custom className correctly', () => {
    const { container } = render(
      <ButtonGroup className="custom-class">
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with the correct type class based on the type prop', () => {
    const { container } = render(
      <ButtonGroup type="secondary">
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('tedi-button-group--secondary');
  });

  it('renders with the correct aria-label when provided', () => {
    render(
      <ButtonGroup ariaLabel="Test Button Group">
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-label', 'Test Button Group');
  });

  it('renders active class on a button when isActive is true', () => {
    const { container } = render(
      <ButtonGroup>
        <Button id="button1" isActive>
          Button 1
        </Button>
        <Button id="button2">Button 2</Button>
      </ButtonGroup>
    );
    const activeButton = container.querySelector('.tedi-button-group__item--active');
    expect(activeButton).toBeInTheDocument();
    expect(activeButton).toHaveTextContent('Button 1');
  });

  it('updates state correctly when a button is clicked', () => {
    const TestComponent = () => {
      const [selected, setSelected] = React.useState<string | null>(null);

      return (
        <ButtonGroup onSelectionChange={setSelected}>
          <Button id="button1" data-testid="button1" isActive={selected === 'button1'}>
            Button 1
          </Button>
          <Button id="button2" data-testid="button2" isActive={selected === 'button2'}>
            Button 2
          </Button>
        </ButtonGroup>
      );
    };

    render(<TestComponent />);

    const button1 = screen.getByTestId('button1');
    const button2 = screen.getByTestId('button2');

    fireEvent.click(button1);
    expect(button1).toHaveClass('tedi-button-group__item--active');
    expect(button2).not.toHaveClass('tedi-button-group__item--active');

    fireEvent.click(button2);
    expect(button2).toHaveClass('tedi-button-group__item--active');
    expect(button1).not.toHaveClass('tedi-button-group__item--active');
  });
});
