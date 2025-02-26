import { Meta, StoryObj } from "@storybook/angular";
import { TextComponent } from "./text.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/4651ec-typography" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready Angular/Base/Typography/Text",
  component: TextComponent,
  argTypes: {
    class: {
      type: "string",
      description: "Additional class",
      table: {
        readonly: true,
      },
    },
    id: {
      type: "string",
      description: "ID attribute",
      table: {
        readonly: true,
      },
    },
    tabIndex: {
      type: "number",
      description: "Allows to focus the element",
      table: {
        readonly: true,
      },
    },
    element: {
      description: "Base element",
      table: {
        type: { summary: "TextElement" },
        defaultValue: { summary: "p" },
      },
    },
    modifiers: {
      description: "Single or multiple modifiers to change the text behavior",
      table: { type: { summary: "TextModifiers[] | TextModifiers" } },
    },
    color: {
      description: "Color of the text",
      table: {
        type: { summary: "TextColor" },
        defaultValue: { summary: "primary" },
      },
    },
  },
} as Meta<TextComponent>;

export const Default: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="example-list">
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="border-bottom border-bottom--3x padding-14-16"
        >
          <tedi-text>Desktop</tedi-text>
          <tedi-text>Mobile</tedi-text>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-text> Body regular </tedi-text>
          <tedi-text class="mobile"> Body regular </tedi-text>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-text modifiers="bold"> Body bold </tedi-text>
          <tedi-text modifiers="bold" class="mobile"> Body bold </tedi-text>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-text modifiers="italic"> Body italic </tedi-text>
          <tedi-text modifiers="italic" class="mobile"> Body italic </tedi-text>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-text modifiers="small"> Small </tedi-text>
          <tedi-text modifiers="small" class="mobile"> Small </tedi-text>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16 border-bottom"
        >
          <tedi-text [modifiers]="['small', 'bold']"> Small bold </tedi-text>
          <tedi-text [modifiers]="['small', 'bold']" class="mobile">
            Small bold
          </tedi-text>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(2, 1fr);"
          class="padding-14-16"
        >
          <tedi-text [modifiers]="['small', 'italic']"> Small italic </tedi-text>
          <tedi-text [modifiers]="['small', 'italic']" class="mobile">
            Small italic
          </tedi-text>
        </div>
      </div>
    `,
  }),
};

export const Subtitles: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <div class="example-list">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr);" class="border-bottom border-bottom--3x padding-14-16">
                <tedi-text>Desktop</tedi-text>
                <tedi-text>Mobile</tedi-text>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr);" class="padding-14-16 border-bottom">
                <tedi-text modifiers="subtitle">
                    Subtitle
                </tedi-text>
                <tedi-text modifiers="subtitle" class="mobile">
                   Subtitle
                </tedi-text>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr);" class="padding-14-16 border-bottom">
                <tedi-text [modifiers]="['small', 'subtitle']">
                    Subtitle small
                </tedi-text>
                <tedi-text [modifiers]="['small', 'subtitle']" class="mobile">
                    Subtitle small
                </tedi-text>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr);" class="padding-14-16 border-bottom">
                <tedi-text element="label">
                    Label
                </tedi-text>
                <tedi-text element="label" class="mobile">
                    Label
                </tedi-text>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr);" class="padding-14-16">
                <tedi-text element="label" modifiers="bold">
                    Label bold
                </tedi-text>
                <tedi-text element="label" modifiers="bold" class="mobile">
                    Label bold
                </tedi-text>
            </div>
        </div>
    `,
  }),
};

export const GeneralTextColors: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <div>
          <div style="margin-bottom: 1rem;">
            <tedi-text>
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
          <div style="margin-bottom: 1rem;">
            <tedi-text color="secondary">
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
          <div style="margin-bottom: 1rem;">
            <tedi-text color="tertiary">
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
          <div style="margin-bottom: 1rem;">
            <tedi-text color="brand">
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
          <div class="bg bg-primary">
            <tedi-text color="white">
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
        </div>
    `,
  }),
};

export const StatusTextColors: StoryObj<TextComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <div>
          <div style="margin-bottom: 1rem;">
            <tedi-text color="success">
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
          <div style="margin-bottom: 1rem;">
            <tedi-text color="warning">
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
          <div style="margin-bottom: 1rem;">
            <tedi-text color="danger">
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
          <div style="margin-bottom: 1rem;">
            <tedi-text color="info">
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
          <div>
            <tedi-text color="neutral">
              Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
            </tedi-text>
          </div>
        </div>
    `,
  }),
};
