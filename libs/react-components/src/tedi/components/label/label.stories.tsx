import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Label, LabelProps } from './label';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/%E2%9D%97TEDI-Design-System%E2%9D%97(draft---DO-NOT-USE-it-in-projects-yet)?node-id=2137-19406&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/64479c-label" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Label> = {
  component: Label,
  title: 'TEDI-Ready/Content/Label',
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
type Story = StoryObj<typeof Label>;

const Template: StoryFn<LabelProps> = (args) => <Label {...args} />;

export const Default: Story = {
  render: Template,

  args: {
    children: 'Active ingredient',
  },
};

export const Required: Story = {
  render: Template,
  name: 'Required field',

  args: {
    children: 'Active ingredient',
    required: true,
  },
};

export const DefaultBold: Story = {
  render: Template,
  name: 'Bold',

  args: {
    children: 'Active ingredient',
    isBold: true,
  },
};

export const RequiredBold: Story = {
  render: Template,
  name: 'Bold Required field',

  args: {
    children: 'Active ingredient',
    required: true,
    isBold: true,
  },
};

export const InfoButtonStory: Story = {
  render: Template,

  args: {
    children: 'Active ingredient',
    required: true,
    tooltip: 'More Info',
  },
};

export const DefaultSmall: Story = {
  render: Template,

  args: {
    children: 'Active ingredient',
    isSmall: true,
  },
};

export const DefaultSmallBold: Story = {
  render: Template,

  args: {
    children: 'Active ingredient',
    isBold: true,
    isSmall: true,
  },
};
