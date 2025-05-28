import { fireEvent, render, screen } from '@testing-library/react';

import { SideNavDropdown } from '../sidenav-dropdown/sidenav-dropdown';
import { SideNavItem } from '../sidenav-item/sidenav-item';

const mockGroups = [
  {
    subHeading: 'Group 1',
    subItems: [
      {
        children: 'Item 1',
        href: '/item-1',
        isActive: false,
        onClick: jest.fn(),
      },
      {
        children: 'Item 2',
        href: '/item-2',
        isActive: true,
        onClick: jest.fn(),
      },
    ],
  },
];

describe('SideNavDropdown', () => {
  it('renders the trigger button', () => {
    render(<SideNavDropdown trigger={<span>Open menu</span>} groups={mockGroups} />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<SideNavDropdown trigger={<span>Menu</span>} groups={mockGroups} />);
    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);

    const menus = screen.getAllByRole('menu');
    expect(menus.length).toBeGreaterThan(0);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('opens dropdown on keyboard (Enter)', () => {
    render(<SideNavDropdown trigger={<span>Menu</span>} groups={mockGroups} />);
    const trigger = screen.getByRole('button');

    fireEvent.keyDown(trigger, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('calls item onClick and closes dropdown', () => {
    const onClickMock = jest.fn();
    const customGroups: { subItems: SideNavItem<'a'>[] }[] = [
      {
        subItems: [
          {
            children: 'Clickable Item',
            href: '/clickable',
            isActive: false,
            onClick: onClickMock,
          },
        ],
      },
    ];

    render(<SideNavDropdown trigger={<span>Trigger</span>} groups={customGroups} />);
    fireEvent.click(screen.getByRole('button'));
    const item = screen.getByRole('menuitem', { name: /clickable item/i });
    fireEvent.click(item);

    expect(onClickMock).toHaveBeenCalled();
    expect(screen.queryByText(/clickable item/i)).not.toBeInTheDocument();
  });

  it('calls onOpenChange callback', () => {
    const onOpenChange = jest.fn();
    render(<SideNavDropdown trigger={<span>Trigger</span>} groups={mockGroups} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
