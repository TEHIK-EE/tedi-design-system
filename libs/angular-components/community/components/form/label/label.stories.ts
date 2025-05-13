import { Meta, StoryObj } from "@storybook/angular";
import { LabelComponent } from "./label.component";

export default {
  title: "Community Angular/Form/Label",
  component: LabelComponent,
  render: (props) => ({
    props,
    template: `
      <label tedi-label [size]="size" [required]="required">Label</label>
    `,
  }),
  parameters: {
    status: {
      type: ["existsInTediReady"],
    },
  },
  args: {
    size: "default",
    required: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["small", "default"],
      description: "Defines the size of the label.",
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "LabelSize", detail: "default \nsmall" },
      },
    },
    required: {
      control: "boolean",
      description: "Marks the label as required.",
      table: {
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean",
        },
      },
    },
  },
} as Meta<LabelComponent>;

type LabelStory = StoryObj<LabelComponent>;

export const Default: LabelStory = {
  args: {
    size: "default",
    required: false,
  },
};

export const Small: LabelStory = {
  args: {
    size: "small",
    required: false,
  },
};

export const Required: LabelStory = {
  args: {
    size: "default",
    required: true,
  },
};

export const Bold: LabelStory = {
  render: (props) => ({
    props,
    template: `
      <label tedi-label [size]="size" [required]="required">
        <strong>Label</strong>
      </label>
    `,
  }),
  args: {
    size: "default",
    required: false,
  },
};
