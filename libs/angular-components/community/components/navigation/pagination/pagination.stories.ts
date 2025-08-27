import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { PaginationComponent } from "./pagination.component";

export default {
  title: "Community/Navigation/Pagination",
  component: PaginationComponent,
  args: {
    page: 1,
    length: 500,
    pageSize: 50,
    pageSizeOptions: [10, 50, 100, 200],
  },
  render: (args) => ({
    props: {
      ...args,
      pageChange: (page: number) => {
        console.log("Page changed:", page);
      },
      pageSizeChange: (size: number) => {
        console.log("Page size changed:", size);
      },
    },
    template: `
          <tedi-pagination ${argsToTemplate(args)} (pageChange)="pageChange($event)" (pageSizeChange)="pageSizeChange($event)"/>
        `,
  }),
} as Meta<PaginationComponent>;

export const Default: StoryObj<PaginationComponent> = {};

export const ResultsHidden: StoryObj<PaginationComponent> = {
  args: {
    hideResults: true,
  },
};

export const PageSizeHidden: StoryObj<PaginationComponent> = {
  args: {
    hidePageSize: true,
  },
};
