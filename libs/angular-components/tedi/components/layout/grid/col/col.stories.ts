import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { ColComponent } from "./col.component";
import { RowComponent } from "../row/row.component";
import { createBreakpointArgTypes } from "../../../../../utils/createBreakpointArgTypes";

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/24da19-grid" target="_BLANK">Zeroheight ↗</a><br/>
 * Col component should be used together with Row component.
 */

export default {
  title: "TEDI-Ready Angular/Layout/Grid/Col",
  component: ColComponent,
  decorators: [
    moduleMetadata({
      imports: [RowComponent, ColComponent],
    }),
  ],
  parameters: {
    status: {
      type: ["devComponent", "breakpointSupport"],
    },
  },
  argTypes: {
    width: {
      description: "Number of column width.",
      control: {
        type: "select",
      },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      table: {
        category: "inputs",
        type: {
          summary: "ColWidth",
          detail: "1 \n2 \n3 \n4 \n5 \n6 \n7 \n8 \n9 \n10 \n11 \n12",
        },
        defaultValue: { summary: "1" },
      },
    },
    justifySelf: {
      description: "Aligns an item horizontally inside its own grid cell.",
      control: {
        type: "select",
      },
      options: ["start", "end", "center", "stretch"],
      table: {
        category: "inputs",
        type: {
          summary: "JustifySelf",
          detail: "start \nend \ncenter \nstretch",
        },
      },
    },
    alignSelf: {
      description: "Aligns an item vertically inside its own grid cell.",
      control: {
        type: "select",
      },
      options: ["start", "end", "center", "stretch"],
      table: {
        category: "inputs",
        type: {
          summary: "AlignSelf",
          detail: "start \nend \ncenter \nstretch",
        },
      },
    },
    ...createBreakpointArgTypes("Col"),
  },
} as Meta<ColComponent>;

export const Default: StoryObj<ColComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="12" gap="1">
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 1</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 2</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 3</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 4</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 5</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 6</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 7</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 8</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 9</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 10</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 11</tedi-col>
        <tedi-col ${argsToTemplate(args)} class="example-col">Col 12</tedi-col>
      </tedi-row>
    `,
  }),
};
