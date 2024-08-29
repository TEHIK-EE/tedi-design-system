import { render } from '@testing-library/react';

import { VerticalSpacingItem } from './vertical-spacing-item';

import '@testing-library/jest-dom';

describe('VerticalSpacingItem component', () => {
  it('renders with default props', () => {
    const { container } = render(
      <VerticalSpacingItem>
        <span>Item content</span>
      </VerticalSpacingItem>
    );

    const element = container.querySelector('[data-name="vertical-spacing-item"]');
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle('--vertical-spacing-internal: 1em');
  });

  it('renders with custom element and size', () => {
    const { container } = render(
      <VerticalSpacingItem element="article" size={3}>
        <span>Item content</span>
      </VerticalSpacingItem>
    );

    const element = container.querySelector('article[data-name="vertical-spacing-item"]');
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle('--vertical-spacing-internal: 3em');
  });

  it('applies custom class name correctly', () => {
    const { container } = render(
      <VerticalSpacingItem className="item-custom-class">
        <span>Item content</span>
      </VerticalSpacingItem>
    );

    const element = container.querySelector('[data-name="vertical-spacing-item"]');
    expect(element).toHaveClass('item-custom-class');
  });

  it('renders with zero size and no margin-bottom', () => {
    const { container } = render(
      <VerticalSpacingItem size={0}>
        <span>Item content</span>
      </VerticalSpacingItem>
    );

    const element = container.querySelector('[data-name="vertical-spacing-item"]');
    expect(element).toHaveStyle('--vertical-spacing-internal: 0');
  });

  it('renders children content correctly', () => {
    const { getByText } = render(
      <VerticalSpacingItem>
        <span>Item content</span>
      </VerticalSpacingItem>
    );

    expect(getByText('Item content')).toBeInTheDocument();
  });
});
