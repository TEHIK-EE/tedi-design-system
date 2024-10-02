import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Label, LabelProps } from './label';

/**
 * [Figma ↗](https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/%E2%9D%97TEDI-Design-System%E2%9D%97(draft---DO-NOT-USE-it-in-projects-yet)?node-id=2137-19406&m=dev)<br />
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/64479c-label)
 */

const meta: Meta<typeof Label> = {
  component: Label,
  title: 'TEDI-Ready/Content/Label',
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

export const Mandatory: Story = {
  render: Template,
  name: 'Mandatory field',

  args: {
    children: 'Active ingredient',
    required: true,
  },
};

export const Tooltip: Story = {
  render: Template,
  name: 'With info tooltip',

  args: {
    children: 'Active ingredient',
  },
};

export const DefaultBold: Story = {
  render: Template,
  name: 'Bold',

  args: {
    children: 'Active ingredient',
    bold: true,
  },
};

export const MandatoryBold: Story = {
  render: Template,
  name: 'Bold mandatory field',

  args: {
    children: 'Active ingredient',
    required: true,
    bold: true,
  },
};
