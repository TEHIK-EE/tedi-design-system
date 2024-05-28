import { render } from '@testing-library/react';

import { Icon } from './icon';

import '@testing-library/jest-dom';

describe('Icon component', () => {
  it('renders with custom size', () => {
    const { container } = render(<Icon name="home" size={36} />);
    const iconElement = container.querySelector('.tedi-icon--wrapper span[data-name="icon"]') || {};
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon--size-36');
  });

  it('renders with custom type', () => {
    const { container } = render(<Icon name="home" type="sharp" />);
    const iconElement = container.querySelector('.tedi-icon--wrapper span[data-name="icon"]') || {};
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('material-symbols-sharp');
  });

  it('renders with custom color', () => {
    const { container } = render(<Icon name="home" color="success" />);
    const iconElement = container.querySelector('.tedi-icon--wrapper span[data-name="icon"]') || {};
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon--color-success');
  });

  it('renders with custom display', () => {
    const { container } = render(<Icon name="home" display="inline" />);
    const iconElement = container.querySelector('.tedi-icon--wrapper span[data-name="icon"]') || {};
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon--inline');
  });

  it('renders filled variant', () => {
    const { container } = render(<Icon name="home" filled />);
    const iconElement = container.querySelector('.tedi-icon--wrapper span[data-name="icon"]') || {};
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon--filled');
  });

  it('applies the specified background', () => {
    const { container } = render(<Icon name="home" background="distinctive-primary" />);
    const iconElement = container.querySelector('.tedi-icon--wrapper') || {};
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveStyle(`background-color: #yourExpectedColor;`);
  });
});
