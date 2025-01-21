import { render } from '@testing-library/react';

import { useBreakpointProps } from '../../helpers';
import Separator, { SeparatorProps } from './separator';
import styles from './separator.module.scss';

import '@testing-library/jest-dom';

jest.mock('../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('Separator Component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

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
    expect(separator).toHaveClass(styles['tedi-separator']);
    expect(separator).toHaveClass(styles['tedi-separator--thickness-1']);
    expect(separator).toHaveClass(styles['tedi-separator--horizontal']);
  });

  it('should apply additional classes from className prop', () => {
    const { getByTestId } = renderComponent({ className: 'custom-class' });
    expect(getByTestId('separator')).toHaveClass('custom-class');
  });

  it('should apply correct spacing class', () => {
    const { getByTestId } = renderComponent({ spacing: 1.25 });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--spacing-1-25']);
  });

  it('should apply correct top and bottom spacing classes', () => {
    const { getByTestId } = renderComponent({ topSpacing: 0.5, bottomSpacing: 1 });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--top-0-5']);
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--bottom-1']);
  });

  it('should apply axis specific class', () => {
    const { getByTestId } = renderComponent({ axis: 'vertical' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--vertical']);
  });

  it('should apply color class', () => {
    const { getByTestId } = renderComponent({ color: 'accent' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--accent']);
  });

  it('should apply variant class', () => {
    const { getByTestId } = renderComponent({ variant: 'dotted' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--dotted']);
  });

  it('should apply thickness class when no variant is used', () => {
    const { getByTestId } = renderComponent({ thickness: 2 });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--thickness-2']);
  });

  it('should not apply thickness class when variant is used', () => {
    const { getByTestId } = renderComponent({ variant: 'dotted', thickness: 2 });
    expect(getByTestId('separator')).not.toHaveClass(styles['tedi-separator--thickness-2']);
  });

  it('should apply isStretched class', () => {
    const { getByTestId } = renderComponent({ isStretched: true });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--is-stretched']);
  });

  it('should set height CSS variable for vertical separator', () => {
    const { getByTestId } = renderComponent({ axis: 'vertical', height: 2 });
    expect(getByTestId('separator')).toHaveStyle('--vertical-separator-height: 2rem');
  });

  it('should apply dot-only variant class', () => {
    const { getByTestId } = renderComponent({ variant: 'dot-only' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--dot-only']);
  });

  it('should apply correct dot size class when variant is dot-only and dotSize is extra small', () => {
    const { getByTestId } = renderComponent({ variant: 'dot-only', dotSize: 'extra-small' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--dot-only-extra-small']);
  });

  it('should apply correct dot size class when variant is dot-only and dotSize is small', () => {
    const { getByTestId } = renderComponent({ variant: 'dot-only', dotSize: 'small' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--dot-only-small']);
  });

  it('should apply correct dot size class when variant is dot-only and dotSize is medium', () => {
    const { getByTestId } = renderComponent({ variant: 'dot-only', dotSize: 'medium' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--dot-only-medium']);
  });

  it('should apply correct dot size class when variant is dot-only and dotSize is large', () => {
    const { getByTestId } = renderComponent({ variant: 'dot-only', dotSize: 'large' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--dot-only-large']);
  });

  it('should not apply dot size class when variant is not dot-only', () => {
    const { getByTestId } = renderComponent({ variant: 'dotted', dotSize: 'large' });
    expect(getByTestId('separator')).not.toHaveClass(styles['tedi-separator--dot-only-large']);
  });

  it('should default vertical separator display to block', () => {
    const { getByTestId } = renderComponent({ axis: 'vertical' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--block']);
  });

  it('should apply inline display class to vertical separator when specified', () => {
    const { getByTestId } = renderComponent({ axis: 'vertical', display: 'inline' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--inline']);
  });

  it('should not apply inline display class to horizontal separator', () => {
    const { getByTestId } = renderComponent({ axis: 'horizontal', display: 'block' });
    expect(getByTestId('separator')).not.toHaveClass(styles['tedi-separator--inline']);
  });
});
