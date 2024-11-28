import { render } from '@testing-library/react';

import { useLabels } from '../../../tedi/providers/label-provider';
import { useDeclareLoader } from '../../providers/accessibility-provider/use-declare-loader';
import Skeleton, { SkeletonProps } from './skeleton';

import '@testing-library/jest-dom';

jest.mock('../../../tedi/providers/label-provider', () => ({
  useLabels: jest.fn(),
}));

jest.mock('../../providers/accessibility-provider/use-declare-loader', () => ({
  useDeclareLoader: jest.fn(),
}));

describe('Skeleton Component', () => {
  const mockGetLabel = jest.fn();

  beforeEach(() => {
    (useLabels as jest.Mock).mockReturnValue({
      getLabel: mockGetLabel,
    });
    mockGetLabel.mockImplementation((key: string) => (key === 'skeleton.loading' ? 'Loading...' : 'Loading complete'));
  });

  const renderSkeleton = (props: Partial<SkeletonProps> = {}) => {
    return render(<Skeleton {...props}>Loading Content</Skeleton>);
  };

  test('renders with default accessibility label', () => {
    const { getByText } = renderSkeleton();
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('renders with a custom accessibility label', () => {
    const { getByText } = renderSkeleton({ label: 'Custom Loading Label' });
    expect(getByText('Custom Loading Label')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const customClass = 'custom-skeleton';
    const { container } = renderSkeleton({ className: customClass });
    expect(container.firstChild).toHaveClass(customClass);
  });

  test('applies default label and calls useDeclareLoader with the correct arguments', () => {
    renderSkeleton();
    expect(useDeclareLoader).toHaveBeenCalledWith('Loading...', 'Loading complete', 1000);
  });

  test('calls useDeclareLoader with custom label and completedLabel', () => {
    renderSkeleton({
      label: 'Custom Loading',
      completedLabel: 'Custom Loading Complete',
      labelDelay: 2000,
    });
    expect(useDeclareLoader).toHaveBeenCalledWith('Custom Loading', 'Custom Loading Complete', 2000);
  });

  test('renders children content', () => {
    const { getByText } = renderSkeleton();
    expect(getByText('Loading Content')).toBeInTheDocument();
  });

  test('applies "sr-only" class to the accessibility label', () => {
    const { container } = renderSkeleton();
    const srOnlySpan = container.querySelector('span.sr-only');
    expect(srOnlySpan).toBeInTheDocument();
  });
});
