import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { NumberFieldComponent } from "./number-field.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4536-78765&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/90c693-number-field" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "Community Angular/Form/NumberField",
  component: NumberFieldComponent,
  argTypes: {
    id: {
      description:
        "The unique identifier for the input element that this label is associated with. This ID should match the input element's id attribute to ensure accessibility.",
      control: {
        type: "text",
      },
      table: {
        category: "inputs",
        type: { summary: "string" },
      },
    },
    label: {
      description:
        "The text content of the label that describes the input field.",
      control: {
        type: "text",
      },
      table: {
        category: "inputs",
        type: { summary: "string" },
      },
    },
    defaultValue: {
      description: "Initial value of the input field.",
      control: {
        type: "number",
      },
      table: {
        category: "inputs",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    value: {
      description: "Controlled value of the input field.",
      control: {
        type: "number",
      },
      table: {
        category: "inputs",
        type: { summary: "number" },
      },
    },
    disabled: {
      description: "Is input disabled?",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
      },
    },
    required: {
      description:
        "Indicates whether the input field is required. If set to true, the required indicator will be displayed next to the label.",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
      },
    },
    min: {
      description:
        "Minimum allowed value. Disables decrementing below this value and restricts manual input.",
      control: {
        type: "number",
      },
      table: {
        category: "inputs",
        type: { summary: "number" },
      },
    },
    max: {
      description:
        "Maximum allowed value. Disables incrementing above this value and restricts manual input.",
      control: {
        type: "number",
      },
      table: {
        category: "inputs",
        type: { summary: "number" },
      },
    },
    step: {
      description: "Step size for incrementing or decrementing the value.",
      control: {
        type: "number",
      },
      table: {
        category: "inputs",
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    size: {
      description: "Size of the number field.",
      control: {
        type: "select",
      },
      options: ["default", "small"],
      table: {
        category: "inputs",
        type: { summary: "NumberFieldSize", detail: "default \nsmall" },
        defaultValue: { summary: "default" },
      },
    },
    invalid: {
      description: "Marks the field as invalid for validation purposes.",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
      },
    },
    suffix: {
      description: "Text displayed after the input value, typically a unit.",
      control: {
        type: "text",
      },
      table: {
        category: "inputs",
        type: { summary: "string" },
      },
    },
    fullWidth: {
      description:
        "Whether the number field occupies the full width of its container.",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
      },
    },
    feedbackText: {
      description:
        "[FeedbackText](/?path=/docs/community-angular-form-feedbacktext--docs) component inputs.",
      control: {
        type: "object",
      },
      table: {
        category: "inputs",
        type: { summary: "FeedbackTextInputs" },
      },
    },
  },
} as Meta<NumberFieldComponent>;

export const Default: StoryObj<NumberFieldComponent> = {
  args: {
    id: "test",
    label: "Label",
  },
  render: (args) => ({
    props: args,
    template: `<tedi-number-field ${argsToTemplate(args)} />`,
  }),
};
