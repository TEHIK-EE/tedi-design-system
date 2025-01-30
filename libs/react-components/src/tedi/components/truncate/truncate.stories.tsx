import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../grid';
import { Truncate } from './truncate';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=2427-40830&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://zeroheight.com/1ee8444b7/p/020483-truncate-dev" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Truncate> = {
  component: Truncate,
  title: 'Tedi-ready/Content/Truncate',
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
type Story = StoryObj<typeof Truncate>;

const TemplateColumn: StoryFn<typeof Truncate> = (args) => {
  return (
    <Row>
      <Col>
        <Truncate {...args} />
      </Col>
    </Row>
  );
};

export const Default: Story = {
  render: TemplateColumn,
  args: {
    children: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, maiores! Tempora consequatur eveniet cupiditate. 
    Aspernatur id quia fugiat, consequatur rerum ipsa ipsam ad suscipit provident odio est commodi velit ut quisquam amet, 
    harum nisi molestias excepturi sit perferendis, aliquid at consectetur? 
    Minima quidem cumque eaque eveniet unde esse impedit necessitatibus aut non autem, 
    maxime sed odit repellat distinctio, molestias laudantium saepe dignissimos eius!`,
    expandable: true,
  },
};

export const NoTruncate: Story = {
  render: TemplateColumn,
  args: {
    children: 'This text does not get truncated, because the length is smaller than maxLength property.',
    maxLength: 100,
  },
};
