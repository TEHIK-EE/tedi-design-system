import { Meta, StoryObj } from "@storybook/angular";
import { FormFieldComponent } from "./form-field.component";

export default {
  title: "Community Angular/Form/FormField",
  component: FormFieldComponent,
  render: () => ({
    template: `<tedi-form-field></tedi-form-field>`,
  }),
} as Meta<FormFieldComponent>;

type FormFieldStory = StoryObj<FormFieldComponent>;

export const Default: FormFieldStory = {};
