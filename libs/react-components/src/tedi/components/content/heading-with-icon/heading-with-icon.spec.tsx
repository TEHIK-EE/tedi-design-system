import { render } from '@testing-library/react';

import HeadingWithIcon from './heading-with-icon';

import '@testing-library/jest-dom';

describe('HeadingWithIcon', () => {
  it('renders children and icon correctly', () => {
    const { container } = render(<HeadingWithIcon name="home">Child content</HeadingWithIcon>);

    const iconElement = container.querySelector('.tedi-heading-with-icon .tedi-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon--color-primary');

    const headingElement = container.querySelector('h4.tedi-heading-with-icon');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('Child content');
  });

  it('renders the correct heading element based on the element prop', () => {
    const { container } = render(
      <HeadingWithIcon name="home" element="h2">
        Child content
      </HeadingWithIcon>
    );

    const headingElement = container.querySelector('h2.tedi-heading-with-icon');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('Child content');
  });

  it('applies the correct heading color and icon color', () => {
    const { container } = render(
      <HeadingWithIcon name="home" headingColor="secondary" iconColor="tertiary">
        Child content
      </HeadingWithIcon>
    );

    const headingElement = container.querySelector('.tedi-heading-with-icon');
    expect(headingElement).toHaveClass('tedi-heading-with-icon tedi-text--secondary');

    const iconElement = container.querySelector('.tedi-icon');
    expect(iconElement).toHaveClass('tedi-icon--color-tertiary');
  });
});
