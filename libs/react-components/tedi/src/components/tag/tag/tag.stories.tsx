import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '../../typography/text/text';
import { Tag, TagProps } from './tag';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2405-49832&m=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/6524c4-tag)
 */
const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'Tedi-ready/Tag',
};

export default meta;
type Story = StoryObj<typeof Tag>;

const Template: StoryFn<TagProps> = (args) => <Tag {...args} />;

const BoldTextTemplate: StoryFn<TagProps> = (args) => {
  return (
    <Tag onClose={args.onClose}>
      <Text modifiers="bold">Laura Kassisaba</Text>
      <Text color="disabled"> • </Text>
      <Text>49504080254</Text>
    </Tag>
  );
};

export const Default: Story = {
  render: Template,
  argTypes: {
    onClose: {
      control: false,
    },
  },
  args: {
    children: 'Tag',
  },
};

export const WithCloseButton: Story = {
  render: BoldTextTemplate,
  args: {
    onClose: (e) => console.log('Close button clicked', e),
  },
};

export const LoadingState: Story = {
  render: Template,
  args: {
    children: 'taotlus_scan_lk_1.pdf',
    isLoading: true,
    loadingLabel: 'Loading...',
  },
};
