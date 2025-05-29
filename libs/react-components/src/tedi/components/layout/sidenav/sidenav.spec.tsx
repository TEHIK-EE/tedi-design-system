import { fireEvent, render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { SideNavItemProps } from './components/sidenav-item/sidenav-item';
import { SideNavMobile } from './components/sidenav-mobile/sidenav-mobile';
import SidenavToggle from './components/sidenav-toggle/sidenav-toggle';
import { SideNav } from './sidenav';

jest.mock('./components/sidenav-mobile/sidenav-mobile');
jest.mock('./components/sidenav-item/sidenav-item');
jest.mock('./components/sidenav-toggle/sidenav-toggle');
jest.mock('../../../helpers');

const mockNavItems: SideNavItemProps[] = [
  { href: '#', children: 'Home', icon: 'home' },
  { href: '#', children: 'Clients', icon: 'account_box' },
  { href: '/', children: 'Children', icon: 'child_care', isActive: true },
  { href: '#', children: 'Some very long text that doest fit anything and wraps', icon: 'assignment' },
  { href: '#', children: 'Assignments', icon: 'assignment' },
  { href: '#', children: 'Assignment that is a long text', icon: 'assignment' },
  { href: '#', children: 'Assignments', icon: 'assignment' },
];

describe('SideNav', () => {
  const defaultProps = {
    ariaLabel: 'Test Navigation',
    linkAs: 'a' as const,
    showDividers: true,
    className: '',
    mobileBreakpoint: 'tablet' as const,
    showMobileOverlay: true,
    isMobileOpen: true,
    isCollapsed: false,
    onMenuToggle: jest.fn(),
    onCollapseToggle: jest.fn(),
    navItems: mockNavItems,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useBreakpoint as jest.Mock).mockReturnValue('lg'); // desktop
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);
  });

  test('should render successfully in desktop', () => {
    const { baseElement } = render(<SideNav ariaLabel="Menu" navItems={[]} />);
    expect(baseElement).toBeTruthy();
  });

  test('handles collapse toggle', () => {
    (SidenavToggle as jest.Mock).mockImplementation(({ toggleMenu }) => (
      <button onClick={() => toggleMenu()} data-testid="collapse-toggle">
        Toggle
      </button>
    ));

    render(<SideNav {...defaultProps} />);

    const toggleButton = screen.getByTestId('collapse-toggle');
    fireEvent.click(toggleButton);

    expect(defaultProps.onCollapseToggle).toHaveBeenCalledWith(true);
    expect(SidenavToggle).toHaveBeenCalled();
  });

  test('does not render nav when isMenuOpen is false (mobile)', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(<SideNav {...defaultProps} isMobileOpen={false} />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<SideNav {...defaultProps} className="custom-class" />);

    expect(screen.getByRole('navigation')).toHaveClass('custom-class');
  });

  test('shows dividers when showDividers is true', () => {
    render(<SideNav {...defaultProps} showDividers={true} />);

    expect(screen.getByRole('navigation')).toHaveClass('tedi-sidenav--has-dividers');
  });

  test('does not call onMenuToggle unnecessarily in controlled state', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(<SideNav {...defaultProps} isMobileOpen={false} />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(defaultProps.onMenuToggle).not.toHaveBeenCalled();
  });

  test('renders mobile view when below breakpoint', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('md');
    (isBreakpointBelow as jest.Mock).mockReturnValue(true);

    render(<SideNav {...defaultProps} mobileBreakpoint="mobile" isMobileOpen={true} />);

    expect(SideNavMobile).toHaveBeenCalledWith(
      expect.objectContaining({
        navItems: mockNavItems,
        ariaLabel: defaultProps.ariaLabel,
        isOpen: true,
      }),
      expect.anything()
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
