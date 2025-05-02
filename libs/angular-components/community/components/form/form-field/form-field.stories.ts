import { moduleMetadata, StoryObj, Meta } from "@storybook/angular";
import { FormFieldComponent } from "./form-field.component";
import { InputComponent } from "../input/input.component";
import { FeedbackTextComponent } from "../feedback-text/feedback-text.component";
import { LabelComponent } from "../label/label.component";

export default {
  title: "Community Angular/Form/FormField",
  component: FormFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [InputComponent, FeedbackTextComponent, LabelComponent],
    }),
  ],
  argTypes: {
    required: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    hintText: { control: "text" },
    validText: { control: "text" },
    errorText: { control: "text" },
    disabled: { control: "boolean" },
    state: { control: "radio", options: ["error", "valid", "default"] },
  },
} as Meta<FormFieldComponent>;

type Story = StoryObj<FormFieldComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-form-field>
        <label tedi-label for="storybook-input" [required]="required">{{label}}</label>
        <input tedi-input id="storybook-input" [placeholder]="placeholder" [disabled]="disabled" [state]="state" />
        @if (errorText) {
          <tedi-feedback-text type="error" [text]="errorText" />
        } @else if (validText) {
          <tedi-feedback-text type="valid" [text]="validText" />
        } @else if (hintText) {
          <tedi-feedback-text type="hint" [text]="hintText" />
        }
      </tedi-form-field>
    `,
  }),
  args: {
    required: true,
    label: "Name",
    placeholder: "Placeholder",
    hintText: "Feedback hint text",
    validText: "",
    errorText: "",
    disabled: false,
  },
};

export const WithValidFeedback: Story = {
  ...Default,
  args: {
    ...Default.args,
    state: "valid",
    hintText: "",
    validText: "Feedback valid text",
  },
};

export const WithErrorFeedback: Story = {
  ...Default,
  args: {
    ...Default.args,
    required: true,
    state: "error",
    hintText: "",
    errorText: "Feedback error text",
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithTextarea: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-form-field>
        <label tedi-label for="storybook-textarea" [required]="required">{{label}}</label>
        <textarea tedi-input id="storybook-textarea" [placeholder]="placeholder" [disabled]="disabled" [state]="state" rows="4"></textarea>
        @if (errorText) {
          <tedi-feedback-text type="error" [text]="errorText" />
        } @else if (validText) {
          <tedi-feedback-text type="valid" [text]="validText" />
        } @else if (hintText) {
          <tedi-feedback-text type="hint" [text]="hintText" />
        }
      </tedi-form-field>
    `,
  }),
  args: {
    ...Default.args,
    label: "Description",
    placeholder: "Enter a longer description here",
  },
};
