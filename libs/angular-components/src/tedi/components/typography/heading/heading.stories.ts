import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { HeadingComponent } from "./heading.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/4651ec-typography" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready Angular/Base/Typography/Heading",
  component: HeadingComponent,
  argTypes: {
    class: {
      type: "string",
      description: "Additional class",
    },
    id: {
      type: "string",
      description: "ID attribute",
    },
    tabIndex: {
      type: "number",
      description: "Allows to focus the element",
    },
    element: {
      description: "Base element",
      control: {
        type: "select",
      },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      table: {
        type: { summary: "HeadingModifiers" },
        defaultValue: { summary: '"h1"' },
      },
    },
    modifiers: {
      description: "Single or multiple modifiers to change the text behavior",
      control: {
        type: "multi-select",
      },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
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
      ],
      table: { type: { summary: "TextModifiers[] | TextModifiers" } },
    },
    color: {
      description: "Color of the text",
      control: {
        type: "select",
      },
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
      table: {
        type: { summary: "TextColor" },
        defaultValue: { summary: '"primary"' },
      },
    },
  },
} as Meta<HeadingComponent>;

export const Default: StoryObj<HeadingComponent> = {
  render: (args) => ({
    props: args,
    template: `<tedi-heading ${argsToTemplate(args)}>Heading</tedi-heading>`,
  }),
};

export const Headings: StoryObj<HeadingComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="example-list">
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="border-bottom border-bottom--3x padding-14-16"
        >
          <span>Desktop</span>
          <span>Mobile</span>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-heading>Heading H1</tedi-heading>
          <tedi-heading class="mobile" modifiers="h1">Heading H1</tedi-heading>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-heading element="h2">Heading H2</tedi-heading>
          <tedi-heading element="h2" class="mobile" modifiers="h2">Heading H2</tedi-heading>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-heading element="h3">Heading H3</tedi-heading>
          <tedi-heading element="h3" class="mobile" modifiers="h3">Heading H3</tedi-heading>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-heading element="h4">Heading H4</tedi-heading>
          <tedi-heading element="h4" class="mobile" modifiers="h4">Heading H4</tedi-heading>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-heading element="h5">Heading H5</tedi-heading>
          <tedi-heading element="h5" class="mobile" modifiers="h5">Heading H5</tedi-heading>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16"
        >
          <tedi-heading element="h6">Heading H6</tedi-heading>
          <tedi-heading element="h6" class="mobile" modifiers="h6">Heading H6</tedi-heading>
        </div>
      </div>
    `,
  }),
};

export const CustomModifier: StoryObj<HeadingComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <div class="example-list">
            <div class="padding-14-16 border-bottom">
                <tedi-heading element="h4" [modifiers]="['h1', 'bold']" color="warning">
                  H4 heading with H1 styles and warning color
                </tedi-heading>
            </div>
            <div class="padding-14-16 border-bottom">
                <tedi-heading element="h2" [modifiers]="['normal', 'bold']" color="brand">
                  H2 heading with normal bold text and brand color
                </tedi-heading>
            </div>
            <div class="padding-14-16 border-bottom">
                <tedi-heading element="h1" modifiers="normal">
                  H1 heading with normal text styles
                </tedi-heading>
            </div>
        </div>
    `,
  }),
};
