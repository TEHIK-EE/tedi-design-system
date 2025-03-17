import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { ListItemComponent } from "./list-item.component";
import { ListComponent } from "./list.component";

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19322&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/37b651-list" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready Angular/Content/List/ListItem",
  component: ListItemComponent,
  decorators: [
    moduleMetadata({
      declarations: [ListComponent, ListItemComponent],
    }),
  ],
  argTypes: {
    class: {
      type: "string",
      description: "Additional class",
    },
  },
} as Meta<ListItemComponent>;

export const Default: StoryObj<ListItemComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <tedi-list>
          <tedi-list-item ${argsToTemplate(args)}>
              List item
          </tedi-list-item>
        </tedi-list>
      `,
  }),
};
