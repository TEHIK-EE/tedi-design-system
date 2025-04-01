import { Meta, StoryObj } from "@storybook/angular";
import { VerticalSpacingDirective } from "./vertical-spacing.directive";

export class Weekdays extends VerticalSpacingDirective {
  weekdays: { name: string; dayNumber: number }[] = [];
}

export default {
  title: "Tedi-Ready Angular/Helpers/VerticalSpacing/VerticalSpacing",
  component: VerticalSpacingDirective,
  parameters: {
    status: {
      type: ["devComponent"],
    },
  },
  argTypes: {
    tediVerticalSpacing: {
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
} as Meta<VerticalSpacingDirective>;

export const Default: StoryObj<VerticalSpacingDirective> = {
  args: {
    tediVerticalSpacing: 1.5,
  },
  render: (args) => ({
    props: args,
    template: `
      <div [tediVerticalSpacing]="tediVerticalSpacing">
        <h1>Vertical spacing </h1>
        <p>The <b>VerticalSpacingDirective</b> is a custom Angular directive designed to add vertical 
        spacing (margin-bottom) between child elements of a container. It is particularly useful for 
        maintaining consistent spacing in layouts without manually applying styles to each child element.</p>
        <p>Apply the directive to a container element using the  <b>[tediVerticalSpacing]</b> attribute.</p>
        <p>Set the value of  <b>tediVerticalSpacing</b> to define the spacing size in  <b>em</b> units.</p>
        <p>The directive applies the margin-bottom to all direct child elements except the last one.</p>
        <p>Note: The directive does not affect nested (grandchild) elements.</p>
      </div>
    `,
  }),
};

export const NgFor: StoryObj<VerticalSpacingDirective & Weekdays> = {
  storyName: "Example: Using with *ngFor",
  args: {
    tediVerticalSpacing: 1.5,
    weekdays: [
      { name: "Monday", dayNumber: 1 },
      { name: "Tuesday", dayNumber: 2 },
      { name: "Wednesday", dayNumber: 3 },
      { name: "Thursday", dayNumber: 4 },
      { name: "Friday", dayNumber: 5 },
      { name: "Saturday", dayNumber: 6 },
      { name: "Sunday", dayNumber: 7 },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div [tediVerticalSpacing]="0.5">
        <div *ngFor="let day of weekdays">
          Day {{ day.dayNumber }} — {{ day.name }}
        </div>
      </div>
    `,
  }),
};
