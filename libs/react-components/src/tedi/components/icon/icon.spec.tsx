import { render } from '@testing-library/react';

import { Icon } from './icon';

import '@testing-library/jest-dom';

describe('Icon component', () => {
  it('renders with default props', () => {
    const { container } = render(<Icon name="Add" />);
    const iconElement = container.querySelector('span[data-name="icon"]');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('notranslate');
    expect(iconElement).toHaveClass('material-symbols--outlined');
    expect(iconElement).toHaveClass('tedi-icon');
    expect(iconElement).toHaveClass('tedi-icon--size-24');
    expect(iconElement).toHaveClass('tedi-icon--block');
  });

  it('renders with custom size', () => {
    const { container } = render(<Icon name="Add" size={36} />);
    const iconElement = container.querySelector('span[data-name="icon"]');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon--size-36');
  });

  it('renders with custom type', () => {
    const { container } = render(<Icon name="Add" type="sharp" />);
    const iconElement = container.querySelector('span[data-name="icon"]');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('material-symbols--sharp');
  });

  it('renders with custom color', () => {
    const { container } = render(<Icon name="Add" color="success" />);
    const iconElement = container.querySelector('span[data-name="icon"]');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon--color-success');
  });

  it('renders with custom display', () => {
    const { container } = render(<Icon name="Add" display="inline" />);
    const iconElement = container.querySelector('span[data-name="icon"]');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon--inline');
  });

  it('renders filled variant', () => {
    const { container } = render(<Icon name="Add" filled />);
    const iconElement = container.querySelector('span[data-name="icon"]');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('tedi-icon--filled');
  });

  it('renders with background color', () => {
    const { container } = render(<Icon name="Add" background="primary" />);
    const wrapperElement = container.querySelector('div.tedi-icon--wrapper');
    const iconElement = container.querySelector('span[data-name="icon"]');

    expect(wrapperElement).toBeInTheDocument();
    expect(wrapperElement).toHaveClass('tedi-icon--bg');
    expect(wrapperElement).toHaveClass('tedi-icon--bg-primary');
    expect(iconElement).toBeInTheDocument();
  });

  it('renders with custom wrapper size', () => {
    const { container } = render(<Icon name="Add" size={48} background="secondary" />);
    const wrapperElement = container.querySelector('div.tedi-icon--wrapper');
    expect(wrapperElement).toHaveClass('tedi-icon--wrapper--size-48');
  });
});
