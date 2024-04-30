import { Meta, StoryObj } from '@storybook/react';

import { Dropdown, DropdownItem, DropdownProps } from './dropdown';

export default {
  component: Dropdown,
  title: 'Community-components/Dropdown',
} as Meta;

const items: DropdownItem[] = [
  { children: 'Lisa pöördumine', onClick: () => console.log('Lisa pöördumine') },
  { children: 'Lisa toetus', onClick: () => console.log('Lisa toetus') },
  { children: 'Lisa teenus', onClick: () => console.log('Lisa teenus'), isDisabled: true },
];

const itemsActive: DropdownItem[] = [
  { children: 'EST', onClick: () => console.log('EST') },
  { children: 'ENG', onClick: () => console.log('ENG'), isActive: true },
  { children: 'RUS', onClick: () => console.log('RUS') },
];

type Story = StoryObj<DropdownProps>;

export const Default: Story = {
  args: {
    button: {
      visualType: 'secondary',
      size: 'small',
      icon: 'add',
      children: 'Add more',
    },
    items,
  },
};

export const WithActiveItem: Story = {
  args: {
    button: {
      visualType: 'link',
      iconRight: 'expand_more',
      children: 'Choose language',
    },
    items: itemsActive,
  },
};
