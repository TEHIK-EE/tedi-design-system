import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { InputGroupComponent } from "./input-group.component";
import { FeedbackTextType, LabelComponent } from "@tehik-ee/tedi-angular/tedi";
import { InputComponent } from "../input/input.component";
import { SelectComponent } from "../select/select.component";
import { SelectOptionComponent } from "../select/select-option.component";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { indexId } from "community/helpers/unique-id";

interface StoryArgs {
  disabled: boolean;
  feedbackText: string;
  feedbackTextType: FeedbackTextType;
  prefixText: string;
  suffixText: string;
  showPrefix: boolean;
  showSuffix: boolean;
}

type StoryComponent = InputGroupComponent & StoryArgs;
type Story = StoryObj<StoryComponent>;

/**
 * InputGroupComponent is a component that allows you to group multiple input elements together.
 *
 * Use prefix-slot, suffix-slot and unnamed slots to add input elements to the group.
 * Has custom handling for tedi-select. Ensure when using it to surround it in containers for proper styling.
 */

const meta: Meta<StoryComponent> = {
  title: "Community/Form/InputGroup",
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
  },
};

const currentArgs = `
  [labelID]="labelID" [label]="label" [disabled]="disabled"
  [feedback]="{ text: feedbackText, type: feedbackTextType}"`;
const renderPrefix = (showBool: boolean, slot: string) =>
  showBool ? `<div ${slot}-slot>{{${slot}Text}}</div>` : "";

const defaultId = indexId("label-id");

export const Default: Story = {
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        InputGroupComponent,
        InputComponent,
        LabelComponent,
        SelectComponent,
        SelectOptionComponent,
      ],
    }),
  ],
  args: {
    label: "Address",
    prefixText: "Street",
    suffixText: "City",
  },

  render: (args) => {
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
type SelectComponentType = InputGroupComponent & SelectStoryArgs;
type SelectStory = StoryObj<SelectComponentType>;

const renderSelectPrefix = (
  showBool: boolean,
  slot = "prefix-slot",
  form = false
) => {
  if (!showBool) return "";
  return `
  <tedi-select ${slot} [placeholder]="prefixText" inputId="selectID"${form ? ` formControlName="${slot}"` : ""}>
    <tedi-select-option *ngFor="let option of selectOptions" [value]="option" [label]="option" />
  </tedi-select>`;
};

const selectId = indexId("label-id");

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
      template: renderSelect(args),
    };
  },
};

export default meta;

const disabledSelectId = indexId("label-id");

const renderSelect = (args: SelectStoryArgs, form = false) => `
  <tedi-input-group ${currentArgs}>
    ${renderSelectPrefix(args.showPrefix, undefined, form)}
    <input [id]="labelID" tedi-input [disabled]="disabled" />
    ${renderSelectPrefix(args.showSuffix, "suffix-slot", form)}
  </tedi-input-group>
`;

export const Disabled: SelectStory = {
  ...Default,
  argTypes: {
    selectOptions: {
      control: "object",
      description: "Array of options for the select element",
    },
  },
  args: {
    disabled: true,
    selectOptions: ["Option 1", "Option 2", "Option 3"],
  },

  render: (args) => {
    const control = new FormGroup({
      "prefix-slot": new FormControl({ value: "", disabled: true }),
      "suffix-slot": new FormControl({ value: "", disabled: true }),
    });
    const { ...rest } = args;
    rest.labelID = rest.labelID ?? disabledSelectId;

    return {
      props: {
        control,
        ...rest,
      },

      template: `<form [formGroup]="control">${renderSelect(args, true)}</form>`,
    };
  },
};

const prefixOnlyId = indexId("label-id");

export const PrefixOnly: SelectStory = {
  ...Default,
  args: {
    labelID: prefixOnlyId,
    showPrefix: false,
  },
};

const suffixOnlyId = indexId("label-id");

export const SuffixOnly: SelectStory = {
  ...Default,
  args: {
    showSuffix: false,
    labelID: suffixOnlyId,
  },
};

const PrefixOnlySelectId = indexId("label-id");

export const PrefixOnlySelect: SelectStory = {
  ...Select,
  args: {
    showPrefix: false,
    labelID: PrefixOnlySelectId,
  },
};

const suffixOnlySelectId = indexId("label-id");

export const SuffixOnlySelect: SelectStory = {
  ...Select,
  args: {
    showSuffix: false,
    labelID: suffixOnlySelectId,
  },
};
