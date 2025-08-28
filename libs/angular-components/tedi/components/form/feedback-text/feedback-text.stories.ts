import {
  argsToTemplate,
  Meta,
  StoryObj,
  moduleMetadata,
  StoryFn,
} from "@storybook/angular";
import { FeedbackTextComponent } from "./feedback-text.component";

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/67d4de-formhelper" target="_blank">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready/Components/Form/FeedbackText",
  component: FeedbackTextComponent,
  decorators: [
    moduleMetadata({
      imports: [FeedbackTextComponent],
    }),
  ],
  parameters: {
    status: {
      type: ["devComponent"],
    },
  },
  argTypes: {
    text: {
      description: "Helper text",
      control: "text",
      table: {
        category: "inputs",
      },
    },
    type: {
      description: "Type of form-helper.",
      control: "select",
      options: ["hint", "valid", "error"],
      table: {
        category: "inputs",
        type: { summary: "FeedbackTextType", detail: "hint \nvalid \nerror" },
        defaultValue: {
          summary: "hint",
        },
      },
    },
    position: {
      description: "Position of the helper.",
      control: "select",
      options: ["left", "right"],
      table: {
        category: "inputs",
        type: { summary: "FeedbackTextPosition", detail: "left \nright" },
        defaultValue: {
          summary: "left",
        },
      },
    },
  },
} as Meta<FeedbackTextComponent>;

const Template: StoryFn<FeedbackTextComponent> = (args) => ({
  props: args,
  template: `<tedi-feedback-text ${argsToTemplate(args)} />`,
});

export const Default: StoryObj<FeedbackTextComponent> = {
  args: {
    text: "I am a hint text",
  },
  render: Template,
};

export const Error: StoryObj<FeedbackTextComponent> = {
  args: {
    text: "I am an error text",
    type: "error",
  },
  render: Template,
};

export const Valid: StoryObj<FeedbackTextComponent> = {
  args: {
    text: "I am a valid text",
    type: "valid",
  },
  render: Template,
};

export const PositionLeft: StoryObj<FeedbackTextComponent> = {
  args: {
    text: "I am a hint text",
    position: "left",
  },
  render: Template,
};

export const PositionRight: StoryObj<FeedbackTextComponent> = {
  args: {
    text: "I am a hint text",
    position: "right",
  },
  render: Template,
};
