import { Meta, StoryObj, argsToTemplate, moduleMetadata } from "@storybook/angular";
import { ToggleComponent } from "./toggle.component";

export default {
  title: "Community Angular/Form/Toggle",
  component: ToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [ToggleComponent],
    }),
  ],
  argTypes: {
    variant: {
      description: "Color variant of the toggle",
      control: {
        type: "radio",
      },
      options: ["primary", "colored"],
      table: {
        category: "inputs",
        type: { summary: "ToggleVariant", detail: "primary \ncolored" },
        defaultValue: { summary: "primary" },
      },
    },
    type: {
      description: "Type of the toggle",
      control: {
        type: "radio",
      },
      options: ["filled", "outlined"],
      table: {
        category: "inputs",
        type: { summary: "ToggleType", detail: "filled \noutlined" },
        defaultValue: { summary: "filled" },
      },
    },
    size: {
      description: "Size of the toggle",
      control: {
        type: "radio",
      },
      options: ["default", "large"],
      table: {
        category: "inputs",
        type: { summary: "ToggleSize", detail: "default \nlarge" },
        defaultValue: { summary: "default" },
      },
    },
    icon: {
      description: "Should the toggle show lock icon. Works only with large toggle.",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  }
} as Meta<ToggleComponent>;

export const Default: StoryObj<ToggleComponent> = {
  render: (args) => ({
    props: args,
    template: `<tedi-toggle ${argsToTemplate(args)} />`,
  }),
};
