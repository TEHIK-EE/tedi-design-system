import { Meta, Story } from '@storybook/react';

import Sidenav, { SideNavItem, SideNavProps } from './sidenav';

export default {
  component: Sidenav,
  title: 'components/Layout/Sidenav',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const navItems: SideNavItem[] = [
  { href: '#', title: 'Avaleht', icon: 'home' },
  { href: '#', title: 'Kliendid', icon: 'account_box' },
  { href: '/', title: 'Lapsed', icon: 'child_care', current: true },
  { href: '#', title: 'Menetlused', icon: 'assignment' },
];

const Template: Story<SideNavProps> = (args) => <Sidenav {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  navItems,
  ariaLabel: 'Menu title',
};
