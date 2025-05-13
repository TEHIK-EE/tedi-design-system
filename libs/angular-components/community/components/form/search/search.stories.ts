import {
  argsToTemplate,
  Meta,
  StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { SearchComponent, AutocompleteOption } from "./search.component";
import { RowComponent } from "@tehik-ee/tedi-angular/tedi";

const mockOptions: AutocompleteOption[] = [
  {
    value: "option1",
    label: "Option 1",
    description: "Description for option 1",
  },
  {
    value: "option2",
    label: "Option 2",
    description: "Description for option 2",
  },
  {
    value: "option3",
    label: "Option 3",
    description: "Description for option 3",
  },
];

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
    autocompleteOptions: mockOptions,
  },
  render: (args) => ({
    props: {
      ...args,
      mockOptions,
      selectedItem: undefined,
      onItemSelect: function (item: AutocompleteOption) {
        console.log("Selected item:", item);
        this["selectedItem"] = item;
      },
    },
    template: `
        <tedi-search ${argsToTemplate(args)} (onSelect)="onItemSelect($event)">
          <p>Footer goes here</p>
        </tedi-search>

<pre>{{ selectedItem | json }}</pre>
    `,
  }),
};

export const Sizes: SearchStory = {
  render: (args) => ({
    props: {
      ...args,
      mockOptions,
    },
    template: `
      <b>Large</b>
      <tedi-row cols="1" gap="3">
        <tedi-search size="large" [options]="mockOptions">
          <p>Footer goes here</p>
        </tedi-search>
        <tedi-search size="large" [withButton]="true" [options]="mockOptions"/>
        <tedi-search size="large" [withButton]="true" buttonText="Otsi" [options]="mockOptions"/>
      </tedi-row>

      <br />

      <b>Default</b>
      <tedi-row cols="1" gap="3">
        <tedi-search size="default" [options]="mockOptions"/>
        <tedi-search size="default" [withButton]="true" [options]="mockOptions"/>
        <tedi-search size="default" [withButton]="true" buttonText="Otsi" [options]="mockOptions"/>
      </tedi-row>

      <br />

      <b>Small</b>
      <tedi-row cols="1" gap="3">
        <tedi-search size="small" [options]="mockOptions"/>
        <tedi-search size="small" [withButton]="true" [options]="mockOptions"/>
        <tedi-search size="small" [withButton]="true" buttonText="Otsi" [options]="mockOptions"/>
      </tedi-row>
    `,
  }),
};
