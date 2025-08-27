import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";

import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { CheckboxGroupComponent } from "./checkbox-group/checkbox-group.component";
import { CheckboxCardGroupComponent } from "./checkbox-card-group/checkbox-card-group.component";

export default {
  title: "Community/Form/Checkbox",
  component: CheckboxComponent,
  args: {
    size: "default",
    disabled: false,
    hasError: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "large"],
      description: "Defines the size of the checkbox",
    },
    disabled: {
      description:
        "Whether checkbox is disabled. Do not use with controlled checkbox",
      control: {
        type: "boolean",
      },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    hasError: {
      description: "Whether checkbox has error",
      control: {
        type: "boolean",
      },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        CheckboxComponent,
        CheckboxGroupComponent,
        CheckboxCardGroupComponent,
        ReactiveFormsModule,
      ],
    }),
  ],
} as Meta<CheckboxComponent>;

type CheckboxStory = StoryObj<CheckboxComponent>;

export const Default: CheckboxStory = {
  render: (args) => {
    const control = new FormControl({ value: true, disabled: !!args.disabled });
    return {
      props: { ...args, control },
      template: `
        <tedi-checkbox inputId="checkbox-default" [formControl]="control" ${argsToTemplate(args)}>
          Checkbox
        </tedi-checkbox>
      `,
    };
  },
};

export const Disabled: CheckboxStory = {
  render: () => {
    const control = new FormControl({ value: true, disabled: true });
    return {
      props: { control },
      template: `
        <tedi-checkbox inputId="checkbox-disabled" [formControl]="control">
          Checkbox
        </tedi-checkbox>
      `,
    };
  },
};

export const Large: CheckboxStory = {
  render: () => {
    const control = new FormControl();
    return {
      props: { control },
      template: `
        <tedi-checkbox inputId="checkbox-large" [formControl]="control" size="large">
          Checkbox
        </tedi-checkbox>
      `,
    };
  },
};

export const WithErrorAndFeedback: CheckboxStory = {
  render: () => {
    const control = new FormControl();
    return {
      props: { control },
      template: `
        <tedi-checkbox inputId="checkbox-feedback-error" [formControl]="control" [hasError]="true" [feedbackText]="{ text: 'Error message', type: 'error' }">
          Checkbox
        </tedi-checkbox>
      `,
    };
  },
};

export const WithDescription: CheckboxStory = {
  render: () => {
    const control = new FormControl();
    return {
      props: { control },
      template: `
        <tedi-checkbox inputId="checkbox-description" [formControl]="control" [feedbackText]="{ text: 'Description' }">
          Checkbox
        </tedi-checkbox>
      `,
    };
  },
};

export const CheckboxGroup: CheckboxStory = {
  render: () => {
    return {
      template: `

      <tedi-checkbox-group label="Checkbox group" style="margin-bottom: 16px;">
        <tedi-checkbox inputId="checkbox-group-1">
          Checkbox 1
        </tedi-checkbox>
        <tedi-checkbox inputId="checkbox-group-2">
          Checkbox 2
        </tedi-checkbox>
        <tedi-checkbox inputId="checkbox-group-3">
          Checkbox 3
        </tedi-checkbox>
      </tedi-checkbox-group>

      <tedi-checkbox-group label="Checkbox group row" direction="row">
        <tedi-checkbox inputId="checkbox-group-row-1">
          Checkbox 1
        </tedi-checkbox>
        <tedi-checkbox inputId="checkbox-group-row-2">
          Checkbox 2
        </tedi-checkbox>
        <tedi-checkbox inputId="checkbox-group-row-3">
          Checkbox 3
        </tedi-checkbox>
      </tedi-checkbox-group>
      `,
    };
  },
};

export const CheckboxCardGroup: CheckboxStory = {
  render: () => {
    const control = new FormControl(["check-1", "check-2"]);
    return {
      props: { control },
      template: `
      <tedi-checkbox-card-group label="Checkbox group" [formControl]="control">
        <tedi-checkbox inputId="checkbox-group-1" value="check-1">
          Checkbox 1
        </tedi-checkbox>
        <tedi-checkbox inputId="checkbox-group-2" value="check-2">
          Checkbox 2
        </tedi-checkbox>
        <tedi-checkbox inputId="checkbox-group-3" value="check-3">
          Checkbox 3
        </tedi-checkbox>
      </tedi-checkbox-card-group>
      `,
    };
  },
};
