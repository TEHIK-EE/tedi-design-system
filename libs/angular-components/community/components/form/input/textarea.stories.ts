import { Meta, StoryObj } from "@storybook/angular";
import { InputComponent } from "./input.component";

export default {
  title: "Community Angular/Form/TextArea",
  component: InputComponent,
  render: (props) => ({
    props,
    template: `<textarea tedi-input [placeholder]="placeholder" [disabled]="disabled" [size]="size" [state]="state"></textarea>`,
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
