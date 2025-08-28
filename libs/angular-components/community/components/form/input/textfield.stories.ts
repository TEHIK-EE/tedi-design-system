import { Meta, StoryObj } from "@storybook/angular";
import { InputComponent } from "./input.component";

export default {
  title: "Community/Form/TextField",
  component: InputComponent,
  render: (props) => ({
    props,
    template: `<input tedi-input [placeholder]="placeholder" [disabled]="disabled" [size]="size" [state]="state" />`,
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
    state: {
      control: "radio",
      options: ["error", "valid", "default"],
      description: "State of the input.",
      table: {
        defaultValue: { summary: "default" },
        type: { summary: '"error" | "valid" | "default"' },
      },
    },
  },
} as Meta<InputComponent>;

type InputStory = StoryObj<InputComponent>;

export const Default: InputStory = {
  args: {
    size: "default",
    state: "default",
  },
};
