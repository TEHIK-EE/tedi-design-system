import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpoint } from '../../../helpers';
import { SideNavItem } from './components/sidenav-item/sidenav-item';
import { SideNavMobile } from './components/sidenav-mobile/sidenav-mobile';
import SidenavToggle from './components/sidenav-toggle/sidenav-toggle';
import { SideNav } from './sidenav';

jest.mock('./components/sidenav-mobile/sidenav-mobile');
jest.mock('./components/sidenav-item/sidenav-item');
jest.mock('./components/sidenav-toggle/sidenav-toggle');
jest.mock('../../../helpers');

(useBreakpoint as jest.Mock).mockReturnValue('lg');

const mockNavItems: SideNavItem[] = [
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
    hideSubItemIcons: false,
    className: '',
    mobileBreakpoint: 'tablet' as 'tablet' | 'mobile',
    showMobileOverlay: true,
    useOverlay: false,
    isOpen: true,
    isCollapsed: false,
    onMenuToggle: jest.fn(),
    onCollapseToggle: jest.fn(),
    navItems: mockNavItems,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render successfully', () => {
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

  test('renders with overlay when useOverlay is true', () => {
    render(<SideNav {...defaultProps} useOverlay={true} />);
    expect(document.querySelector('.tedi-sidenav__overlay')).toBeInTheDocument();
  });

  test('handles conditional rendering based on isOpen', () => {
    render(<SideNav {...defaultProps} isOpen={false} />);

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

  test('hides subitem icons when hideSubItemIcons is true', () => {
    render(<SideNav {...defaultProps} hideSubItemIcons={true} />);

    expect(screen.getByRole('navigation')).toHaveClass('tedi-sidenav--hide-subitem-icons');
  });

  test('maintains controlled state', () => {
    render(<SideNav {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(defaultProps.onMenuToggle).not.toHaveBeenCalled();
  });

  test('renders mobile view when below breakpoint', () => {
    const { isBreakpointBelow } = jest.requireMock('../../../helpers');
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    isBreakpointBelow.mockReturnValue(true);

    render(<SideNav {...defaultProps} mobileBreakpoint="tablet" />);

    expect(SideNavMobile).toHaveBeenCalled();
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
