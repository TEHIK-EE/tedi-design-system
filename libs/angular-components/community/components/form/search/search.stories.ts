import {
  argsToTemplate,
  Meta,
  StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { SearchComponent } from "./search.component";
import { RowComponent } from "@tehik-ee/tedi-angular/tedi";

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/search" target="_blank">Zeroheight ↗</a>
 */

export default {
  title: "Community Angular/Form/Search",
  component: SearchComponent,
  decorators: [
    moduleMetadata({
      imports: [SearchComponent, RowComponent],
    }),
  ],
  parameters: {
    status: {
      type: ["devComponent"],
    },
  },
  argTypes: {
    size: {
      description: "Size of the search component",
      control: "radio",
      options: ["large", "default", "small"],
      table: {
        category: "inputs",
        type: { summary: "SearchSize", detail: "large \ndefault \nsmall" },
        defaultValue: { summary: "default" },
      },
    },
    withButton: {
      description: "Should the search button be shown",
      control: "boolean",
      table: {
        category: "inputs",
        type: { summary: "boolean", detail: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    buttonText: {
      description: "Button text for the search component",
      control: "text",
      table: {
        category: "inputs",
        type: { summary: "string", detail: "string" },
        defaultValue: { summary: undefined },
      },
    },
  },
} as Meta<SearchComponent>;

type SearchStory = StoryObj<SearchComponent>;

export const Default: SearchStory = {
  args: {
    size: "default",
  },
  render: (args) => ({
    props: args,
    template: `<tedi-search ${argsToTemplate(args)} />`,
  }),
};

export const Sizes: SearchStory = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row class="example-list" cols="1" gapY="3">
        <tedi-row cols="2" alignItems="center" class="padding-14-16 border-bottom">
          <b>Large</b>
          <tedi-search size="large" />
        </tedi-row>
        <tedi-row cols="2" alignItems="center" class="padding-14-16 border-bottom">
          <b>Default</b>
          <tedi-search size="default" />
        </tedi-row>
        <tedi-row cols="2" alignItems="center" class="padding-14-16">
          <b>Small</b>
          <tedi-search size="small" />
        </tedi-row>
      </tedi-row>
    `,
  }),
};
