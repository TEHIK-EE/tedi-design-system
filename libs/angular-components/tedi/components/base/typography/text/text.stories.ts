import {
  argsToTemplate,
  Meta,
  StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { TextComponent } from "./text.component";
import { VerticalSpacingDirective } from "libs/angular-components/tedi/directives/vertical-spacing/vertical-spacing.directive";
import { RowComponent } from "../../../layout/grid/row/row.component";
import { ColComponent } from "../../../layout/grid/col/col.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/4651ec-typography" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready Angular/Base/Typography/Text",
  component: TextComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TextComponent,
        VerticalSpacingDirective,
        RowComponent,
        ColComponent,
      ],
    }),
  ],
  argTypes: {
    class: {
      type: "string",
      description: "Additional class",
    },
    id: {
      type: "string",
      description: "ID attribute",
    },
    tabIndex: {
      type: "number",
      description: "Allows to focus the element",
    },
    element: {
      description: "Base element",
      control: {
        type: "select",
      },
      options: [
        "div",
        "p",
        "span",
        "li",
        "label",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
      table: {
        type: { summary: "TextElement" },
        defaultValue: { summary: '"p"' },
      },
    },
    modifiers: {
      description: "Single or multiple modifiers to change the text behavior",
      control: {
        type: "multi-select",
      },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "normal",
        "small",
        "bold",
        "thin",
        "italic",
        "center",
        "left",
        "right",
        "nowrap",
        "break-all",
        "break-word",
        "break-spaces",
        "uppercase",
        "lowercase",
        "capitalize",
        "capitalize-first",
        "inline-block",
        "inline",
        "line-normal",
        "line-condensed",
        "subtitle",
      ],
      table: { type: { summary: "TextModifiers[] | TextModifiers" } },
    },
    color: {
      description: "Color of the text",
      control: {
        type: "select",
      },
      options: [
        "primary",
        "secondary",
        "tertiary",
        "white",
        "disabled",
        "brand",
        "success",
        "warning",
        "danger",
        "info",
        "neutral",
      ],
      table: {
        type: { summary: "TextColor" },
        defaultValue: { summary: '"primary"' },
      },
    },
  },
} as Meta<TextComponent>;

export const Default: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `<tedi-text ${argsToTemplate(args)}>Text</tedi-text>`,
  }),
};

export const Texts: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="example-list">
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom border-bottom--3x'">
          <tedi-col>Desktop</tedi-col>
          <tedi-col>Mobile</tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text>Body regular</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [class]="'mobile'">Body regular</tedi-text>
          </tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text [modifiers]="'bold'">Body bold</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [modifiers]="'bold'" [class]="'mobile'">Body bold</tedi-text>
          </tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text [modifiers]="'italic'">Body italic</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [modifiers]="'italic'" [class]="'mobile'">Body italic</tedi-text>
          </tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text [modifiers]="'small'">Small</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [modifiers]="'small'" [class]="'mobile'">Small</tedi-text>
          </tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text [modifiers]="['small', 'bold']">Small bold</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [modifiers]="['small', 'bold']" [class]="'mobile'">
              Small bold
            </tedi-text>
          </tedi-col>
        </tedi-row>
       <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text [modifiers]="['small', 'italic']">Small italic</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [modifiers]="['small', 'italic']" [class]="'mobile'">
              Small italic
            </tedi-text>
          </tedi-col>
        </tedi-row>
      </div>
    `,
  }),
};

export const Subtitles: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="example-list">
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom border-bottom--3x'">
          <tedi-col>Desktop</tedi-col>
          <tedi-col>Mobile</tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text [modifiers]="'subtitle'">Subtitle</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [modifiers]="'subtitle'" [class]="'mobile'">Subtitle</tedi-text>
          </tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text [modifiers]="['small', 'subtitle']">Subtitle small</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [modifiers]="['small', 'subtitle']" [class]="'mobile'">Subtitle small</tedi-text>
          </tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text [element]="'label'">Label</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [element]="'label'" [class]="'mobile'">Label</tedi-text>
          </tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>
            <tedi-text [element]="'label'" [modifiers]="'bold'">Label bold</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-text [element]="'label'" [modifiers]="'bold'" [class]="'mobile'">Label bold</tedi-text>
          </tedi-col>
        </tedi-row>
      </div>
    `,
  }),
};

export const GeneralTextColors: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <div [tediVerticalSpacing]="1">
          <tedi-text>
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
          <tedi-text [color]="'secondary'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
          <tedi-text [color]="'tertiary'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
          <tedi-text [color]="'brand'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
          <tedi-text [class]="'bg bg-primary'" [color]="'white'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
        </div>
    `,
  }),
};

export const StatusTextColors: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <div [tediVerticalSpacing]="1">
          <tedi-text [color]="'success'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
          <tedi-text [color]="'warning'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
          <tedi-text [color]="'danger'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
          <tedi-text [color]="'info'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
          <tedi-text [color]="'neutral'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-text>
        </div>
    `,
  }),
};
