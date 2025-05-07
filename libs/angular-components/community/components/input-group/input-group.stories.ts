import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";

import { VerticalSpacingDirective } from "@tehik-ee/tedi-angular/tedi";
import { InputGroupComponent } from "./input-group.component";
import { FeedbackTextType, InputComponent, LabelComponent } from "../form";

/**
 * InputGroupComponent is a component that allows you to group multiple input elements together.
 *
 * Use prefix-slot, suffix-slot and unnamed slots to add input elements to the group.
 *
 */

let id = 0;

const uniqueId = (prefix: string) => {
  return `${prefix}-${id++}`;
};

interface StoryArgs {
  disabled: boolean;
  feedbackText: string;
  feedbackTextType: FeedbackTextType;
  prefixText: string;
  suffixText: string;
  showPrefix: boolean;
  showSuffix: boolean;
  height: number;
  width: number;
}

type StoryComponent = InputGroupComponent & StoryArgs;
type Story = StoryObj<StoryComponent>;

const meta: Meta<StoryComponent> = {
  title: "Community Angular/Form/InputGroup",
  component: InputGroupComponent,
  argTypes: {
    label: {
      control: "text",
      description: "Label for the text group",
    },
    labelID: {
      control: "text",
      description: "ID for the text group's label",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state of the input group",
    },
    feedbackText: {
      control: "text",
      description: "Feedback text for the input group",
    },
    feedbackTextType: {
      control: "select",
      options: ["hint", "valid", "error"],
      description: "Type of the feedback text",
    },
    prefixText: {
      control: "text",
      description: "Text to be displayed in the prefix slot",
    },
    suffixText: {
      control: "text",
      description: "Text to be displayed in the affix slot",
    },
    showPrefix: {
      control: "boolean",
      description: "Provide prefix slot",
    },
    showSuffix: {
      control: "boolean",
      description: "Provide suffix slot",
    },
    width: {
      control: "number",
      description: "Width of the input group input",
    },
  },
  args: {
    label: "Label",
    disabled: false,
    feedbackText: "Feedback text",
    feedbackTextType: "error",
    prefixText: "Prefix",
    suffixText: "Suffix",
    showPrefix: true,
    showSuffix: true,
    width: 400,
  },
};

const currentArgs =
  '[labelID]="labelID" [label]="label" [disabled]="disabled" [feedbackText]="feedbackText" [feedbackTextType]="feedbackTextType"';
const renderPrefix = (showBool: boolean, slot: string) =>
  showBool ? `<div ${slot}-slot>{{${slot}Text}}</div>` : "";

export const Default: Story = {
  decorators: [
    moduleMetadata({
      imports: [
        VerticalSpacingDirective,
        InputGroupComponent,
        InputComponent,
        LabelComponent,
      ],
    }),
  ],
  args: {
    label: "Address",
    prefixText: "Street",
    suffixText: "City",
  },

  render: (args) => {
    const defaultId = uniqueId("label-id");

    const { ...rest } = args;
    rest.labelID = rest.labelID ?? defaultId;

    return {
      props: rest,
      template: `
      <tedi-input-group ${currentArgs}>
        ${renderPrefix(args.showPrefix, "prefix")}
        <input tedi-input [id]="labelID" [disabled]="disabled" />
        ${renderPrefix(args.showSuffix, "suffix")}
      </tedi-input-group>
    `,
    };
  },
};

interface SelectStoryArgs extends StoryArgs {
  selectOptions: string[];
}
type SelectComponent = InputGroupComponent & SelectStoryArgs;
type SelectStory = StoryObj<SelectComponent>;

const renderSelectPrefix = (showBool: boolean) => {
  if (!showBool) return "";
  return `
  <select prefix-slot [name]=prefixText style="">
    <option>{{prefixText}}</option>
    <option *ngFor="let option of selectOptions" [value]="option">{{option}}</option>
  </select>`;
};

const selectId = uniqueId("label-id");

export const Select: SelectStory = {
  ...Default,
  argTypes: {
    selectOptions: {
      control: "object",
      description: "Array of options for the select element",
    },
  },
  args: {
    labelID: "select-label-id",
    selectOptions: ["Option 1", "Option 2", "Option 3"],
  },

  render: (args) => {
    const { ...rest } = args;
    rest.labelID = rest.labelID ?? selectId;

    return {
      props: { ...rest },
      template: `
      <tedi-input-group ${currentArgs}>
        ${renderSelectPrefix(args.showPrefix)}
        <input [id]="labelID" tedi-input [disabled]="disabled" />
        ${renderPrefix(args.showSuffix, "suffix")}
      </tedi-input-group>
    `,
    };
  },
};

export default meta;
