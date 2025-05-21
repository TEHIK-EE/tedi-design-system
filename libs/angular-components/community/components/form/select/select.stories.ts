import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { SelectComponent } from "./select.component";
import { SelectOptionComponent } from "./select-option.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

/**
 * The Select component provides users with a dropdown of options to choose from.
 *
 * Features:
 * - Single-select (default) and multi-select modes
 * - Custom option templates with icons and rich content
 * - Form control integration (ControlValueAccessor)
 * - Accessibility support
 * - Various states (default, error, valid) and sizes
 *
 * In single-select mode, the value is a string.
 * In multi-select mode, the value is an array of strings.
 */

const meta: Meta<SelectComponent> = {
  title: "Community Angular/Form/Select",
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SelectComponent,
        SelectOptionComponent,
        FormsModule,
        ReactiveFormsModule,
        IconComponent,
      ],
    }),
  ],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    state: { control: "radio", options: ["error", "valid", "default"] },
    size: { control: "radio", options: ["small", "default"] },
    multiselect: { control: "boolean" },
  },
  args: {
    placeholder: "Select an option...",
    disabled: false,
    state: "default",
    size: "default",
    multiselect: false,
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Basic: Story = {
  args: {
    placeholder: "Select an option...",
    disabled: false,
    state: "default",
    size: "default",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-select [placeholder]="placeholder" [disabled]="disabled" [state]="state" [size]="size">
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
        <tedi-select formControlName="selectedOption" [placeholder]="placeholder">
          <tedi-select-option [value]="'option1'" [label]="'Option 1'">
            <tedi-icon name="login" /> Option 1 <small> Some description here also </small>
          </tedi-select-option>
          <tedi-select-option [value]="'option12'" [label]="'Option 12'">Option 12</tedi-select-option>
          <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
          <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
        </tedi-select>
      </form>
      (FormControl value): {{ form.get('selectedOption').value }}
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
    disabled: true,
    placeholder: "Disabled select",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-select [disabled]="disabled" [placeholder]="placeholder">
        <tedi-select-option [value]="'option1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'">Option 3</tedi-select-option>
      </tedi-select>
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
      <tedi-select [state]="state" [placeholder]="placeholder">
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
      <tedi-select [state]="state" [placeholder]="placeholder">
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
      <tedi-select [size]="size" [placeholder]="placeholder">
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};

export const ManyOptions: Story = {
  render: () => ({
    template: `
      <tedi-select>
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
  }),
};

export const Multiselect: Story = {
  args: {
    multiselect: true,
    placeholder: "Select multiple options...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The multiselect mode allows users to select multiple options. Selected values are stored as an array.",
      },
    },
  },
  render: (args) => ({
    template: `
      <form [formGroup]="form">
        <tedi-select formControlName="selectedOptions" [multiselect]="multiselect" [placeholder]="placeholder">
          <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
          <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
          <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
          <tedi-select-option [value]="'option4'" [label]="'Option 4'">Option 4</tedi-select-option>
          <tedi-select-option [value]="'option5'" [label]="'Option 5'">Option 5</tedi-select-option>
        </tedi-select>
      </form>
      <div style="margin-top: 16px;">
        <strong>Selected values:</strong> {{ form.get('selectedOptions').value | json }}
      </div>
    `,
    props: {
      ...args,
      form: new FormGroup({
        selectedOptions: new FormControl(["option1", "option3"]),
      }),
    },
  }),
};

export const MultiselectWithCustomOptions: Story = {
  args: {
    multiselect: true,
    placeholder: "Select multiple options...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiselect with custom option templates, showing how to use icons and rich content in multiselect options.",
      },
    },
  },
  render: (args) => ({
    template: `
      <form [formGroup]="form">
        <tedi-select formControlName="selectedOptions" [multiselect]="multiselect" [placeholder]="placeholder">
          <tedi-select-option [value]="'option1'" [label]="'Home'">
            <tedi-icon name="home" /> Home
          </tedi-select-option>
          <tedi-select-option [value]="'option2'" [label]="'Settings'">
            <tedi-icon name="settings" /> Settings
          </tedi-select-option>
          <tedi-select-option [value]="'option3'" [label]="'Account'">
            <tedi-icon name="person" /> Account
          </tedi-select-option>
          <tedi-select-option [value]="'option4'" [label]="'Notifications'">
            <tedi-icon name="notifications" /> Notifications
            <div>
              <small style="opacity: 0.7;">Manage your notification preferences</small>
            </div>
          </tedi-select-option>
          <tedi-select-option [value]="'option5'" [label]="'Logout'">
            <tedi-icon name="logout" /> Logout
          </tedi-select-option>
        </tedi-select>
      </form>
      <div style="margin-top: 16px;">
        <strong>Selected values:</strong> {{ form.get('selectedOptions').value | json }}
      </div>
    `,
    props: {
      ...args,
      form: new FormGroup({
        selectedOptions: new FormControl([]),
      }),
    },
  }),
};

export const MultiselectProgrammaticControl: Story = {
  args: {
    multiselect: true,
    placeholder: "Select multiple options...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows how to programmatically manipulate the selected values in a multiselect dropdown.",
      },
    },
  },
  render: (args) => ({
    template: `
      <form [formGroup]="form">
        <tedi-select formControlName="selectedOptions" [multiselect]="multiselect" [placeholder]="placeholder">
          <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
          <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
          <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
          <tedi-select-option [value]="'option4'" [label]="'Option 4'">Option 4</tedi-select-option>
          <tedi-select-option [value]="'option5'" [label]="'Option 5'">Option 5</tedi-select-option>
        </tedi-select>
      </form>

      <div style="margin-top: 16px;">
        <strong>Selected values:</strong> {{ form.get('selectedOptions').value | json }}
      </div>

      <div style="margin-top: 16px;">
        <button (click)="selectAll()">Select All</button>
        <button (click)="selectNone()">Select None</button>
        <button (click)="toggleOption('option3')">Toggle Option 3</button>
      </div>
    `,
    props: {
      ...args,
      form: new FormGroup({
        selectedOptions: new FormControl(["option1"]),
      }),
      selectAll: function (this: any) {
        this.form
          .get("selectedOptions")
          .setValue(["option1", "option2", "option3", "option4", "option5"]);
      },
      selectNone: function (this: any) {
        this.form.get("selectedOptions").setValue([]);
      },
      toggleOption: function (this: any, value: string) {
        const currentValues = this.form.get("selectedOptions").value || [];
        const index = currentValues.indexOf(value);

        if (index === -1) {
          this.form.get("selectedOptions").setValue([...currentValues, value]);
        } else {
          const newValues = [...currentValues];
          newValues.splice(index, 1);
          this.form.get("selectedOptions").setValue(newValues);
        }
      },
    },
  }),
};
