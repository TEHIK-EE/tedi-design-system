import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { VerticalSpacing } from '../vertical-spacing';
import HeadingWithIcon, { HeadingWithIconProps } from './heading-with-icon';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19827&mode=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/94147f-heading-with-icon" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'Tedi-Ready/Content/HeadingWithIcon',
  component: HeadingWithIcon,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19827&mode=dev',
    },
  },
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
