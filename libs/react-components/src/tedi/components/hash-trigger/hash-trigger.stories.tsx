import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../grid';
import Link from '../navigation/link/link';
import { Heading } from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import HashTrigger, { HashTriggerProps } from './hash-trigger';

/**
 * This component provides opportunity to navigate to a specific element that is defined in the hash of the URL. Try to change hash to test-1 to see it in action. <br/>
 * HashTrigger is also included inside Accordion and Tabs component, to trigger stateChange on match. <br />
 * When page is first loaded, the scroll will be instant. When hash is changed, the scroll will be smooth.
 */
const meta: Meta<typeof HashTrigger> = {
  component: HashTrigger,
  title: 'TEDI-Ready/Components/Helpers/HashTrigger',
};

export default meta;
type Story = StoryObj<typeof HashTrigger>;

const Template: StoryFn<HashTriggerProps> = (args) => (
  <div>
    <Row gutter={5}>
      {Array.from(Array(10).keys()).map((i) => (
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
        <HashTrigger id={args.id}>
          <p id={args.id}>Should scroll here with {args.id}</p>
        </HashTrigger>
      </Col>
      {Array.from(Array(10).keys()).map((i) => (
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
    </Row>
  </div>
);

export const Default: Story = {
  render: Template,

  args: {
    id: 'test-1',
    scrollOnMatch: true,
  },
};

const TabsTemplate: StoryFn<HashTriggerProps> = (args) => (
  <>
    <Heading id="tabs-heading" className="visually-hidden">
      Tabs title
    </Heading>
    <Link href="#tab-1">Tab 1</Link>
    <br />
    <Link href="#tab-2">Tab 2</Link>
    <br />
    <Link href="#tab-3">Tab 3</Link>
    <br />
    <VerticalSpacing size={4}>
      {Array.from(Array(10).keys()).map((i) => (
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
    <HashTrigger id="tab-1">Tab 1</HashTrigger>
    <VerticalSpacing size={4}>
      {Array.from(Array(10).keys()).map((i) => (
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
    <HashTrigger id="tab-2">Tab 2</HashTrigger>
    <VerticalSpacing size={4}>
      {Array.from(Array(10).keys()).map((i) => (
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
    <HashTrigger id="tab-3">
      <p>Tab 3</p>
    </HashTrigger>
  </>
);

/**
 * HashTrigger component can be used with Tabs component to set currentTab to a specific tab that is defined in the hash of the URL. Try to change hash to tab-2 to see it in action.
 */
export const TabsWithHashTrigger: Story = {
  render: TabsTemplate,

  args: {
    id: 'tabs-heading',
    scrollOnMatch: true,
  },
};
