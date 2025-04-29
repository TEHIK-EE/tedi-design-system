import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectComponent } from "./select.component";
import { SelectOptionComponent } from "./select-option.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

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
  },
  args: {
    placeholder: "Select an option...",
    disabled: false,
    state: "default",
    size: "default",
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
        <tedi-select-option [value]="'option0'" [label]="'Option 0'">
        </tedi-select-option>
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
      <tedi-select [(ngModel)]="selectedValue" [placeholder]="placeholder">
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">
          <tedi-icon name="login" /> Option 1 <small> Some description here also </small>
        </tedi-select-option>
        <tedi-select-option [value]="'option12'" [label]="'Option 12'">Option 12</tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
      </tedi-select>
      (ngModel): {{ selectedValue }}
    `,
    props: {
      ...args,
      selectedValue: "option2",
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
