import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { VerticalSpacing } from '../vertical-spacing';
import HeadingWithIcon, { HeadingWithIconProps } from './heading-with-icon';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19827&mode=dev)<br/>
 * [Zeroheight ↗](https://tedi.tehik.ee/1ee8444b7/p/94147f-heading-with-icon)
 */

export default {
  title: 'Tedi-ready/Content/HeadingWithIcon',
  component: HeadingWithIcon,
} as Meta;
type Story = StoryObj<HeadingWithIconProps>;

const Template: StoryFn<HeadingWithIconProps> = (args) => <HeadingWithIcon {...args} />;
const TemplateColors: StoryFn<HeadingWithIconProps> = (args) => {
  return (
    <VerticalSpacing size={1}>
      <HeadingWithIcon headingColor="brand" iconColor="brand" {...args}>
        {args.children}
      </HeadingWithIcon>
      <HeadingWithIcon {...args}>{args.children}</HeadingWithIcon>
    </VerticalSpacing>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    children: 'My family physician',
    name: 'assignment_ind',
    headingColor: 'brand',
    iconColor: 'brand',
  },
};

export const Colors: Story = {
  render: TemplateColors,
  args: {
    children: 'My family physician',
    name: 'assignment_ind',
  },
};
