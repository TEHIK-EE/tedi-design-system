import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { Select2Component } from "./select2.component";
import { Select2OptionComponent } from "./select2option.component";

export default {
  title: "Community Angular/Form/Select2",
  component: Select2Component,
  decorators: [
    moduleMetadata({
      imports: [Select2Component, Select2OptionComponent],
    }),
  ],
  render: () => ({
    template: `
      <select2 inputId="1" label="Select an option" placeholder="Select an option" [feedbackText]="{text:'Something'}">
        <select2-option value="option1" label="Option 1" />
        <select2-option value="option2" label="Option 2" />
        <select2-option value="option3" label="Option 3" />
        <select2-option value="option4" label="Option 4" />
      </select2>
    `,
  }),
} as Meta;

type Select2Story = StoryObj;

export const Default: Select2Story = {};

export const WithDisabledOptions: Select2Story = {
  render: () => ({
    template: `
      <select2 inputId="2" placeholder="Select an option">
        <select2-option value="option1" label="Option 1"></select2-option>
        <select2-option value="option2" label="Option 2" [disabled]="true"></select2-option>
        <select2-option value="option3" label="Option 3" [disabled]="true"></select2-option>
        <select2-option value="option4" label="Option 4"></select2-option>
        <select2-option value="option5" label="Option 5"></select2-option>
      </select2>
    `,
  }),
};

export const WithGroupedOptions: Select2Story = {
  render: () => ({
    template: `
      <select2 inputId="3" placeholder="Select an option">
        <select2-option value="fruit1" label="Apple" group="Fruits"></select2-option>
        <select2-option value="fruit2" label="Banana" group="Fruits"></select2-option>
        <select2-option value="veg1" label="Carrot" group="Vegetables"></select2-option>
        <select2-option value="veg2" label="Broccoli" group="Vegetables"></select2-option>
      </select2>
    `,
  }),
};
