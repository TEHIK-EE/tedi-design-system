import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import List, { ListProps } from './list';
import ListItem from './list-item';

export default {
  title: 'components/List',
  component: List,
  subcomponents: { ListItem } as never,
} as Meta;
type Story = StoryObj<ListProps>;

const Template: StoryFn<Omit<ListProps, 'children'>> = (args) => (
  <List {...args}>
    <ListItem>List Item</ListItem>
    <ListItem>List Item</ListItem>
    <ListItem>List Item</ListItem>
  </List>
);

export const Default: Story = {
  render: Template,
  args: {},
};

export const WithVerticalSpacing: Story = {
  render: Template,
  args: {
    verticalSpacing: {
      size: 2,
    },
  },
};
