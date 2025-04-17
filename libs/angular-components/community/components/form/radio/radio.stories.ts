import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";

import { CommonModule } from "@angular/common";
import { RadioGroupComponent } from "./radio-group/radio-group.component";
import { RadioComponent } from "./radio/radio.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

export default {
  title: "Community Angular/Form/Radio",
  component: RadioGroupComponent,
  subcomponents: {
    RadioComponent,
  },
  args: {
    size: "default",
    direction: "column",
    spacing: 4,
    disabled: false,
    hasError: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "large"],
      description: "Defines the size of the radios in radio group",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    direction: {
      control: "radio",
      options: ["column", "row"],
      description: "Defines direction in which radios flow",
      table: {
        defaultValue: { summary: "column" },
      },
    },
    spacing: {
      control: "number",
      description: "Defines spacing betweeen radios in px",
      table: {
        defaultValue: { summary: "4" },
      },
    },
    disabled: {
      description:
        "Whether group is disabled. Do not use with controlled groups",
      control: {
        type: "boolean",
      },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    hasError: {
      description: "Whether group has error",
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
        RadioGroupComponent,
        RadioComponent,
        ReactiveFormsModule,
      ],
    }),
  ],
} as Meta<RadioGroupComponent>;

type RadioGroupStory = StoryObj<RadioGroupComponent>;

export const Default: RadioGroupStory = {
  render: (args) => {
    const control = new FormControl();
    return {
      props: { ...args, control },
      template: `
      <tedi-radio-group
        id="radio-group"
        name="radio-story"
        [formControl]="control"
        ${argsToTemplate(args)}
        (change)="onGroupChange($event)"
      >
        <tedi-radio name="test" inputId="radio-1" value="radio-1"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-2" value="radio-2"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-3" value="radio-3"
          >Raadio 3</tedi-radio
        >
      </tedi-radio-group>
      `,
    };
  },
};

export const Disabled: RadioGroupStory = {
  render: () => {
    const control = new FormControl({ value: "radio-1", disabled: true });
    return {
      props: { control },
      template: `
      <tedi-radio-group
        id="radio-group"
        name="radio-story"
        [formControl]="control"
        (change)="onGroupChange($event)"
      >
        <tedi-radio name="test" inputId="radio-1" value="radio-1"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-2" value="radio-2"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-3" value="radio-3"
          >Raadio 3</tedi-radio
        >
      </tedi-radio-group>
      `,
    };
  },
};

export const Large: RadioGroupStory = {
  render: () => {
    const control = new FormControl();
    return {
      props: { control },
      template: `
      <tedi-radio-group
        id="radio-group"
        name="radio-story"
        size="large"
        [spacing]="8"
        [formControl]="control"
        (change)="onGroupChange($event)"
      >
        <tedi-radio name="test" inputId="radio-1" value="radio-1"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-2" value="radio-2"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-3" value="radio-3"
          >Raadio 3</tedi-radio
        >
      </tedi-radio-group>
      `,
    };
  },
};

export const WithErrorAndFeedback: RadioGroupStory = {
  render: () => {
    const control = new FormControl();
    return {
      props: { control },
      template: `
      <tedi-radio-group
        id="radio-group"
        name="radio-story"
        [hasError]="true"
        [formControl]="control"
        [feedbackText]="{ text: 'Error message', type: 'error' }"
        (change)="onGroupChange($event)"
      >
        <tedi-radio name="test" inputId="radio-1" value="radio-1"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-2" value="radio-2"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-3" value="radio-3"
          >Raadio 3</tedi-radio
        >
      </tedi-radio-group>
      `,
    };
  },
};

export const RadioWithDescription: RadioGroupStory = {
  render: () => {
    const control = new FormControl();
    return {
      props: { control },
      template: `
      <tedi-radio-group
        id="radio-group"
        name="radio-story"
        [formControl]="control"
        (change)="onGroupChange($event)"
      >
        <tedi-radio name="test" inputId="radio-1" value="radio-1"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-2" value="radio-2" [feedbackText]="{ text: 'Description' }"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-3" value="radio-3"
          >Raadio 3</tedi-radio
        >
      </tedi-radio-group>
      `,
    };
  },
};
