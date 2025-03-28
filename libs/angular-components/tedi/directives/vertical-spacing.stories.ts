import { Meta, StoryObj } from "@storybook/angular";
import { VerticalSpacingDirective } from "./vertical-spacing.directive";

export default {
  title: "Tedi-Ready Angular/Helpers/VerticalSpacing",
  component: VerticalSpacingDirective,
  argTypes: {
    tediVerticalSpacing: {
      description:
        "The size of the vertical spacing, applied as margin-bottom The value corresponds to em units",
      control: {
        type: "number",
        options: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5],
      },
    },
  },
} as Meta<VerticalSpacingDirective>;

export const Default: StoryObj<VerticalSpacingDirective> = {
  args: {
    tediVerticalSpacing: 0.5,
  },
  render: (args) => ({
    props: args,
    template: `
      <div [tediVerticalSpacing]="tediVerticalSpacing">
        <h1>This is VerticalSpacing example</h1>
        <p>
          VerticalSpacing directive is used to give space vertically between its
          children.
        </p>
        <p>
          Use custom directive <code>tediVerticalSpacing</code> to apply margin bottom to all its children elements except the final element.
        </p>
      </div>
    `,
  }),
};
