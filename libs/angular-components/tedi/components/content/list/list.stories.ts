import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { ListComponent } from "./list.component";

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19322&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/37b651-list" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready Angular/Content/List",
  component: ListComponent,
  decorators: [
    moduleMetadata({
      imports: [ListComponent],
    }),
  ],
  argTypes: {
    styled: {
      description: "Is list styled?",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
} as Meta<ListComponent>;

export const Default: StoryObj<ListComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <ul tedi-list ${argsToTemplate(args)}>
        <li>Caesar salad</li>
        <li>
          Caesar salad
          <ul tedi-list ${argsToTemplate(args)}>
            <li>Dressing</li>
          </ul>
        </li>
        <li>
          Caesar salad
          <ul tedi-list ${argsToTemplate(args)}>
            <li>
              Dressing
              <ul tedi-list ${argsToTemplate(args)}>
                <li>Lemon juice</li>
                <li>Anchovies</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    `,
  }),
};

export const UnorderedList: StoryObj<ListComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <ul tedi-list ${argsToTemplate(args)}>
        <li>Potato</li>
        <li>Caesar salad</li>
        <li>
          Caesar salad
          <ul tedi-list ${argsToTemplate(args)}>
            <li>
              Dressing
              <ul tedi-list ${argsToTemplate(args)}>
                <li>Lemon juice</li>
                <li>Anchovies</li>
                <li>Parmesan cheese</li>
                <li>Worcestershire sauce</li>
                <li>Mustard</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    `,
  }),
};

export const OrderedList: StoryObj<ListComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <ol tedi-list ${argsToTemplate(args)}>
        <li>School homework</li>
        <li>
          Chores
          <ol tedi-list ${argsToTemplate(args)}>
            <li>Wash dishes</li>
            <li>
              Fold laundry
              <ol tedi-list ${argsToTemplate(args)}>
                <li>Iron the sheets</li>
                <li>Hang dresses</li>
              </ol>
            </li>
          </ol>
        </li>
        <li>Walk the dog</li>
        <li>Water the flowers</li>
      </ol>
    `,
  }),
};

export const NoStyleList: StoryObj<ListComponent> = {
  args: {
    styled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul tedi-list ${argsToTemplate(args)}>
        <li>
          Caesar salad
          <ul tedi-list ${argsToTemplate(args)}>
            <li>
              Dressing
              <ul tedi-list ${argsToTemplate(args)}>
                <li>Lemon juice</li>
                <li>Anchovies</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    `,
  }),
};
