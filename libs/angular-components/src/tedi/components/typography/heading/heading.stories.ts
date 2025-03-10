import { Meta, StoryObj } from "@storybook/angular";
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
      table: {
        readonly: true,
      },
    },
    id: {
      type: "string",
      description: "ID attribute",
      table: {
        readonly: true,
      },
    },
    tabIndex: {
      type: "number",
      description: "Allows to focus the element",
      table: {
        readonly: true,
      },
    },
    element: {
      description: "Base element",
      table: {
        type: { summary: "HeadingModifiers" },
        defaultValue: { summary: '"h1"' },
      },
    },
    modifiers: {
      description: "Single or multiple modifiers to change the text behavior",
      table: { type: { summary: "TextModifiers[] | TextModifiers" } },
    },
    color: {
      description: "Color of the text",
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
