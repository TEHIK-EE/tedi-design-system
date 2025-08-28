import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryFn,
  StoryObj,
} from "@storybook/angular";
import { TableStylesComponent } from "./table-styles/table-styles.component";

import { CommonModule } from "@angular/common";
import { PaginationComponent } from "../navigation";

/**
 * <p>Wrapper component for HTML table to provide it with TEDI styles</p>
 */

export default {
  title: "Community/Table/TableStyles",
  component: TableStylesComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, TableStylesComponent, PaginationComponent],
    }),
  ],
  args: {
    size: "default",
    verticalBorders: false,
    striped: false,
    clickable: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "small"],
      description: "Defines the size of the cells.",
      table: {
        category: "inputs",
        defaultValue: { summary: "default" },
        type: {
          summary: "TableSize",
          detail: "default \nsmall",
        },
      },
    },
    verticalBorders: {
      control: "boolean",
      description: "Whether the table has vertical borders.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
        category: "inputs",
      },
    },
    striped: {
      control: "boolean",
      description: "Whether the table rows are striped.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
        category: "inputs",
      },
    },
    clickable: {
      control: "boolean",
      description: "Whether the table rows are clickable.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
        category: "inputs",
      },
    },
  },
} as Meta<TableStylesComponent>;

type TableStylesStoryTemplate = TableStylesComponent & {
  pagination: boolean;
  cellAlign: boolean;
  secondaryRow: boolean;
};

const TableStylesTemplate: StoryFn<TableStylesStoryTemplate> = ({
  pagination,
  cellAlign,
  secondaryRow,
  ...args
}) => ({
  props: { ...args, pagination, cellAlign, secondaryRow },
  template: `
    <tedi-table-styles
      ${argsToTemplate(args)}
    >
      <table>
        <thead>
          <tr>
            <th>Kuupäev</th>
            <th>Kellaaeg</th>
            <th>Kestus</th>
            <th [class.tedi-cell--align-right]="cellAlign">Asukoht</th>
            <th>Isiku ID tuvastamisviis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>22.03.2029</td>
            <td>13:11</td>
            <td>6 min</td>
            <td [class.tedi-cell--align-right]="cellAlign">Ida-Virumaa</td>
            <td>Pangalink</td>
          </tr>
          <tr [class.tedi-row--secondary]="secondaryRow">
            <td>22.03.2029</td>
            <td>13:11</td>
            <td>6 min</td>
            <td [class.tedi-cell--align-right]="cellAlign">Ida-Virumaa</td>
            <td>Pangalink</td>
          </tr>
          <tr>
            <td>22.03.2029</td>
            <td>13:11</td>
            <td>6 min</td>
            <td [class.tedi-cell--align-right]="cellAlign">Ida-Virumaa</td>
            <td>Pangalink</td>
          </tr>
          <tr>
            <td>22.03.2029</td>
            <td>13:11</td>
            <td>6 min</td>
            <td [class.tedi-cell--align-right]="cellAlign">Ida-Virumaa</td>
            <td>Pangalink</td>
          </tr>
        </tbody>
      </table>
      @if (pagination) {
        <tedi-pagination [length]="4" />
      }
    </tedi-table-styles>
  `,
});

type TableStylesStory = StoryObj<TableStylesStoryTemplate>;

export const Default: TableStylesStory = {
  render: TableStylesTemplate,
};

export const WithPagination: TableStylesStory = {
  args: {
    pagination: true,
  },
  render: TableStylesTemplate,
};

export const VerticalBorders: TableStylesStory = {
  args: {
    verticalBorders: true,
  },
  render: TableStylesTemplate,
};

export const Striped: TableStylesStory = {
  args: {
    striped: true,
  },
  render: TableStylesTemplate,
};

export const Clickable: TableStylesStory = {
  args: {
    clickable: true,
  },
  render: TableStylesTemplate,
};

export const WithAlignedCells: TableStylesStory = {
  args: {
    cellAlign: true,
  },
  render: TableStylesTemplate,
};

export const WithSecondaryRow: TableStylesStory = {
  args: {
    secondaryRow: true,
  },
  render: TableStylesTemplate,
};
