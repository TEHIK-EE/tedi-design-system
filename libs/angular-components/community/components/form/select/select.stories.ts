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
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Basic: Story = {
  render: () => ({
    template: `
      <tedi-select [placeholder]="'Select an option...'">
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
  render: () => ({
    template: `
      <tedi-select [(ngModel)]="selectedValue" [placeholder]="'Select an option...'">
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
      selectedValue: "option2",
    },
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <tedi-select [disabled]="true" [placeholder]="'Disabled select'">
        <tedi-select-option [value]="'option1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};

export const ValidState: Story = {
  render: () => ({
    template: `
      <tedi-select [state]="'valid'" [placeholder]="'Valid select'">
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};

export const ErrorState: Story = {
  render: () => ({
    template: `
      <tedi-select [state]="'error'" [placeholder]="'Error select'">
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};

export const SmallSize: Story = {
  render: () => ({
    template: `
      <tedi-select [size]="'small'" [placeholder]="'Small select'">
        <tedi-select-option [value]="'option1'" [label]="'Option 1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'" [label]="'Option 2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'" [label]="'Option 3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};
