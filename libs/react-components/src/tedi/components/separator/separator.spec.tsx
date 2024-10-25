import { render } from '@testing-library/react';

import Separator, { SeparatorProps } from './separator';
import styles from './separator.module.scss';

import '@testing-library/jest-dom';

describe('Separator Component', () => {
  const renderComponent = (props: SeparatorProps) => render(<Separator {...props} data-testid="separator" />);

  it('should render a div element by default', () => {
    const { getByTestId } = renderComponent({});
    expect(getByTestId('separator').tagName).toBe('DIV');
  });

  it('should render the specified element', () => {
    const { getByTestId } = renderComponent({ element: 'hr' });
    expect(getByTestId('separator').tagName).toBe('HR');
  });

  it('should apply default classes', () => {
    const { getByTestId } = renderComponent({});
    const separator = getByTestId('separator');
    expect(separator).toHaveClass(styles.separator);
    expect(separator).toHaveClass(styles['separator--thickness-1']);
    expect(separator).toHaveClass(styles['separator--horizontal']);
  });

  it('should apply additional classes from className prop', () => {
    const { getByTestId } = renderComponent({ className: 'custom-class' });
    expect(getByTestId('separator')).toHaveClass('custom-class');
  });

  it('should apply correct spacing class', () => {
    const { getByTestId } = renderComponent({ spacing: 1.25 });
    expect(getByTestId('separator')).toHaveClass(styles['separator--spacing-1-25']);
  });

  it('should apply correct top and bottom spacing classes', () => {
    const { getByTestId } = renderComponent({ topSpacing: 0.5, bottomSpacing: 1 });
    expect(getByTestId('separator')).toHaveClass(styles['separator--top-0-5']);
    expect(getByTestId('separator')).toHaveClass(styles['separator--bottom-1']);
  });

  it('should apply axis specific class', () => {
    const { getByTestId } = renderComponent({ axis: 'vertical' });
    expect(getByTestId('separator')).toHaveClass(styles['separator--vertical']);
  });

  it('should apply color class', () => {
    const { getByTestId } = renderComponent({ color: 'accent' });
    expect(getByTestId('separator')).toHaveClass(styles['separator--accent']);
  });

  it('should apply variant class', () => {
    const { getByTestId } = renderComponent({ variant: 'dotted' });
    expect(getByTestId('separator')).toHaveClass(styles['separator--dotted']);
  });

  it('should apply thickness class when no variant is used', () => {
    const { getByTestId } = renderComponent({ thickness: 2 });
    expect(getByTestId('separator')).toHaveClass(styles['separator--thickness-2']);
  });

  it('should not apply thickness class when variant is used', () => {
    const { getByTestId } = renderComponent({ variant: 'dotted', thickness: 2 });
    expect(getByTestId('separator')).not.toHaveClass(styles['separator--thickness-2']);
  });

  it('should apply isStretched class', () => {
    const { getByTestId } = renderComponent({ isStretched: true });
    expect(getByTestId('separator')).toHaveClass(styles['separator--is-stretched']);
  });

  it('should set height CSS variable for vertical separator', () => {
    const { getByTestId } = renderComponent({ axis: 'vertical', height: 2 });
    expect(getByTestId('separator')).toHaveStyle(`--vertical-separator-height: 2rem`);
  });
});
