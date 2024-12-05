import { render, screen } from '@testing-library/react';
import React from 'react';

import { InfoButton } from './info-button';

import '@testing-library/jest-dom';

describe('InfoButton Component', () => {
  it('renders child elements correctly', () => {
    render(
      <InfoButton>
        <div data-testid="child">Test content</div>
      </InfoButton>
    );
    const childElement = screen.getByTestId('child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test content');
  });

  it('applies custom className correctly', () => {
    const { container } = render(<InfoButton className="custom-class">Info</InfoButton>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders with the correct default icon size', () => {
    const { container } = render(<InfoButton>Info</InfoButton>);
    const icon = container.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('tedi-icon--size-18');
  });

  it('renders with the smaller icon when isSmall is true', () => {
    const { container } = render(<InfoButton isSmall>Info</InfoButton>);
    const icon = container.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('tedi-icon--size-16');
  });

  it('passes ref correctly to Button component', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<InfoButton ref={ref}>Info</InfoButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders children correctly within the Button component', () => {
    render(<InfoButton>Click me!</InfoButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me!');
  });

  it('applies default button props correctly', () => {
    const { container } = render(<InfoButton>Default Button</InfoButton>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-name', 'info-button');
  });

  it('can receive custom props like title and id', () => {
    render(
      <InfoButton title="Info button" id="info-button-id">
        Info
      </InfoButton>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Info button');
    expect(button).toHaveAttribute('id', 'info-button-id');
  });
});
