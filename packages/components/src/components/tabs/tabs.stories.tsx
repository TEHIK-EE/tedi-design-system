import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Heading from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { Tabs, TabsItem } from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  subcomponents: { TabsItem } as never,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => (
  <>
    <Heading id="tabs-heading" className="visually-hidden">
      Tabs title
    </Heading>
    <Tabs {...args} defaultCurrentTab="tab-1" aria-labelledby="tabs-heading">
      <TabsItem id="tab-1" label="Tab 1">
        <VerticalSpacing>
          <Heading element="h2">Tab 1</Heading>
          <p>Content 1</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem id="tab-2" label="Tab 2">
        <VerticalSpacing>
          <Heading element="h2">Tab 2</Heading>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem id="tab-3" label="Tab 3">
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
