import { Meta, Story } from '@storybook/react';

import { Dropdown, DropdownItem, DropdownProps } from './dropdown';

export default {
  component: Dropdown,
  title: 'components/Dropdown',
} as Meta;

const items: DropdownItem[] = [
  { children: 'EST', onClick: () => null, isActive: true, href: '#' },
  { children: 'RUS', onClick: () => null, href: '#' },
  { children: 'ENG', onClick: () => null, href: '#' },
];

const Template: Story<DropdownProps> = (args) => {
  return <Dropdown button={{ children: 'EST', visualType: 'link', iconRight: 'expand_more' }} items={items} />;
};

export const Primary = Template.bind({});
