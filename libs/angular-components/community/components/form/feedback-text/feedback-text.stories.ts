import { Meta, StoryObj } from "@storybook/angular";
import {
  FeedbackTextComponent,
  FeedbackTextType,
} from "./feedback-text.component";

export default {
  title: "Community Angular/Form/FeedbackText",
  component: FeedbackTextComponent,
  render: (props) => ({
    props,
    template: `<tedi-feedback-text [type]="type">{{ feedbackText }}</tedi-feedback-text>`,
  }),
  args: {
    feedbackText: "This is a feedback text message",
    type: "hint",
  },
  argTypes: {
    feedbackText: {
      control: "text",
      description: "The text content of the feedback",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    type: {
      control: "radio",
      options: ["hint", "error", "valid"],
      description: "Type of feedback text which determines styling",
      table: {
        defaultValue: { summary: "hint" },
        type: {
          summary: '"hint" | "error" | "valid"',
        },
      },
    },
  },
} as Meta<FeedbackTextComponent>;

type FeedbackTextStory = StoryObj<FeedbackTextComponent>;

export const Hint: FeedbackTextStory = {
  args: {
    feedbackText: "This is a hint message that provides additional information",
    type: "hint",
  },
};

export const Error: FeedbackTextStory = {
  args: {
    feedbackText: "This is an error message indicating something went wrong",
    type: "error",
  },
};

export const Valid: FeedbackTextStory = {
  args: {
    feedbackText: "This is a validation success message",
    type: "valid",
  },
};

export const AllTypes: FeedbackTextStory = {
  render: () => ({
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <tedi-feedback-text type="hint">This is a hint message that provides additional information</tedi-feedback-text>
        </div>
        <div style="margin-bottom: 16px;">
          <tedi-feedback-text type="error">This is an error message indicating something went wrong</tedi-feedback-text>
        </div>
        <div style="margin-bottom: 16px;">
          <tedi-feedback-text type="valid">This is a validation success message</tedi-feedback-text>
        </div>
      </div>
    `,
  }),
};
