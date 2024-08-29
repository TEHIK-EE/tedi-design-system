import { Meta, StoryFn, StoryObj } from '@storybook/react';

import HeadingWithIcon, { HeadingWithIconProps } from './heading-with-icon';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19827&mode=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/94147f-heading-with-icon/b/23093e)
 */

export default {
  title: 'Tedi-ready/Content/HeadingWithIcon',
  component: HeadingWithIcon,
} as Meta;
type Story = StoryObj<HeadingWithIconProps>;

const Template: StoryFn<HeadingWithIconProps> = (args) => <HeadingWithIcon {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    children: 'My family physician',
    name: 'assignment_ind',
  },
};
