import { Meta, StoryObj } from "@storybook/angular";
import { TextareaComponent } from "./textarea.component";

export default {
  title: "Community/Form/TextArea",
  component: TextareaComponent,
  render: (props) => ({
    props,
    template: `<textarea tedi-textarea [placeholder]="placeholder" [disabled]="disabled" [size]="size" [state]="state" [resizeX]="resizeX" [resizeY]="resizeY"></textarea>`,
  }),
  args: {
    placeholder: "Enter text",
    disabled: false,
    size: "default",
    state: "default",
    resizeX: false,
    resizeY: true,
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
    resizeX: {
      control: "boolean",
      description:
        "Whether the textarea should be resizable in the X direction.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    resizeY: {
      control: "boolean",
      description:
        "Whether the textarea should be resizable in the Y direction.",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
  },
} as Meta<TextareaComponent>;

type InputStory = StoryObj<TextareaComponent>;

export const Default: InputStory = {
  args: {
    size: "default",
    state: "default",
    resizeX: false,
    resizeY: true,
  },
};
