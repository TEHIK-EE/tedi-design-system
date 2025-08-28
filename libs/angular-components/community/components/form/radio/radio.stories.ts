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
import { RadioCardGroupComponent } from "./radio-card-group/radio-card-group.component";

export default {
  title: "Community/Form/Radio",
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
        RadioCardGroupComponent,
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
        id="radio-group-disabled"
        name="radio-story-disabled"
        [formControl]="control"
      >
        <tedi-radio name="test" inputId="radio-disabled-1" value="radio-1"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-disabled-2" value="radio-2"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-disabled-3" value="radio-3"
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
        id="radio-group-large"
        name="radio-story-large"
        size="large"
        [spacing]="8"
        [formControl]="control"
      >
        <tedi-radio name="test" inputId="radio-large-1" value="radio-1"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-large-2" value="radio-2"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-large-3" value="radio-3"
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
        id="radio-group-error-feedback"
        name="radio-story-error-feedback"
        [hasError]="true"
        [formControl]="control"
        [feedbackText]="{ text: 'Error message', type: 'error' }"
      >
        <tedi-radio name="test" inputId="radio-error-feedback-1" value="radio-1"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-error-feedback-2" value="radio-2"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-error-feedback-3" value="radio-3"
          >Raadio 3</tedi-radio
        >
      </tedi-radio-group>
      `,
    };
  },
};

export const CardError: RadioGroupStory = {
  render: () => {
    const control = new FormControl();
    return {
      props: { control },
      template: `
      <tedi-radio-card-group
        id="radio-group-error-feedback"
        name="radio-story-error-feedback"
        [formControl]="control"
        [feedbackText]="{ text: 'Error message', type: 'error' }"
        [hasIndicator]="false"
        [hasError]="true"
      >
        <tedi-radio name="test" inputId="radio-error-feedback-1" value="radio-1" [hasError]="true"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-error-feedback-2" value="radio-2" [hasError]="true"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-error-feedback-3" value="radio-3" [hasError]="true"
          >Raadio 3</tedi-radio
        >
      </tedi-radio-card-group>
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
        id="radio-group-description"
        name="radio-story-description"
        [formControl]="control"
      >
        <tedi-radio name="test" inputId="radio-description-1" value="radio-1"
          >Raadio 1</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-description-2" value="radio-2" [feedbackText]="{ text: 'Description' }"
          >Raadio 2</tedi-radio
        >
        <tedi-radio name="test" inputId="radio-description-3" value="radio-3"
          >Raadio 3</tedi-radio
        >
      </tedi-radio-group>
      `,
    };
  },
};

export const RadioCardGroups: RadioGroupStory = {
  render: () => {
    return {
      template: `
      <div style="display: grid; gap: 16px; grid-template-columns: 1fr 1fr;">
        <div>
          <h2>Primary</h2>
          <tedi-radio-card-group
            id="radio-card-group-primary-plain"
            name="radio-card-group-primary-plain"
            [hasIndicator]="false"
          >
            <tedi-radio name="test" inputId="radio-primary-plain-1" value="radio-1"
              >Raadio 1</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-primary-plain-2" value="radio-2"
              >Raadio 2</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-primary-plain-3" value="radio-3"
              >Raadio 3</tedi-radio
            >
          </tedi-radio-card-group>
        </div>

        <div>
          <h2>Secondary</h2>
          <tedi-radio-card-group
            id="radio-card-group-secondary-plain"
            name="radio-card-group-secondary-plain"
            variant="secondary"
            [hasIndicator]="false"
          >
            <tedi-radio name="test" inputId="radio-secondary-plain-1" value="radio-1"
              >Raadio 1</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-secondary-plain-2" value="radio-2"
              >Raadio 2</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-secondary-plain-3" value="radio-3"
              >Raadio 3</tedi-radio
            >
          </tedi-radio-card-group>
        </div>

        <div>
          <tedi-radio-card-group
            id="radio-card-group-primary-indicator"
            name="radio-card-group-primary-indicator"
          >
            <tedi-radio name="test" inputId="radio-primary-indicator-1" value="radio-1"
              >Raadio 1</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-primary-indicator-2" value="radio-2"
              >Raadio 2</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-primary-indicator-3" value="radio-3"
              >Raadio 3</tedi-radio
            >
          </tedi-radio-card-group>
        </div>

        <div>
          <tedi-radio-card-group
            id="radio-card-group-secondary-indicator"
            name="radio-card-group-secondary-indicator"
            variant="secondary"
          >
            <tedi-radio name="test" inputId="radio-secondary-indicator-1" value="radio-1"
              >Raadio 1</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-secondary-indicator-2" value="radio-2"
              >Raadio 2</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-secondary-indicator-3" value="radio-3"
              >Raadio 3</tedi-radio
            >
          </tedi-radio-card-group>
        </div>

        <div>
          <tedi-radio-card-group
            id="radio-card-group-primary-stacked"
            name="radio-card-group-primary-stacked"
            [spacing]="0"
            [hasIndicator]="false"
          >
            <tedi-radio name="test" inputId="radio-primary-stacked-1" value="radio-1"
              >Raadio 1</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-primary-stacked-2" value="radio-2"
              >Raadio 2</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-primary-stacked-3" value="radio-3"
              >Raadio 3</tedi-radio
            >
          </tedi-radio-card-group>
        </div>

        <div>
          <tedi-radio-card-group
            id="radio-card-group-secondary-stacked"
            name="radio-card-group-secondary-stacked"
            variant="secondary"
            [spacing]="0"
            [hasIndicator]="false"
          >
            <tedi-radio name="test" inputId="radio-secondary-stacked-1" value="radio-1"
              >Raadio 1</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-secondary-stacked-2" value="radio-2"
              >Raadio 2</tedi-radio
            >
            <tedi-radio name="test" inputId="radio-secondary-stacked-3" value="radio-3"
              >Raadio 3</tedi-radio
            >
          </tedi-radio-card-group>
        </div>
      </div>
      `,
    };
  },
};
