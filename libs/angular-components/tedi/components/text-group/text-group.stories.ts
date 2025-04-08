import type { Meta, StoryObj } from "@storybook/angular";

import { TextGroupComponent } from "./text-group.component";

export default {
  title: "Tedi-Ready Angular/Content/TextGroup",
  component: TextGroupComponent,
} as Meta<TextGroupComponent>;

type Story = StoryObj<TextGroupComponent>;

export const Default: Story = {
  args: {
    label: "Label",
    value: "Value",
    type: "vertical",
    labelWidth: "auto",
  },
  render: (props) => ({
    props,
    template: `
      <tedi-text-group
        [label]="label"
        [value]="value"
        [type]="type"
        [labelWidth]="labelWidth"
      ></tedi-text-group>
    `,
  }),
  argTypes: {
    label: {
      control: "text",
      description: "Label for the text group",
      defaultValue: "Label22222",
    },
    value: {
      control: "text",
      description: "Value displayed alongside the label",
      defaultValue: "Value2222",
    },
    type: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Type of text group layout",
      defaultValue: "vertical",
    },
    labelWidth: {
      control: "text",
      description: 'Width for the label (e.g., "200px", "30%", etc.)',
      defaultValue: "auto",
    },
  },
};
// export const Horizontal: Story = {
//   ...Default,
//   args: {
//     ...Default.args,
//     type: "horizontal",
//   },
// };
// export const Vertical: Story = {
//   ...Default,
//   args: {
//     ...Default.args,
//     type: "vertical",
//   },
// };

// export const CustomLabelWidth: Story = {
//   ...Default,
//   args: {
//     ...Default.args,
//     labelWidth: "200px",
//   },
//   render: (props) => ({
//     props,
//   }),
// };
