import { Meta, StoryObj } from "@storybook/angular";
import { VerticalSpacingDirective } from "./vertical-spacing.directive";

export default {
  title: "Tedi-Ready Angular/Helpers/VerticalSpacing",
  component: VerticalSpacingDirective,
  argTypes: {
    appVerticalSpacing: {
      description:
        "The size of the vertical spacing, applied as margin-bottom The value corresponds to em units",
      control: {
        type: "select",
        options: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5],
      },
    },
  },
} as Meta<VerticalSpacingDirective>;

export const Default: StoryObj<VerticalSpacingDirective> = {
  args: {
    appVerticalSpacing: 0.5,
  },
  render: (args) => ({
    props: args,
    template: `
      <div [appVerticalSpacing]="appVerticalSpacing">
        <div style="background-color: #ddd; padding: 10px;">One</div>
        <div style="background-color: #bbb; padding: 10px;">Two</div>
        <div style="background-color: #999; padding: 10px;">Three</div>
      </div>
    `,
  }),
};
