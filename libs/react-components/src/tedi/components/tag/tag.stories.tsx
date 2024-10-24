import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../grid';
import { Tag, TagProps } from './tag';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2405-49832&m=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/6524c4-tag)
 */

export default {
  title: 'Tedi-ready/Components/Tag',
  component: Tag,
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
} as Meta;
type Story = StoryObj<TagProps>;

const Template: StoryFn<TagProps> = (args) => <Tag {...args} />;

const ColorTemplate: StoryFn<TagProps> = (args) => {
  return (
    <Row justifyContent="start">
      <Col md="auto">
        <Tag color={args.color}>Tag</Tag>
      </Col>
      <Col md="auto">
        <Tag color={args.color} onClose={args.onClose}>
          Tag
        </Tag>
      </Col>
      {args.isLoading && (
        <Col md="auto">
          <Tag color={args.color} isLoading={args.isLoading}>
            taotlus_scan_lk_1.pdf
          </Tag>
        </Col>
      )}
    </Row>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    color: 'primary',
    children: 'Tag',
  },
};

export const Primary: Story = {
  render: ColorTemplate,
  args: {
    onClose: (e) => console.log('Close button clicked', e),
    isLoading: true,
    color: 'primary',
  },
};

export const Secondary: Story = {
  render: ColorTemplate,
  args: {
    onClose: (e) => console.log('Close button clicked', e),
    isLoading: true,
    color: 'secondary',
  },
};

export const Invalid: Story = {
  render: ColorTemplate,
  args: {
    onClose: (e) => console.log('Close button clicked', e),
    color: 'danger',
  },
};
