import { Meta, StoryFn, StoryObj } from '@storybook/react';

import List, { ListProps } from './list';
import ListItem from './list-item';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19322&m=dev)<br/>
 * [Zeroheight ↗](https://tedi.tehik.ee/1ee8444b7/p/37b651-list)
 */

const meta: Meta<typeof List> = {
  component: List,
  title: 'Tedi-ready/Content/List',
  subcomponents: { ListItem } as never,
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const Template: StoryFn<Omit<ListProps, 'children'>> = (args) => (
  <List {...args}>
    <ListItem>Potato</ListItem>
    <ListItem>Caesar salad</ListItem>
    <ListItem>Caesar salad</ListItem>
  </List>
);

const TemplateUnorderedNested: StoryFn<Omit<ListProps, 'children'>> = (args) => (
  <List {...args}>
    <ListItem>Caesar salad</ListItem>
    <ListItem>
      Caesar salad
      <List {...args}>
        <ListItem>
          Dressing
          <List {...args}>
            <ListItem>Lemon juice</ListItem>
            <ListItem>Anchovies</ListItem>
            <ListItem>Parmesan cheese</ListItem>
            <ListItem>Worcestershire sauce</ListItem>
            <ListItem>Mustard</ListItem>
          </List>
        </ListItem>
      </List>
    </ListItem>
  </List>
);

const TemplateOrderedNested: StoryFn<Omit<ListProps, 'children'>> = (args) => (
  <List {...args}>
    <ListItem>School homework</ListItem>
    <ListItem>
      Chores
      <List {...args}>
        <ListItem>Wash dishes</ListItem>
        <ListItem>
          Fold laundry
          <List {...args}>
            <ListItem>Iron the sheets</ListItem>
            <ListItem>Hang dresses</ListItem>
          </List>
        </ListItem>
      </List>
    </ListItem>
    <ListItem>Walk the dog</ListItem>
    <ListItem>Water the flowers</ListItem>
  </List>
);

export const Default: Story = {
  render: Template,
  args: {
    style: 'styled',
    element: 'ul',
  },
};

export const NestedUnordered: Story = {
  render: TemplateUnorderedNested,
  args: {
    style: 'styled',
  },
};

export const NestedOrdered: Story = {
  render: TemplateOrderedNested,
  args: {
    element: 'ol',
    style: 'styled',
  },
};

export const NoStyleList: Story = {
  render: Template,
  args: {
    style: 'none',
  },
};
