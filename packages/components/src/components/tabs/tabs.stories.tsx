import { Meta, Story } from '@storybook/react';
import React from 'react';

import Heading from '../heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { Tabs, TabsItem, TabsProps } from '.';

export default {
  title: 'components/Tabs',
  component: Tabs,
  subcomponents: { TabsItem },
} as Meta;

const Template: Story<TabsProps> = (args) => (
  <>
    <h1 id="tabs-heading" className="visually-hidden">
      Lapse detailinfo
    </h1>
    <Tabs {...args} defaultCurrentTab="tab-1" aria-labelledby="tabs-heading">
      <TabsItem id="tab-1" label="Vanemad">
        <VerticalSpacing>
          <Heading level={2}>Vanemad</Heading>
          <p>Content 1</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem id="tab-2" label="Eestkoste">
        <VerticalSpacing>
          <Heading level={2}>Eestkoste</Heading>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
          <p>Content 2</p>
        </VerticalSpacing>
      </TabsItem>
      <TabsItem id="tab-3" label="Perest eraldamine">
        <VerticalSpacing>
          <Heading level={2}>Perest eraldamine</Heading>
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

export const Default = Template.bind({});
Default.args = {};
