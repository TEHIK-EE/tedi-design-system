import {
  argsToTemplate,
  Meta,
  StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { TextComponent } from "./text.component";
import { VerticalSpacingDirective } from "../../../directives/vertical-spacing/vertical-spacing.directive";
import { RowComponent } from "../../helpers/grid/row/row.component";
import { ColComponent } from "../../helpers/grid/col/col.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/4651ec-typography" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready/Base/Typography/Text",
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
    ngContent: {
      name: "ng-content",
      control: {
        type: "text",
      },
      table: {
        type: { summary: "string" },
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
      table: {
        category: "inputs",
        type: {
          summary: "TextModifiers[] | TextModifiers",
          detail:
            "h1 \nh2 \nh3 \nh4 \nh5 \nh6 \nnormal \nsmall \nbold \nthin \nitalic \ncenter \nleft \nright \nnowrap \nbreak-all \nbreak-word \nbreak-spaces \nuppercase \nlowercase \ncapitalize \ncapitalize-first \ninline-block \ninline \nline-normal \nline-condensed \nsubtitle",
        },
      },
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
        category: "inputs",
        type: {
          summary: "TextColor",
          detail:
            "primary \nsecondary \ntertiary \nwhite \ndisabled \nbrand \nsuccess \nwarning \ndanger \ninfo \nneutral",
        },
        defaultValue: { summary: "primary" },
      },
    },
  },
} as Meta<TextComponent>;

export const Default: StoryObj<TextComponent & { ngContent: string }> = {
  args: {
    ngContent: "Text",
  },
  render: ({ ngContent, ...args }) => ({
    props: args,
    template: `<p tedi-text ${argsToTemplate(args)}>${ngContent}</p>`,
  }),
};

export const Headings: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    styles: [
      `
        h1.mobile {
          font-size: var(--heading-h1-size-mobile);
        }
        h2.mobile {
          font-size: var(--heading-h2-size-mobile);
        }
        h3.mobile {
          font-size: var(--heading-h3-size-mobile);
        }
        h4.mobile {
          font-size: var(--heading-h4-size-mobile);
        }
        h5.mobile {
          font-size: var(--heading-h5-size-mobile);
        }
        h6.mobile {
          font-size: var(--heading-h6-size-mobile);
        }
      }
    `,
    ],
    template: `
      <div class="example-list">
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom border-bottom--3x'">
          <b>Desktop</b>
          <b>Mobile</b>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <h1 tedi-text>Heading H1</h1>
          <h1 tedi-text class="mobile">Heading H1</h1>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <h2 tedi-text>Heading H2</h2>
          <h2 tedi-text class="mobile">Heading H2</h2>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <h3 tedi-text>Heading H3</h3>
          <h3 tedi-text class="mobile">Heading H3</h3>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <h4 tedi-text>Heading H4</h4>
          <h4 tedi-text class="mobile">Heading H4</h4>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <h5 tedi-text>Heading H5</h5>
          <h5 tedi-text class="mobile">Heading H5</h5>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <h6 tedi-text>Heading H6</h6>
          <h6 tedi-text class="mobile">Heading H6</h6>
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
          <b>Desktop</b>
          <b>Mobile</b>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <p tedi-text modifiers="subtitle">Subtitle</p>
          <p tedi-text modifiers="subtitle" class="mobile">Subtitle</p>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <p tedi-text [modifiers]="['small', 'subtitle']">Subtitle small</p>
          <p tedi-text [modifiers]="['small', 'subtitle']" class="mobile">Subtitle small</p>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <label tedi-text>Label</label>
          <label tedi-text class="mobile">Label</label>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <label tedi-text modifiers="bold">Label bold</label>
          <label tedi-text modifiers="bold" class="mobile">Label bold</label>
        </tedi-row>
      </div>
    `,
  }),
};

export const Body: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="example-list">
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom border-bottom--3x'">
          <b>Native element</b>
          <b>Modifier</b>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <p tedi-text>Body regular</p>
          <h1 tedi-text modifiers="normal">Body regular</h1>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <b>Body bold</b>
          <p tedi-text modifiers="bold">Body bold</p>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <i>Body italic</i>
          <p tedi-text modifiers="italic">Body italic</p>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <small>Small</small>
          <span tedi-text modifiers="small">Small</span>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <small>
            <b>Small bold</b>
          </small>
          <small tedi-text modifiers="bold">Small bold</small>
        </tedi-row>
       <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <small>
            <i>Small italic</i>
          </small>
          <small tedi-text modifiers="italic">Small italic</small>
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
        <p tedi-text>
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
        <p tedi-text color="secondary">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
        <p tedi-text color="tertiary">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
        <p tedi-text color="brand">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
        <p tedi-text class="bg bg-primary" color="white">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
      </div>
    `,
  }),
};

export const StatusTextColors: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div [tediVerticalSpacing]="1">
        <p tedi-text color="success">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
        <p tedi-text color="warning">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
        <p tedi-text color="danger">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
        <p tedi-text color="info">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
        <p tedi-text color="neutral">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </p>
      </div>
    `,
  }),
};
