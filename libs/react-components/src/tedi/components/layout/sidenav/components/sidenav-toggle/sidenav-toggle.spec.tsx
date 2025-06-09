import { fireEvent, render, screen } from '@testing-library/react';
import { UnknownType } from 'libs/react-components/src/tedi/types/commonTypes';

import SidenavToggle from './sidenav-toggle';

jest.mock('../../../../../../tedi/providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: jest.fn((key: string) => {
      if (key === 'header.toggle') return 'Toggle Menu';
      return '';
    }),
  }),
}));

describe('SidenavToggle', () => {
  const defaultProps = {
    menuOpen: false,
    toggleMenu: jest.fn(),
    referenceRef: undefined,
    getReferenceProps: () => ({}),
    variant: 'mobile' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    render(<SidenavToggle {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(defaultProps.toggleMenu).not.toHaveBeenCalled();
  });

  test('calls toggleMenu when clicked', () => {
    render(<SidenavToggle {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(defaultProps.toggleMenu).toHaveBeenCalled();
  });

  test('renders correct variant styles', () => {
    const { rerender } = render(<SidenavToggle {...defaultProps} variant="collapse" menuOpen={true} />);

    let button = screen.getByRole('button');
    expect(button.querySelector('span[data-name="icon"]')).toBeInTheDocument();

    rerender(<SidenavToggle {...defaultProps} variant="mobile" menuOpen={true} />);
    button = screen.getByRole('button');
    expect(button.querySelector('span[data-name="icon"]')).toBeInTheDocument();
  });

  test('applies referenceRef correctly', () => {
    const ref = jest.fn();
    render(<SidenavToggle {...defaultProps} referenceRef={ref as UnknownType} />);

    expect(ref).toHaveBeenCalled();
  });

  test('uses getReferenceProps', () => {
    const mockGetRefProps = jest.fn(() => ({ 'data-testid': 'custom-prop' }));
    render(<SidenavToggle {...defaultProps} getReferenceProps={mockGetRefProps} />);

    expect(mockGetRefProps).toHaveBeenCalled();
    expect(screen.getByTestId('custom-prop')).toBeInTheDocument();
  });
});
