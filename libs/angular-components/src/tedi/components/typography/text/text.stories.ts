import { Meta, StoryObj } from "@storybook/angular";
import { TextComponent } from "./text.component";

export default {
  title: "TEDI-Ready Angular/Base/Typography/Text",
  component: TextComponent,
  argTypes: {
    element: {
      control: "select",
      options: [
        "p",
        "div",
        "span",
        "li",
        "label",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
      table: {
        defaultValue: { summary: "p" },
      },
    },
    modifiers: {
      control: "multi-select",
      options: [
        "normal",
        "small",
        "bold",
        "thin",
        "italic",
        "center",
        "left",
        "right",
        "nowrap",
        "break-all",
        "break-word",
        "break-spaces",
        "uppercase",
        "lowercase",
        "capitalize",
        "capitalize-first",
        "inline-block",
        "inline",
        "line-normal",
        "line-condensed",
        "subtitle",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "white",
        "disabled",
        "brand",
        "success",
        "warning",
        "danger",
        "info",
        "neutral",
      ],
      defaultValue: "primary",
    },
  },
} as Meta<TextComponent>;

export const Default: StoryObj<TextComponent> = {
  args: {
    element: "p",
    color: "primary",
  },
  render: (args) => ({
    props: args,
    template: `<tedi-text 
      [element]="element" 
      [color]="color" 
      [modifiers]="modifiers" 
      [class]="class" 
      [id]="id" 
      [tabIndex]="tabIndex">Test</tedi-text>`,
  }),
};
