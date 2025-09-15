/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, waitFor } from '@testing-library/react';

import { AccessibilityContext } from '../../../providers/accessibility-provider/accessibility-provider';
import { useDeclareLoader } from '../../../providers/accessibility-provider/use-declare-loader';
import { useLabels } from '../../../providers/label-provider';
import Skeleton, { SkeletonProps } from './skeleton';

import '@testing-library/jest-dom';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(),
}));

jest.mock('../../../providers/accessibility-provider/use-declare-loader', () => ({
  useDeclareLoader: jest.fn(),
}));

describe('Skeleton Component', () => {
  const mockGetLabel = jest.fn();
  const mockAddLoader = jest.fn();
  const mockRemoveLoader = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLabels as jest.Mock).mockReturnValue({
      getLabel: mockGetLabel,
    });
    mockGetLabel.mockImplementation((key: string) => (key === 'skeleton.loading' ? 'Loading...' : 'Loading complete'));
    (useDeclareLoader as jest.Mock).mockImplementation((mountLabel, unmountLabel) => {
      mockAddLoader({ id: 'mock-id', mountLabel, unmountLabel });
    });
  });

  const renderSkeleton = (
    props: Partial<SkeletonProps> = {},
    contextValue: any = { addLoader: mockAddLoader, removeLoader: mockRemoveLoader }
  ) => {
    return render(
      <AccessibilityContext.Provider value={contextValue}>
        <Skeleton {...props}>Loading Content</Skeleton>
      </AccessibilityContext.Provider>
    );
  };

  test('renders with default accessibility label in fallback mode (no context)', async () => {
    const { getByText } = renderSkeleton({}, null);
    await waitFor(() => expect(getByText('Loading...')).toBeInTheDocument(), { timeout: 300 });
  });

  test('renders with a custom accessibility label in fallback mode (no context)', async () => {
    const { getByText } = renderSkeleton({ label: 'Custom Loading Label' }, null);
    await waitFor(() => expect(getByText('Custom Loading Label')).toBeInTheDocument(), { timeout: 300 });
  });

  test('applies custom className', () => {
    const customClass = 'custom-skeleton';
    const { container } = renderSkeleton({ className: customClass });
    expect(container.firstChild).toHaveClass(customClass);
  });

  test('applies default label and calls useDeclareLoader with the correct arguments', () => {
    renderSkeleton();
    expect(useDeclareLoader).toHaveBeenCalledWith('Loading...', 'Loading complete', 200);
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

  test('applies "sr-only" class to the accessibility label in fallback mode (no context)', async () => {
    const { container } = renderSkeleton({}, null);
    await waitFor(
      () => {
        const srOnlySpan = container.querySelector('span.sr-only');
        expect(srOnlySpan).toBeInTheDocument();
      },
      { timeout: 300 }
    );
  });

  test('does not render "sr-only" span when AccessibilityContext is present', () => {
    const { container } = renderSkeleton();
    const srOnlySpan = container.querySelector('span.sr-only');
    expect(srOnlySpan).not.toBeInTheDocument();
  });
});
