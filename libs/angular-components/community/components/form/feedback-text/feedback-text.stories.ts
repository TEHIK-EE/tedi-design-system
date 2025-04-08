import { Meta, StoryObj } from "@storybook/angular";
import { FeedbackTextComponent } from "./feedback-text.component";

export default {
  title: "Community Angular/Form/FeedbackText",
  component: FeedbackTextComponent,
  render: (props) => ({
    props,
    template: `<tedi-feedback-text [text]="text" [type]="type">`,
  }),
  args: {
    text: "This is a feedback text message",
    type: "hint",
  },
  argTypes: {
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
    text: "This is a hint message that provides additional information",
    type: "hint",
  },
};

export const Error: FeedbackTextStory = {
  args: {
    text: "This is an error message indicating something went wrong",
    type: "error",
  },
};

export const Valid: FeedbackTextStory = {
  args: {
    text: "This is a validation success message",
    type: "valid",
  },
};

export const AllTypes: FeedbackTextStory = {
  render: () => ({
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <tedi-feedback-text type="hint" text="This is a hint message that provides additional information" />
        </div>
        <div style="margin-bottom: 16px;">
          <tedi-feedback-text type="error" text="This is an error message indicating something went wrong" />
        </div>
        <div style="margin-bottom: 16px;">
          <tedi-feedback-text type="valid" text="This is a validation success message" />
        </div>
      </div>
    `,
  }),
};
