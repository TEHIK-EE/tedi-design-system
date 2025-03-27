import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { ColComponent } from "./col.component";
import { RowComponent } from "../row/row.component";

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
    class: {
      type: "string",
      description: "Additional class",
    },
    width: {
      description: "Number of column width.",
      control: {
        type: "select",
      },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      table: {
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
        type: {
          summary: "AlignSelf",
          detail: "start \nend \ncenter \nstretch",
        },
      },
    },
    xs: {
      description: "Overrides ColProps on xs breakpoint (<576px).",
      table: {
        type: {
          summary: "ColProps",
        },
      },
    },
    sm: {
      description: "Overrides ColProps on sm breakpoint (≥576px).",
      table: {
        type: {
          summary: "ColProps",
        },
      },
    },
    md: {
      description: "Overrides ColProps on md breakpoint (≥768px).",
      table: {
        type: {
          summary: "ColProps",
        },
      },
    },
    lg: {
      description: "Overrides ColProps on lg breakpoint (≥992px).",
      table: {
        type: {
          summary: "ColProps",
        },
      },
    },
    xl: {
      description: "Overrides ColProps on xl breakpoint (≥1200px).",
      table: {
        type: {
          summary: "ColProps",
        },
      },
    },
    xxl: {
      description: "Overrides ColProps on xxl breakpoint (≥1400px).",
      table: {
        type: {
          summary: "ColProps",
        },
      },
    },
  },
} as Meta<ColComponent>;

export const Default: StoryObj<ColComponent> = {
  args: {
    width: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [class]="'example-row'" [cols]="12" [gap]="3">
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 1</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 2</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 3</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 4</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 5</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 6</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 7</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 8</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 9</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 10</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 11</tedi-col>
        <tedi-col ${argsToTemplate(args)} [class]="'example-col'">Col 12</tedi-col>
      </tedi-row>
    `,
  }),
};
