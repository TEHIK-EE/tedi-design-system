import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectComponent } from "./select.component";
import { SelectOptionComponent } from "./select-option.component";

const meta: Meta<SelectComponent> = {
  title: "Community/Form/Select",
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SelectComponent,
        SelectOptionComponent,
        FormsModule,
        ReactiveFormsModule,
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
        <tedi-select-option [value]="'option1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};

export const WithPreselected: Story = {
  render: () => ({
    template: `
      <tedi-select [(ngModel)]="selectedValue" [placeholder]="'Select an option...'">
        <tedi-select-option [value]="'option1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
    props: {
      selectedValue: "option2",
    },
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <tedi-select [isDisabled]="true" [placeholder]="'Disabled select'">
        <tedi-select-option [value]="'option1'">Option 1</tedi-select-option>
        <tedi-select-option [value]="'option2'">Option 2</tedi-select-option>
        <tedi-select-option [value]="'option3'">Option 3</tedi-select-option>
      </tedi-select>
    `,
  }),
};
