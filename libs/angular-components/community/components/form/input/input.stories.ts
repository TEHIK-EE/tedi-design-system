import { Meta, StoryObj } from "@storybook/angular";
import { InputComponent } from "./input.component";

export default {
  title: "Community Angular/Form/Input",
  component: InputComponent,
  render: (props) => ({
    props,
    template: `<input tedi-input [placeholder]="placeholder" [disabled]="disabled" [size]="size" />`,
  }),
  args: {
    placeholder: "Enter text",
    disabled: false,
    size: "default",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["small", "default"],
      description: "Defines the size of the input.",
      table: {
        defaultValue: { summary: "default" },
        type: { summary: '"small" | "default"' },
      },
    },
  },
} as Meta<InputComponent>;

type InputStory = StoryObj<InputComponent>;

export const Small: InputStory = {
  args: {
    size: "default",
  },
};
