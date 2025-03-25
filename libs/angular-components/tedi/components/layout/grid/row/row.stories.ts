import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { RowComponent } from "./row.component";

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/24da19-grid" target="_BLANK">Zeroheight ↗</a><br/>
 * <a hreg="https://getbootstrap.com/docs/5.1/layout/grid" target="_BLANK">Boostrap docs ↗</a> <br/>
 * Row and Col components are inspired by Bootstrap V5 Grid System. <br/> You can use different Bootstrap grid classes
 * through component props.
 */

export default {
  title: "TEDI-Ready Angular/Layout/Grid/Row",
  component: RowComponent,
} as Meta<RowComponent>;

export const Default: StoryObj<RowComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <tedi-row class="example-row">
            Test
        </tedi-row>
    `,
  }),
};
