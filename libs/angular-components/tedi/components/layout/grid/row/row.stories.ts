import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from "@storybook/angular";
import { RowComponent } from "./row.component";
import { ColComponent } from "../col/col.component";

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/24da19-grid" target="_BLANK">Zeroheight ↗</a><br/>
 * Row component should be used together with Col component.
 */

export default {
  title: "TEDI-Ready Angular/Layout/Grid/Row",
  component: RowComponent,
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
    cols: {
      description: "The number of columns that will fit next to each other.",
      control: {
        type: "select",
      },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "auto"],
      table: {
        category: "inputs",
        type: {
          summary: "Cols",
          detail: "1 \n2 \n3 \n4 \n5 \n6 \n7 \n8 \n9 \n10 \n11 \n12 \nauto",
        },
        defaultValue: { summary: "auto" },
      },
    },
    minColWidth: {
      description: "Applies minimum width (px) to the column when using auto layout.",
      control: {
        type: "number",
      },
      table: {
        category: "inputs",
        type: { summary: "number" },
        defaultValue: { summary: "200px" },
      },
    },    
    justifyItems: {
      description: "Aligns items horizontally inside their grid cell.",
      control: {
        type: "select",
      },
      options: ["start", "end", "center", "stretch"],
      table: {
        category: "inputs",
        type: {
          summary: "JustifyItems",
          detail: "start \nend \ncenter \nstretch",
        },
      },
    },
    alignItems: {
      description: "Aligns items vertically inside their grid cell.",
      control: {
        type: "select",
      },
      options: ["start", "end", "center", "stretch"],
      table: {
        category: "inputs",
        type: {
          summary: "AlignItems",
          detail: "start \nend \ncenter \nstretch",
        },
      },
    },
    gap: {
      description: "Add horizontal and vertical gap between items.",
      control: {
        type: "select",
      },
      options: [0, 1, 2, 3, 4, 5],
      table: {
        category: "inputs",
        type: {
          summary: "Gap",
          detail: "0 \n1 \n2 \n3 \n4 \n5",
        },
      },
    },
    gapX: {
      description: "Add horizontal gap between items.",
      control: {
        type: "select",
      },
      options: [0, 1, 2, 3, 4, 5],
      table: {
        category: "inputs",
        type: {
          summary: "Gap",
          detail: "0 \n1 \n2 \n3 \n4 \n5",
        },
      },
    },
    gapY: {
      description: "Add vertical gap between items.",
      control: {
        type: "select",
      },
      options: [0, 1, 2, 3, 4, 5],
      table: {
        category: "inputs",
        type: {
          summary: "Gap",
          detail: "0 \n1 \n2 \n3 \n4 \n5",
        },
      },
    },
    xs: {
      description: "Overrides RowInputs on xs breakpoint (<576px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "RowInputs",
        },
      },
    },
    sm: {
      description: "Overrides RowInputs on sm breakpoint (≥576px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "RowInputs",
        },
      },
    },
    md: {
      description: "Overrides RowInputs on md breakpoint (≥768px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "RowInputs",
        },
      },
    },
    lg: {
      description: "Overrides RowInputs on lg breakpoint (≥992px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "RowInputs",
        },
      },
    },
    xl: {
      description: "Overrides RowInputs on xl breakpoint (≥1200px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "RowInputs",
        },
      },
    },
    xxl: {
      description: "Overrides RowInputs on xxl breakpoint (≥1400px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "RowInputs",
        },
      },
    },
  },
} as Meta<RowComponent>;

export const Default: StoryObj<RowComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row ${argsToTemplate(args)}>
        <tedi-col [class]="'example-col'">Col 1</tedi-col>
        <tedi-col [class]="'example-col'">Col 2</tedi-col>
        <tedi-col [class]="'example-col'">Col 3</tedi-col>
        <tedi-col [class]="'example-col'">Col 4</tedi-col>
        <tedi-col [class]="'example-col'">Col 5</tedi-col>
        <tedi-col [class]="'example-col'">Col 6</tedi-col>
        <tedi-col [class]="'example-col'">Col 7</tedi-col>
        <tedi-col [class]="'example-col'">Col 8</tedi-col>
        <tedi-col [class]="'example-col'">Col 9</tedi-col>
        <tedi-col [class]="'example-col'">Col 10</tedi-col>
        <tedi-col [class]="'example-col'">Col 11</tedi-col>
        <tedi-col [class]="'example-col'">Col 12</tedi-col>
      </tedi-row>
    `,
  }),
};
