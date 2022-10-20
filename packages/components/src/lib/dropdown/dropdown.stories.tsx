import { Meta, Story } from '@storybook/react';

import { Dropdown, DropdownItem, DropdownProps } from './dropdown';

export default {
  component: Dropdown,
  title: 'components/Dropdown',
} as Meta;

const items: DropdownItem[] = [
  { label: 'EST', onClick: () => null, isActive: true, url: '#' },
  { label: 'RUS', onClick: () => null, url: '#' },
  { label: 'ENG', onClick: () => null, url: '#' },
];

const Template: Story<DropdownProps> = (args) => {
  return <Dropdown button={{ text: 'EST', type: 'link', iconRight: 'expand_more' }} items={items} />;
};

export const Primary = Template.bind({});
