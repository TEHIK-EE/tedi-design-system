import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../grid';
import { Tag, TagProps } from './tag';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2405-49832&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/6524c4-tag" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'Tedi-Ready/Components/Tag/Tag',
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

export const Danger: Story = {
  render: ColorTemplate,
  args: {
    onClose: (e) => console.log('Close button clicked', e),
    color: 'danger',
  },
};
