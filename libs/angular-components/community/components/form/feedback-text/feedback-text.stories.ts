import {
  argsToTemplate,
  Meta,
  StoryObj,
  moduleMetadata,
  StoryFn,
} from "@storybook/angular";
import { FeedbackTextComponent } from "./feedback-text.component";

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/67d4de-formhelper" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "Community Angular/Form/FeedbackText",
  component: FeedbackTextComponent,
  decorators: [
    moduleMetadata({
      imports: [FeedbackTextComponent],
    }),
  ],
  argTypes: {
    ngContent: {
      name: "ng-content",
      description: "Helper text",
      control: "text",
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

type TemplateType = FeedbackTextComponent & { ngContent: string };
const Template: StoryFn<TemplateType> = ({ ngContent, ...args }) => ({
  props: { ...args, ngContent },
  template: `
        <div tedi-feedback-text ${argsToTemplate(args)}>
            ${ngContent}
        </div>
    `,
});

export const Default: StoryObj<TemplateType> = {
  args: {
    ngContent: "I am a hint text",
  },
  render: Template,
};

export const Error: StoryObj<TemplateType> = {
  args: {
    ngContent: "I am an error text",
    type: "error",
  },
  render: Template,
};

export const Valid: StoryObj<TemplateType> = {
  args: {
    ngContent: "I am a valid text",
    type: "valid",
  },
  render: Template,
};

export const PositionLeft: StoryObj<TemplateType> = {
  args: {
    ngContent: "I am a hint text",
    position: "left",
  },
  render: Template,
};

export const PositionRight: StoryObj<TemplateType> = {
  args: {
    ngContent: "I am a hint text",
    position: "right",
  },
  render: Template,
};
