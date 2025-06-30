import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { Select2Component } from "./select2.component";
import { Select2OptionComponent } from "./select2option.component";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IconComponent } from "tedi/components";

export default {
  title: "Community Angular/Form/Select2",
  component: Select2Component,
  decorators: [
    moduleMetadata({
      imports: [
        Select2Component,
        Select2OptionComponent,
        ReactiveFormsModule,
        IconComponent,
      ],
    }),
  ],
  render: () => ({
    template: `
      <select2 inputId="1" label="Select an option" placeholder="Select an option" [feedbackText]="{text:'Something'}">
        <select2-option value="option1" label="Option 1" />
        <select2-option value="option2" label="Option 2">
          Option 2
          <div><small>Description if needed</small></div>
        </select2-option>
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

export const WithFormIntegration: Select2Story = {
  render: (args) => {
    // Create a form with a Select2 control
    const formGroup = new FormGroup({
      selection: new FormControl(["option2"]),
    });

    return {
      props: {
        formGroup,
        ...args,
        onSelectionChange: (event: unknown) => {
          console.log("Selection changed:", event);
        },
      },
      template: `
        <div [formGroup]="formGroup">
          <select2
            inputId="4"
            label="Reactive Form Example"
            placeholder="Select an option"
            formControlName="selection"
            [feedbackText]="{ text: 'Form value: ' + (formGroup.value | json) }"
            >
            <select2-option value="option1" label="Option 1"></select2-option>
            <select2-option value="option2" label="Option 2"></select2-option>
            <select2-option value="option3" label="Option 3"></select2-option>
            <select2-option value="option4" label="Option 4"></select2-option>
          </select2>

          <div style="margin-top: 20px;">
            <button (click)="formGroup.controls.selection.setValue(['option1'])">
              Select "Option 1"
            </button>
            <button (click)="formGroup.controls.selection.setValue(['option3', 'option4'])">
              Select "Option 3 & 4"
            </button>
            <button (click)="formGroup.controls.selection.reset()">
              Reset
            </button>
            <button (click)="formGroup.controls.selection.disable()">
              Disable
            </button>
            <button (click)="formGroup.controls.selection.enable()">
              Enable
            </button>
          </div>
        </div>
      `,
    };
  },
};
