import { render } from '@testing-library/react';

import { useBreakpointProps } from '../../../../helpers';
import SkeletonBlock, { SkeletonBlockProps } from './skeleton-block';

import '@testing-library/jest-dom';

jest.mock('../../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('SkeletonBlock Component', () => {
  const mockGetCurrentBreakpointProps = jest.fn();

  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: mockGetCurrentBreakpointProps,
    });
  });

  const renderSkeletonBlock = (props: Partial<SkeletonBlockProps> = {}) => {
    return render(<SkeletonBlock {...props} />);
  };

  test('renders with default width of 100%', () => {
    mockGetCurrentBreakpointProps.mockReturnValue({ width: 100, height: 'p' });
    const { container } = renderSkeletonBlock();
    expect(container.firstChild).toHaveStyle({ width: '100%' });
  });

  test('renders with custom width as percentage', () => {
    mockGetCurrentBreakpointProps.mockReturnValue({ width: 50, height: 'p' });
    const { container } = renderSkeletonBlock();
    expect(container.firstChild).toHaveStyle({ width: '50%' });
  });

  test('renders with width set to "auto"', () => {
    mockGetCurrentBreakpointProps.mockReturnValue({ width: 'auto', height: 'p' });
    const { container } = renderSkeletonBlock();
    expect(container.firstChild).toHaveStyle({ width: 'auto' });
  });

  test('renders with custom numeric width in pixels', () => {
    mockGetCurrentBreakpointProps.mockReturnValue({ width: '200px', height: 'p' });
    const { container } = renderSkeletonBlock();
    expect(container.firstChild).toHaveStyle({ width: '200px' });
  });

  test('renders with height based on paragraph ("p") by default', () => {
    mockGetCurrentBreakpointProps.mockReturnValue({ width: 100, height: 'p' });
    const { container } = renderSkeletonBlock();
    expect(container.firstChild).toHaveClass('tedi-skeleton-block--p');
  });

  test('renders with custom height class for heading tags', () => {
    mockGetCurrentBreakpointProps.mockReturnValue({ width: 100, height: 'h3' });
    const { container } = renderSkeletonBlock();
    expect(container.firstChild).toHaveClass('tedi-skeleton-block--h3');
  });

  test('renders with custom numeric height', () => {
    mockGetCurrentBreakpointProps.mockReturnValue({ width: 100, height: 200 });
    const { container } = renderSkeletonBlock();
    expect(container.firstChild).toHaveStyle({ height: '200px' });
  });

  test('applies custom className', () => {
    const customClass = 'custom-skeleton-block';
    mockGetCurrentBreakpointProps.mockReturnValue({ width: 100, height: 'p', className: customClass });
    const { container } = renderSkeletonBlock({ className: customClass });
    expect(container.firstChild).toHaveClass(customClass);
  });

  test('applies custom styles', () => {
    const customStyles = { backgroundColor: 'red' };
    mockGetCurrentBreakpointProps.mockReturnValue({ width: 100, height: 'p', style: customStyles });
    const { container } = renderSkeletonBlock({ style: customStyles });
    expect(container.firstChild).toHaveStyle(customStyles);
  });
});
