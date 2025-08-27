import {
  argsToTemplate,
  Meta,
  StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { NumberFieldComponent } from "./number-field.component";
import { RowComponent } from "../../helpers/grid/row/row.component";
import { LabelComponent } from "../label/label.component";
import { FeedbackTextComponent } from "../feedback-text/feedback-text.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4536-78765&m=dev" target="_blank">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/90c693-number-field" target="_blank">Zeroheight ↗</a>
 * Can be used with <a href="https://angular.dev/guide/forms/reactive-forms" target="_blank">Reactive forms</a> and with <a href="https://angular.dev/guide/forms/template-driven-forms" target="_blank">Template-driven forms</a>
 */

export default {
  title: "TEDI-Ready/Components/Form/NumberField",
  component: NumberFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [RowComponent, LabelComponent, FeedbackTextComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `<tedi-number-field id="example-id" label="Label" />`,
  }),
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
    value: {
      description:
        "Value of the input field. Supports two-way binding, use with form controls.",
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
        defaultValue: { summary: "false" },
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
        defaultValue: { summary: "false" },
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
        defaultValue: { summary: "false" },
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
    feedbackText: {
      description:
        "[FeedbackText](/?path=/docs/community-angular-form-feedbacktext--docs) component inputs.",
      control: {
        type: "object",
      },
      table: {
        category: "inputs",
        type: { summary: "ComponentInputs<FeedbackTextComponent>" },
      },
    },
  },
} as Meta<NumberFieldComponent>;

export const Default: StoryObj<NumberFieldComponent> = {
  args: {
    id: "example-id",
    label: "Label",
  },
  render: (args) => ({
    props: args,
    template: `<tedi-number-field ${argsToTemplate(args)} />`,
  }),
};

export const Sizes: StoryObj<NumberFieldComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row class="example-list" cols="1" gapY="3">
        <tedi-row cols="2" alignItems="center" class="padding-14-16 border-bottom">
          <b>Default</b>
          <tedi-number-field label="Label" id="size-default" />
        </tedi-row>
        <tedi-row cols="2" alignItems="center" class="padding-14-16">
          <b>Small</b>
          <tedi-number-field label="Label" id="size-small" size="small" />
        </tedi-row>
      </tedi-row>
    `,
  }),
};

export const States: StoryObj<NumberFieldComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row cols="1" gapY="3">
        <tedi-row cols="2" alignItems="center">
          <b>Default</b>
          <tedi-number-field label="Label" id="default" />
        </tedi-row>
        <tedi-row cols="2" alignItems="center">
          <b>Min value</b>
          <tedi-number-field label="Label" id="min-value" [min]="01" [value]="1" />
        </tedi-row>
        <tedi-row cols="2" alignItems="center">
          <b>Max value</b>
          <tedi-number-field label="Label" id="max-value" [max]="1" [value]="1" />
        </tedi-row>
        <tedi-row cols="2" alignItems="center">
          <b>Disabled</b>
          <tedi-number-field label="Label" id="disabled" [value]="1" [disabled]="true" />
        </tedi-row>
        <tedi-row cols="2" alignItems="center">
          <b>Error</b>
          <tedi-number-field label="Label" id="error" [value]="1" [invalid]="true" [feedbackText]="{ text: 'Feedback text', type: 'error', position: 'left' }" />
        </tedi-row>
      </tedi-row>
    `,
  }),
};

export const WithHint: StoryObj<NumberFieldComponent> = {
  args: {
    id: "example-hint",
    label: "Label",
    feedbackText: {
      text: "Hint text",
      type: "hint",
      position: "left",
    },
  },
  render: (args) => ({
    props: args,
    template: `<tedi-number-field ${argsToTemplate(args)} />`,
  }),
};

export const Decimal: StoryObj<NumberFieldComponent> = {
  args: {
    id: "example-decimal",
    label: "Label",
    value: 1.5,
  },
  render: (args) => ({
    props: args,
    template: `<tedi-number-field ${argsToTemplate(args)} />`,
  }),
};

export const WithUnit: StoryObj<NumberFieldComponent> = {
  args: {
    id: "example-unit",
    label: "Label",
    suffix: "unit",
    value: 2,
  },
  render: (args) => ({
    props: args,
    template: `<tedi-number-field ${argsToTemplate(args)} />`,
  }),
};

export const FullWidth: StoryObj<NumberFieldComponent> = {
  args: {
    id: "example-full-width",
    label: "Label",
    suffix: "unit",
    fullWidth: true,
  },
  render: (args) => ({
    props: args,
    template: `<tedi-number-field ${argsToTemplate(args)} />`,
  }),
};

export const CustomLabelAndFeedbackText: StoryObj<NumberFieldComponent> = {
  args: {
    id: "example-custom",
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <label tedi-label for="example-custom">Label</label>
        <tedi-number-field ${argsToTemplate(args)} />
        <tedi-feedback-text text="Error message" type="error" />
      </div>
    `,
  }),
};
