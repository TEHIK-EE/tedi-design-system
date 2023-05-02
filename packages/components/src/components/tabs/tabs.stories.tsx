import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Heading from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { Tabs, TabsItem } from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  subcomponents: { TabsItem: TabsItem as any },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => (
  <>
    <Heading id="tabs-heading" className="visually-hidden">
      Lapse detailinfo
    </Heading>
    <Tabs {...args} defaultCurrentTab="tab-1" aria-labelledby="tabs-heading">
      <TabsItem id="tab-1" label="Vanemad">
        <VerticalSpacing>
          <Heading element="h2">Vanemad</Heading>
          <p>Content 1</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem id="tab-2" label="Eestkoste">
        <VerticalSpacing>
          <Heading element="h2">Eestkoste</Heading>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem id="tab-3" label="Perest eraldamine">
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
