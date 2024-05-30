import { render } from '@testing-library/react';

import { Text } from './text';

import '@testing-library/jest-dom';

describe('Text Component', () => {
  it('renders text correctly with default props', () => {
    const { getByTestId } = render(<Text data-testid="text">Text test</Text>);
    const textElement = getByTestId('text');
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveTextContent('Text test');
  });

  it('renders text with custom element correctly', () => {
    const { getByTestId } = render(
      <Text element="div" data-testid="text">
        Text test
      </Text>
    );
    const textElement = getByTestId('text');
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('DIV');
    expect(textElement).toHaveTextContent('Text test');
  });

  it('renders text with custom modifiers correctly', () => {
    const { getByTestId } = render(
      <Text modifiers={['bold', 'italic']} data-testid="text">
        Text test
      </Text>
    );
    const textElement = getByTestId('text');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('text-bold');
    expect(textElement).toHaveClass('text-italic');
    expect(textElement).toHaveTextContent('Text test');
  });

  it('renders text with custom color correctly', () => {
    const { getByTestId } = render(
      <Text color="primary" data-testid="text">
        Text test
      </Text>
    );
    const textElement = getByTestId('text');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('tedi-text--primary');
    expect(textElement).toHaveTextContent('Text test');
  });
});
