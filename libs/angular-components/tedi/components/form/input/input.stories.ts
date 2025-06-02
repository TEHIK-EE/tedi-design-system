import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { InputComponent } from "./input.component";

export default {
  title: "TEDI-Ready Angular/Form/Input",
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [InputComponent],
    }),
  ],
  argTypes: {
    size: {
      control: "radio",
      options: ["small", "default"],
      description: "Size of the input.",
      table: {
        category: "inputs",
        defaultValue: { summary: "default" },
        type: { summary: "InputSize", detail: "default \nsmall" },
      },
    },
    state: {
      control: "radio",
      options: ["default", "valid", "error"],
      description: "State of the input.",
      table: {
        category: "inputs",
        defaultValue: { summary: "default" },
        type: { summary: "InputState", detail: "default \nvalid \nerror" },
      },
    },
  },
} as Meta<InputComponent>;

export const Default: StoryObj<InputComponent> = {
  args: {
    size: "default",
    state: "default",
  },
  render: (args) => ({
    props: args,
    template: `
      <input tedi-input ${argsToTemplate(args)} placeholder="Text value" />
    `,
  }),
};
