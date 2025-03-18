import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { ListComponent } from "./list.component";
import { ListItemComponent } from "./list-item.component";

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19322&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/37b651-list" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready Angular/Content/List/List",
  component: ListComponent,
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
    element: {
      description: "Base element",
      control: {
        type: "radio",
      },
      options: ["ul", "ol"],
      table: {
        type: { summary: "ListElement", detail: "ul \nol" },
        defaultValue: { summary: '"ul"' },
      },
    },
    style: {
      description: "List style",
      control: {
        type: "radio",
      },
      options: ["styled", "none"],
      table: {
        type: { summary: "ListStyle", detail: "styled \nnone" },
        defaultValue: { summary: '"styled"' },
      },
    },
  },
} as Meta<ListComponent>;

export const Default: StoryObj<ListComponent> = {
  args: {
    element: "ul",
    style: "styled",
  },
  render: (args) => ({
    props: args,
    template: `
        <tedi-list ${argsToTemplate(args)}>
            <tedi-list-item>Caesar salad</tedi-list-item>
            <tedi-list-item>
                Caesar salad
                <tedi-list ${argsToTemplate(args)}>
                    <tedi-list-item>Dressing</tedi-list-item>
                </tedi-list>
            </tedi-list-item>
            <tedi-list-item>
                Caesar salad
                <tedi-list ${argsToTemplate(args)}>
                    <tedi-list-item>
                        Dressing
                        <tedi-list ${argsToTemplate(args)}>
                            <tedi-list-item>Lemon juice</tedi-list-item>
                            <tedi-list-item>Anchovies</tedi-list-item>
                        </tedi-list>
                    </tedi-list-item>
                </tedi-list>
            </tedi-list-item>
        </tedi-list>
    `,
  }),
};

export const UnorderedList: StoryObj<ListComponent> = {
  args: {
    element: "ul",
    style: "styled",
  },
  render: (args) => ({
    props: args,
    template: `
          <tedi-list ${argsToTemplate(args)}>
              <tedi-list-item>Potato</tedi-list-item>
              <tedi-list-item>Caesar salad</tedi-list-item>
              <tedi-list-item>
                  Caesar salad
                  <tedi-list ${argsToTemplate(args)}>
                      <tedi-list-item>
                          Dressing
                          <tedi-list ${argsToTemplate(args)}>
                              <tedi-list-item>Lemon juice</tedi-list-item>
                              <tedi-list-item>Anchovies</tedi-list-item>
                              <tedi-list-item>Parmesan cheese</tedi-list-item>
                              <tedi-list-item>Worcestershire sauce</tedi-list-item>
                              <tedi-list-item>Mustard</tedi-list-item>
                          </tedi-list>
                      </tedi-list-item>
                  </tedi-list>
              </tedi-list-item>
          </tedi-list>
      `,
  }),
};

export const OrderedList: StoryObj<ListComponent> = {
  args: {
    element: "ol",
    style: "styled",
  },
  render: (args) => ({
    props: args,
    template: `
            <tedi-list ${argsToTemplate(args)}>
                <tedi-list-item>School homework</tedi-list-item>
                <tedi-list-item>
                    Chores
                    <tedi-list ${argsToTemplate(args)}>
                        <tedi-list-item>Wash dishes</tedi-list-item>
                        <tedi-list-item>
                            Fold laundry
                            <tedi-list ${argsToTemplate(args)}>
                                <tedi-list-item>Iron the sheets</tedi-list-item>
                                <tedi-list-item>Hang dresses</tedi-list-item>
                            </tedi-list>
                        </tedi-list-item>
                    </tedi-list>
                </tedi-list-item>
                <tedi-list-item>Walk the dog</tedi-list-item>
                <tedi-list-item>Water the flowers</tedi-list-item>
            </tedi-list>
        `,
  }),
};

export const NoStyleList: StoryObj<ListComponent> = {
  args: {
    style: "none",
  },
  render: (args) => ({
    props: args,
    template: `
        <tedi-list ${argsToTemplate(args)}>
            <tedi-list-item>
                Caesar salad
                <tedi-list ${argsToTemplate(args)}>
                    <tedi-list-item>
                        Dressing
                        <tedi-list ${argsToTemplate(args)}>
                            <tedi-list-item>Lemon juice</tedi-list-item>
                            <tedi-list-item>Anchovies</tedi-list-item>
                        </tedi-list>
                    </tedi-list-item>
                </tedi-list>
            </tedi-list-item>
        </tedi-list>
    `,
  }),
};
