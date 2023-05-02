import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Dropdown, DropdownItem, DropdownProps } from './dropdown';

export default {
  component: Dropdown,
  title: 'components/Dropdown',
} as Meta;

const items: DropdownItem[] = [
  { children: 'EST', href: '#' },
  { children: 'RUS', href: '#' },
  { children: 'ENG', href: '#' },
];

const Template: StoryFn<DropdownProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Dropdown
      button={{
        children: items.find((i, index) => index === activeIndex)?.children,
        visualType: 'link',
        iconRight: 'expand_more',
      }}
      onItemClick={(item, index, e) => {
        e.preventDefault();
        setActiveIndex(index);
      }}
      items={items.map((i, index) => ({ ...i, isActive: index === activeIndex }))}
    />
  );
};

export const Default = {
  render: Template,
};
