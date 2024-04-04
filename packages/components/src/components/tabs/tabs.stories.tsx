import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Heading from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { Tabs, TabsItem, TabsItemProps, TabsProps } from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
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
      Lapse detailinfo
    </Heading>
    <Tabs defaultCurrentTab="tab-1" {...tabs} aria-labelledby="tabs-heading">
      <TabsItem {...tabsItem} id="tab-1" label="Vanemad">
        <VerticalSpacing>
          <Heading element="h2">Vanemad</Heading>
          <p>Content 1</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem {...tabsItem} id="tab-2" label="Eestkoste">
        <VerticalSpacing>
          <Heading element="h2">Eestkoste</Heading>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem {...tabsItem} id="tab-3" label="Perest eraldamine">
        <VerticalSpacing>
          <Heading element="h2">Perest eraldamine</Heading>
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
