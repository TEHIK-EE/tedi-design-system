import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../grid';
import HashTrigger, { HashTriggerProps } from './hash-trigger';

/**
 * This component provides opportunity to navigate to a specific element that is defined in the hash of the URL. Try to change hash to test-1 to see it in action.
 */
const meta: Meta<typeof HashTrigger> = {
  component: HashTrigger,
};

export default meta;
type Story = StoryObj<typeof HashTrigger>;

const Template: StoryFn<HashTriggerProps> = (args) => (
  <div>
    <Row gutter={5}>
      {Array.from(Array(15).keys()).map((i) => (
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
