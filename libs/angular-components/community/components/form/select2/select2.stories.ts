import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { Select2Component } from "./select2.component";

/**
 * Select2 component provides a custom dropdown selection with improved UX.
 * - Allows single or multiple selections
 * - Fully accessible keyboard navigation
 * - Custom styling options
 */
export default {
  title: "Community Angular/Form/Select2",
  component: Select2Component,
  decorators: [
    moduleMetadata({
      imports: [Select2Component],
    }),
  ],
  parameters: {
    status: {
      type: ["devComponent"],
    },
  },
  args: {
    options: ["Hydrodynamic", "Port & Starboard Attachments", "Turbo Drive"],
    selectedOptions: [],
  },
  argTypes: {
    options: {
      description: "Array of options to display in the dropdown",
      control: "object",
      table: {
        type: { summary: "string[]" },
      },
    },
    selectedOptions: {
      description: "Currently selected options",
      control: "object",
      table: {
        type: { summary: "readonly string[]" },
      },
    },
  },
} satisfies Meta<Select2Component>;

export const Default: StoryObj<Select2Component> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="margin: 20px; max-width: 400px;">
        <select2 />
      </div>
    `,
  }),
};

export const WithPreselectedOption: StoryObj<Select2Component> = {
  render: (args) => ({
    props: {
      ...args,
      selectedOptions: ["Hydrodynamic"],
    },
    template: `
      <div style="margin: 20px; max-width: 400px;">
        <select2 [selectedOptions]="selectedOptions" />
      </div>
    `,
  }),
};

export const CustomOptions: StoryObj<Select2Component> = {
  render: (args) => ({
    props: {
      ...args,
      customOptions: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
      ],
      selectedOptions: ["Option 3"],
    },
    template: `
      <div style="margin: 20px; max-width: 400px;">
        <select2 [options]="customOptions" [selectedOptions]="selectedOptions" />
      </div>
    `,
  }),
};
