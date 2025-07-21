import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { SelectComponent } from "./select.component";
import { MultiselectComponent } from "./multiselect.component";
import { SelectOptionComponent } from "./select-option.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

/**
 * The Select component provides users with a dropdown of options to choose from.
 *
 * Features:
 * - Custom option templates with icons and rich content
 * - Form control integration (ControlValueAccessor)
 * - Accessibility support
 * - Various states (default, error, valid) and sizes
 */

const meta: Meta<SelectComponent> = {
  title: "Community Angular/Form/Select/Single Select",
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SelectComponent,
        MultiselectComponent,
        SelectOptionComponent,
        FormsModule,
        ReactiveFormsModule,
        IconComponent,
      ],
    }),
  ],
  argTypes: {
    inputId: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
    placeholder: { control: "text" },
    state: { control: "radio", options: ["error", "valid", "default"] },
    size: { control: "radio", options: ["small", "default"] },
    clearable: { control: "boolean" },
    feedbackText: {
      control: "object",
      description: "Feedback message configuration",
    },
    disabled: { control: "boolean" },
  },
  args: {
    inputId: "select-1",
    label: "Custom select label",
    required: false,
    placeholder: "Select an option...",
    state: "default",
    size: "default",
    clearable: true,
    feedbackText: {
      type: "hint",
      text: "Custom hint for using the select",
      position: "left",
    },
    // disabled: false, // removed to avoid type error, can be set via controls
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Basic: Story = {
  args: {
    placeholder: "Select an option...",
    state: "default",
    size: "default",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-select
        [inputId]="inputId"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [state]="state"
        [size]="size"
        [clearable]="clearable"
      >
        <tedi-select-option [value]="'option0'" [label]="'Option 0'" />
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">
            <tedi-icon name="close" /> Option 1
        </tedi-select-option>
        <tedi-select-option [value]="'option12'" [label]="'Option 12'">
          <tedi-icon name="check" /> Option 12
        </tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">
          <div>Option 2</div>
          <small> Small description of something something </small>
        </tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};

export const WithPreselected: Story = {
  args: {
    placeholder: "Select an option...",
  },
  render: (args) => ({
    template: `
      <form [formGroup]="form">
        <tedi-select
          [inputId]="inputId"
          [label]="label"
          [feedbackText]="feedbackText"
          [required]="required"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [state]="state"
          [size]="size"
          [clearable]="clearable"
          formControlName="selectedOption"
        >
          <tedi-select-option [value]="'option1'" [label]="'Option 1'">
            <tedi-icon name="login" /> Option 1 <small> Some description here also </small>
          </tedi-select-option>
          <tedi-select-option [value]="'option12'" [label]="'Option 12'">Option 12</tedi-select-option>
          <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
          <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
        </tedi-select>
      </form>

      <br />
      <strong>controlValueAccessor value:</strong> {{ form.get('selectedOption').value }}
    `,
    props: {
      ...args,
      form: new FormGroup({
        selectedOption: new FormControl("option2"),
      }),
    },
  }),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled select",
  },
  render: (args) => ({
    props: {
      ...args,
      form: new FormGroup({
        selectedOption: new FormControl({ value: "", disabled: true }),
      }),
    },
    template: `
      <form [formGroup]="form">
        <tedi-select
          formControlName="selectedOption"
          [inputId]="inputId"
          [label]="label"
          [feedbackText]="feedbackText"
          [required]="required"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [state]="state"
          [size]="size"
          [clearable]="clearable"
        >
          <tedi-select-option [value]="'option1'" label="Option 1" />
          <tedi-select-option [value]="'option2'" label="Option 2" />
          <tedi-select-option [value]="'option3'" label="Option 3" />
        </tedi-select>
      </form>
    `,
  }),
};

export const ValidState: Story = {
  args: {
    state: "valid",
    placeholder: "Valid select",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-select
        [inputId]="inputId"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [state]="state"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [size]="size"
        [clearable]="clearable"
      >
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};

export const ErrorState: Story = {
  args: {
    state: "error",
    placeholder: "Error select",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-select
        [inputId]="inputId"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [state]="state"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [size]="size"
        [clearable]="clearable"
      >
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};

export const SmallSize: Story = {
  args: {
    size: "small",
    placeholder: "Small select",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-select
        [inputId]="inputId"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [size]="size"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [state]="state"
        [clearable]="clearable"
      >
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};

export const ManyOptions: Story = {
  render: (args) => ({
    template: `
      <tedi-select
        [inputId]="inputId"
        [placeholder]="placeholder"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [disabled]="disabled"
        [state]="state"
        [size]="size"
        [clearable]="clearable"
      >
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
        <tedi-select-option [value]="'option4'" [label]="'Option 4'">Option 4</tedi-select-option>
        <tedi-select-option [value]="'option5'" [label]="'Option 5'">Option 5</tedi-select-option>
        <tedi-select-option [value]="'option6'" [label]="'Option 6'">Option 6</tedi-select-option>
        <tedi-select-option [value]="'option7'" [label]="'Option 7'">Option 7</tedi-select-option>
        <tedi-select-option [value]="'option8'" [label]="'Option 8'">Option 8</tedi-select-option>
        <tedi-select-option [value]="'option9'" [label]="'Option 9'">Option 9</tedi-select-option>
        <tedi-select-option [value]="'option10'" [label]="'Option 10'">Option 10</tedi-select-option>
        <tedi-select-option [value]="'option11'" [label]="'Option 11'">Option 11</tedi-select-option>
        <tedi-select-option [value]="'option12'" [label]="'Option 12'">Option 12</tedi-select-option>
        <tedi-select-option [value]="'option13'" [label]="'Option 13'">Option 13</tedi-select-option>
        <tedi-select-option [value]="'option14'" [label]="'Option 14'">Option 14</tedi-select-option>
        <tedi-select-option [value]="'option15'" [label]="'Option 15'">Option 15</tedi-select-option>
        <tedi-select-option [value]="'option16'" [label]="'Option 16'">Option 16</tedi-select-option>
      </tedi-select>
    `,
    props: {
      ...args,
    },
  }),
};

export const singleSelectNoOptions: Story = {
  render: (args) => ({
    template: `
      <tedi-select
        [inputId]="inputId"
        [placeholder]="placeholder"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [disabled]="disabled"
        [state]="state"
        [size]="size"
        [clearable]="clearable"
      />
    `,
    props: {
      ...args,
    },
  }),
};

export const singleSelectGroupedOptions: Story = {
  render: (args) => ({
    template: `
      <tedi-select
        [inputId]="inputId"
        [placeholder]="placeholder"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [disabled]="disabled"
        [state]="state"
        [size]="size"
        [clearable]="clearable"
      >
        <tedi-select-option value="option1" label="Option 1" group="Group 1"/>
        <tedi-select-option value="option2" label="Option 2" group="Group 1"/>
        <tedi-select-option value="option3" label="Option 3" group="Group 1"/>
        <tedi-select-option value="option4" label="Option 4" group="Group 2"/>
        <tedi-select-option value="option5" label="Option 5" group="Group 2"/>
      </tedi-select>
    `,
    props: {
      ...args,
    },
  }),
};
