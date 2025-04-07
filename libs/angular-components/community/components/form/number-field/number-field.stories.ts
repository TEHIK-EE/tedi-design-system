import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { NumberFieldComponent } from "./number-field.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4536-78765&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/90c693-number-field" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "Community Angular/Form/NumberField",
  component: NumberFieldComponent,
} as Meta<NumberFieldComponent>;

export const Default: StoryObj<NumberFieldComponent> = {
  args: {
    id: "test",
    label: "Label",
    size: "default",
    suffix: "",
    min: 0,
    defaultValue: 2,
  },
  render: (args) => ({
    props: args,
    template: `<tedi-number-field ${argsToTemplate(args)} />`,
  }),
};
