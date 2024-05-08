import { render } from '@testing-library/react';

import Icon from './icon';

import '@testing-library/jest-dom';

describe('Icon component', () => {
  it('renders with default props', () => {
    const { container } = render(<Icon name="Add" />);
    const iconElement = container.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('notranslate');
    expect(iconElement).toHaveStyle({ fontSize: '1.5rem' });
  });

  it('renders with custom size', () => {
    const { container } = render(<Icon name="Add" size={36} />);
    const iconElement = container.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveStyle({ fontSize: '2.25rem' });
  });

  it('renders with custom type', () => {
    const { container } = render(<Icon name="Add" type="sharp" />);
    const iconElement = container.querySelector('svg');
    expect(iconElement).toHaveClass('notranslate');
    expect(iconElement).toHaveClass('tedi-icon--block');
  });

  it('renders with custom color', () => {
    const { container } = render(<Icon name="Add" color="success" />);
    const iconElement = container.querySelector('svg');
    expect(iconElement).toHaveStyle('color: var(--icon-success)');
  });

  it('renders with custom display', () => {
    const { container } = render(<Icon name="Add" display="inline" />);
    const iconElement = container.querySelector('svg');
    expect(iconElement).toHaveClass('tedi-icon--inline');
  });

  it('renders with label for screen readers', () => {
    const { container } = render(<Icon name="Add" label="Add icon" />);
    const iconElement = container.querySelector('svg');
    expect(iconElement).toHaveAttribute('aria-label', 'Add icon');
  });

  it('renders filled variant', () => {
    const { container } = render(<Icon name="Add" type="filled" />);
    const iconElement = container.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
  });
});
