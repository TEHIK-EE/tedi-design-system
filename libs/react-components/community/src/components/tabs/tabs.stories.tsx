import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Heading from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { Tabs, TabsItem, TabsItemProps, TabsProps } from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Community/Tabs',
  subcomponents: { TabsItem } as never,
};

export default meta;

export interface TabsStory {
  tabs: Omit<TabsProps, 'aria-labelledby'>;
  tabsItem: Partial<Omit<TabsItemProps, 'id' | 'label'>>;
}

type Story = StoryObj<TabsStory>;

const Template: StoryFn<TabsStory> = ({ tabs, tabsItem }) => (
  <>
    <Heading id="tabs-heading" className="visually-hidden">
      Tabs title
    </Heading>
    <Tabs defaultCurrentTab="tab-1" {...tabs} aria-labelledby="tabs-heading">
      <TabsItem {...tabsItem} id="tab-1" label="Tab 1">
        <VerticalSpacing>
          <Heading element="h2">Tab 1</Heading>
          <p>Content 1</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem {...tabsItem} id="tab-2" label="Tab 2">
        <VerticalSpacing>
          <Heading element="h2">Tab 2</Heading>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem {...tabsItem} id="tab-3" label="Tab 3">
        <VerticalSpacing>
          <Heading element="h2">Tab 3</Heading>
          <p>Content 3</p>
          <p>Content 3</p>
          <p>Content 3</p>
          <p>Content 3</p>
          <p>Content 3</p>
          <p>Content 3</p>
          <p>Content 3</p>
          <p>Content 3</p>
          <p>Content 3</p>
          <p>Content 3</p>
        </VerticalSpacing>
      </TabsItem>
    </Tabs>
  </>
);

export const Default: Story = {
  render: Template,
  args: {},
};

/**
 * Since TabsItem uses Card internally it also supports `padding` and `background` props
 */
export const Padding: Story = {
  render: Template,
  args: {
    tabsItem: {
      padding: 1,
    },
  },
};
