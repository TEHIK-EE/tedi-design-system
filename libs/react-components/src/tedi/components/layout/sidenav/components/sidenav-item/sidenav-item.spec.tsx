import { fireEvent, render, screen } from '@testing-library/react';

import { SideNavItem } from './sidenav-item';

describe('SideNavItem', () => {
  const defaultProps = {
    children: 'Test Item',
    icon: 'test-icon',
    level: 1,
    isCollapsed: false,
    isDefaultOpen: false,
    onItemClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders basic item with children', () => {
    render(<SideNavItem {...defaultProps}>{defaultProps.children}</SideNavItem>);

    expect(screen.getByRole('menuitem')).toBeInTheDocument();
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  test('renders with icon', () => {
    render(<SideNavItem {...defaultProps} />);
    const menuItem = screen.getByRole('menuitem');
    const icon = menuItem.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();
  });

  test('handles click events', () => {
    render(<SideNavItem {...defaultProps} />);

    const link = screen.getByRole('menuitem');
    fireEvent.click(link);

    expect(defaultProps.onItemClick).toHaveBeenCalled();
  });

  test('renders with children (subItems)', () => {
    const subItems = [
      { children: 'Sub Item 1', icon: 'sub-icon-1' },
      { children: 'Sub Item 2', icon: 'sub-icon-2' },
    ];

    render(<SideNavItem {...defaultProps} subItems={subItems} isDefaultOpen={true} />);

    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
    expect(screen.getByText('Sub Item 2')).toBeInTheDocument();
  });

  test('renders with subItemGroups', () => {
    const subItemGroups = [
      {
        subHeading: 'Group 1',
        subItems: [{ children: 'Sub Item 1', icon: 'sub-icon-1' }],
      },
    ];

    render(<SideNavItem {...defaultProps} subItemGroups={subItemGroups} isDefaultOpen={true} />);

    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
  });

  test('handles accessibility attributes', () => {
    render(
      <SideNavItem {...defaultProps} isActive={true} isCollapsed={true}>
        Active Item
      </SideNavItem>
    );

    const item = screen.getByRole('menuitem');
    expect(item).toHaveAttribute('aria-current', 'page');
    expect(item).toHaveAttribute('aria-label', 'Active Item');
  });

  test('renders nested items with correct level', () => {
    const subItems = [
      {
        children: 'Nested Item',
        level: 2,
        subItems: [{ children: 'Deep Item', icon: 'deep-icon' }],
      },
    ];
    render(<SideNavItem {...defaultProps} subItems={subItems} isDefaultOpen={true} />);
    expect(screen.getByText('Deep Item')).toBeInTheDocument();
    const nestedItem = screen.getByText('Deep Item').closest('li');
    const icon = nestedItem?.querySelector('span[data-name="icon"]');
    expect(icon).toBeInTheDocument();
  });
});
