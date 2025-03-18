import { render } from '@testing-library/react';

import Section, { SectionProps } from './section';

import '@testing-library/jest-dom';

describe('Section Component', () => {
  const renderSection = (props: Partial<SectionProps> = {}) => {
    return render(
      <Section {...props}>
        <p>Section content</p>
      </Section>
    );
  };

  test('renders with default element (section)', () => {
    const { container } = renderSection();
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  test('renders with custom element (article)', () => {
    const { container } = renderSection({ as: 'article' });
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  test('renders with custom role', () => {
    const role = 'complementary';
    const { getByRole } = renderSection({ role });
    expect(getByRole(role)).toBeInTheDocument();
  });

  test('renders with custom id', () => {
    const id = 'custom-section';
    const { container } = renderSection({ id });
    expect(container.querySelector(`#${id}`)).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = renderSection({ className: customClass });
    expect(container.firstChild).toHaveClass(customClass);
  });

  test('renders children content', () => {
    const { getByText } = renderSection();
    expect(getByText('Section content')).toBeInTheDocument();
  });

  test('applies multiple props together', () => {
    const id = 'combined-section';
    const role = 'region';
    const customClass = 'combined-class';
    const { container } = renderSection({ id, role, className: customClass, as: 'aside' });

    const sectionElement = container.querySelector(`#${id}`);
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveAttribute('role', role);
    expect(sectionElement).toHaveClass(customClass);
    expect(sectionElement?.tagName.toLowerCase()).toBe('aside');
  });
});
