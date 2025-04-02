import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Tabs, TabsItem } from '../../../../community/components/tabs';
import { Heading } from '../../base/typography/heading/heading';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Link from '../link/link';
import { HashTrigger, HashTriggerProps } from './hash-trigger';

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/84a3d9-hashtrigger" target="_BLANK">Zeroheight ↗</a><br />
 */
const meta: Meta<typeof HashTrigger> = {
  component: HashTrigger,
  title: 'TEDI-Ready/Components/Helpers/HashTrigger',
  parameters: {
    status: {
      type: ['devComponent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HashTrigger>;

const Template: StoryFn<HashTriggerProps> = (args) => (
  <>
    <Row gutter={5}>
      <Col width={12}>
        <Link href={`#${args.id}`}>Click here to add #{args.id} hash</Link>
      </Col>
      {Array.from(Array(7).keys()).map((i) => (
        <Col width={12} key={i}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at gravida mi, id convallis augue. Donec
            hendrerit sit amet quam a vehicula. Vestibulum ligula turpis, tempor non lacus et, vestibulum congue massa.
            Maecenas a sollicitudin dui. Mauris dictum fringilla nibh, sit amet egestas lectus feugiat id. Cras ac felis
            porttitor, blandit lorem id, gravida felis. Vivamus in tortor vitae neque viverra sodales. Phasellus
            suscipit, leo et aliquam aliquet, arcu justo pulvinar neque, sit amet vehicula sapien arcu eget lorem. Sed
            in sem velit. Nam scelerisque massa vitae ullamcorper congue. Nam accumsan tellus sit amet commodo tempor.
            Maecenas dapibus sagittis purus quis luctus. Duis sodales imperdiet ex, et congue lectus pulvinar in. Morbi
            urna ante, mattis eu turpis et, sagittis efficitur felis.
          </p>
        </Col>
      ))}
      <Col width={12}>
        <HashTrigger id={args.id}>Should scroll here with #{args.id}</HashTrigger>
      </Col>
    </Row>
  </>
);

export const Default: Story = {
  render: Template,

  args: {
    id: 'test-1',
    scrollOnMatch: true,
  },
};

const TabsTemplate: StoryFn<HashTriggerProps> = () => (
  <VerticalSpacing size={2}>
    <Heading id="tabs-heading" className="visually-hidden">
      Tabs title
    </Heading>
    <div>
      <Link href="#tab-1">Tab 1</Link>
      <br />
      <Link href="#tab-2">Tab 2</Link>
      <br />
      <Link href="#tab-3">Tab 3</Link>
    </div>
    <VerticalSpacing size={1}>
      {Array.from(Array(7).keys()).map((i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at gravida mi, id convallis augue. Donec
          hendrerit sit amet quam a vehicula. Vestibulum ligula turpis, tempor non lacus et, vestibulum congue massa.
          Maecenas a sollicitudin dui. Mauris dictum fringilla nibh, sit amet egestas lectus feugiat id. Cras ac felis
          porttitor, blandit lorem id, gravida felis. Vivamus in tortor vitae neque viverra sodales. Phasellus suscipit,
          leo et aliquam aliquet, arcu justo pulvinar neque, sit amet vehicula sapien arcu eget lorem. Sed in sem velit.
          Nam scelerisque massa vitae ullamcorper congue. Nam accumsan tellus sit amet commodo tempor. Maecenas dapibus
          sagittis purus quis luctus. Duis sodales imperdiet ex, et congue lectus pulvinar in. Morbi urna ante, mattis
          eu turpis et, sagittis efficitur felis.
        </p>
      ))}
    </VerticalSpacing>
    <Tabs defaultCurrentTab="tab-1" aria-labelledby="tabs-heading">
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
  </VerticalSpacing>
);

export const TabsWithHashTrigger: Story = {
  render: TabsTemplate,

  args: {
    id: 'tab',
    scrollOnMatch: true,
  },
};
