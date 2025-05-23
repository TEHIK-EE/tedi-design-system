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
      control: "radio",
      options: [true, false],
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
        defaultValue: { summary: "" },
      },
    },
    disabled: {
      description: "Should the search button be disabled",
      control: "radio",
      options: [true, false],
      table: {
        category: "inputs",
        type: { summary: "boolean", detail: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    clearable: {
      description: "Should the search input be clearable",
      control: "radio",
      options: [true, false],
      table: {
        category: "inputs",
        type: { summary: "boolean", detail: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    noResultText: {
      description: "Text to show when no results are found",
      control: "text",
      table: {
        category: "inputs",
        type: { summary: "string", detail: "string" },
        defaultValue: { summary: "Vasteid ei leitud" },
      },
    },
    placeholder: {
      description: "Placeholder text for the search input",
      control: "text",
      table: {
        category: "inputs",
        type: { summary: "string", detail: "string" },
        defaultValue: { summary: "" },
      },
    },
    autocompleteFrom: {
      description: "Minimum number of characters to trigger autocomplete",
      control: { type: "number", min: 1 },
      table: {
        category: "inputs",
        type: { summary: "number", detail: "number" },
        defaultValue: { summary: "3" },
      },
    },
    inputId: {
      description: "Search input ID for accessibility",
      control: "text",
      table: {
        category: "inputs",
        type: { summary: "string", detail: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    autocompleteOptions: {
      description: "Autocomplete options for the search input",
      control: "object",
      table: {
        category: "inputs",
        type: {
          summary: "AutocompleteOption[]",
          detail: "AutocompleteOption[]",
        },
        defaultValue: { summary: "[]" },
      },
    },
  },
} as Meta<SearchComponent>;

type SearchStory = StoryObj<SearchComponent>;

export const Default: SearchStory = {
  args: {
    size: "default",
    autocompleteOptions: mockOptions,
    withButton: false,
    buttonText: "",
    disabled: false,
    clearable: true,
    noResultText: "Vasteid ei leitud",
    placeholder: "Search...",
    autocompleteFrom: 3,
    inputId: "search-input",
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
        <tedi-search inputId="search-1" size="large" [autocompleteOptions]="mockOptions">
          <p>Footer goes here</p>
        </tedi-search>
        <tedi-search inputId="search-2" size="large" [withButton]="true" [autocompleteOptions]="mockOptions"/>
        <tedi-search inputId="search-3" size="large" [withButton]="true" buttonText="Otsi" [autocompleteOptions]="mockOptions"/>
      </tedi-row>

      <br />

      <b>Default</b>
      <tedi-row cols="1" gap="3">
        <tedi-search inputId="search-4" size="default" [autocompleteOptions]="mockOptions"/>
        <tedi-search inputId="search-5" size="default" [withButton]="true" [autocompleteOptions]="mockOptions"/>
        <tedi-search inputId="search-6" size="default" [withButton]="true" buttonText="Otsi" [autocompleteOptions]="mockOptions"/>
      </tedi-row>

      <br />

      <b>Small</b>
      <tedi-row cols="1" gap="3">
        <tedi-search inputId="search-7" size="small" [autocompleteOptions]="mockOptions"/>
        <tedi-search inputId="search-8" size="small" [withButton]="true" [autocompleteOptions]="mockOptions"/>
        <tedi-search inputId="search-9" size="small" [withButton]="true" buttonText="Otsi" [autocompleteOptions]="mockOptions"/>
      </tedi-row>
    `,
  }),
};

export const Disabled: SearchStory = {
  args: {
    size: "default",
    disabled: true,
    autocompleteOptions: mockOptions,
  },
  render: () => ({
    template: `<tedi-search inputId="search-10" [disabled]="true" />`,
  }),
};
