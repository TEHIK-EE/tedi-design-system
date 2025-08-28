import { Meta, StoryObj } from "@storybook/angular";
import { VerticalSpacingItemDirective } from "./vertical-spacing-item.directive";

/**
 * <a href="https://zeroheight.com/1ee8444b7/p/759180-verticalspacing" target="_BLANK">Zeroheight ↗</a>
 **/

export default {
  title: "Tedi-Ready/Components/Helpers/VerticalSpacing/VerticalSpacingItem",
  component: VerticalSpacingItemDirective,
  parameters: {
    status: {
      type: ["devComponent"],
    },
  },
  argTypes: {
    tediVerticalSpacingItem: {
      description:
        "The size of the vertical spacing. Applied as margin-bottom with em units",
      control: {
        type: "number",
        options: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5],
      },
      table: {
        type: {
          summary: "VerticalSpacingSize",
          detail:
            "0 \n0.25 \n0.5 \n0.75 \n1 \n1.25 \n1.5 \n1.75 \n2 \n2.5 \n3 \n4 \n5 ",
        },
      },
    },
  },
} as Meta<VerticalSpacingItemDirective>;

export const Default: StoryObj<VerticalSpacingItemDirective> = {
  args: {
    tediVerticalSpacingItem: 1.5,
  },
  render: (args) => ({
    props: args,
    template: `
    <div>
      <h1 [tediVerticalSpacingItem]="tediVerticalSpacingItem">Vertical spacing item</h1>
      <p>
        The <i>VerticalSpacingItemDirective</i> is a custom Angular directive
        designed to add vertical spacing to a single item. Apply the directive to a
        container element using the <b>[tediVerticalSpacingItem]</b> attribute. Set the value of
        <i>tediVerticalSpacingItem</i> to define the spacing size in <b>em</b> units.
      </p>
    </div>
    `,
  }),
};
