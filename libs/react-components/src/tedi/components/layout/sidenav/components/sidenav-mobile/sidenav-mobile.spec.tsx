import { fireEvent, render, screen } from '@testing-library/react';

import { SideNavMobile } from './sidenav-mobile';

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: () => ({
    getLabel: (key: string) => `label:${key}`,
  }),
}));

describe('SideNavMobile', () => {
  const baseProps = {
    ariaLabel: 'Main navigation',
    isOpen: true,
    onClose: jest.fn(),
  };

  const navItems = [
    {
      children: 'Home',
      href: '/home',
    },
    {
      children: 'Services',
      subItems: [
        {
          children: 'Consulting',
          href: '/services/consulting',
        },
        {
          children: 'Support',
          href: '/services/support',
        },
      ],
    },
  ];

  test('renders nothing if isOpen is false', () => {
    const { container } = render(<SideNavMobile {...baseProps} isOpen={false} navItems={navItems} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders top-level nav items', () => {
    render(<SideNavMobile {...baseProps} navItems={navItems} />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  test('calls onClose when clicking a leaf item', () => {
    render(<SideNavMobile {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Home'));
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  test('navigates into subItems when clicking a parent item', () => {
    render(<SideNavMobile {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Services'));
    expect(screen.getByText('Consulting')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  test('shows back buttons when in nested level', () => {
    render(<SideNavMobile {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Services'));
    expect(screen.getByText('label:sidenav.backToMainMenu')).toBeInTheDocument();
  });

  test('navigates back to root when clicking "Back to main menu"', () => {
    render(<SideNavMobile {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Services'));

    const backToMainButton = screen.getByText('label:sidenav.backToMainMenu');
    fireEvent.click(backToMainButton);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  test('calls onClose when clicking a nested leaf item', () => {
    render(<SideNavMobile {...baseProps} navItems={navItems} />);
    fireEvent.click(screen.getByText('Services'));
    fireEvent.click(screen.getByText('Consulting'));
    expect(baseProps.onClose).toHaveBeenCalled();
  });

  test('renders without overlay if showOverlay is false', () => {
    render(<SideNavMobile {...baseProps} navItems={navItems} showOverlay={false} />);
    expect(screen.queryByTestId('floating-overlay')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
