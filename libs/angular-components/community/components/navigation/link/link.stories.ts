import {
  argsToTemplate,
  Meta,
  StoryObj,
  moduleMetadata,
  StoryFn,
} from "@storybook/angular";
import { LinkComponent } from "./link.component";
import {
  ColComponent,
  RowComponent,
  TextColor,
} from "libs/angular-components/tedi/public-api";
import { TextComponent } from "libs/angular-components/tedi/public-api";

const PSEUDO_STATE = ["Default", "Hover", "Active", "Focus"];

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2160-25385&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/76e0c0-link" target="_BLANK">Zeroheight ↗</a>
 * Link component inputs extend on Angular RouterLink inputs: https://angular.dev/api/router/RouterLink
 */

export default {
  title: "Community Angular/Navigation/Link",
  component: LinkComponent,
  decorators: [
    moduleMetadata({
      imports: [LinkComponent, RowComponent, ColComponent, TextComponent],
    }),
  ],
  parameters: {
    status: {
      type: ["breakpointSupport"],
    },
  },
} as Meta<LinkComponent>;

export const Default: StoryObj<LinkComponent> = {
  render: (args) => ({
    props: args,
    template: `<tedi-link ${argsToTemplate(args)}>Link</tedi-link>`,
  }),
};

export const Sizes: StoryObj<LinkComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="example-list">
        <tedi-row [cols]="2" [class]="'padding-14-16 border-bottom'">
          <tedi-col>Default</tedi-col>
          <tedi-col>
            <tedi-link ${argsToTemplate(args)}>View result</tedi-link>
          </tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16'">
          <tedi-col>Small</tedi-col>
          <tedi-col>
            <tedi-link ${argsToTemplate(args)} [size]="'small'">View result</tedi-link>
          </tedi-col>
        </tedi-row>
      </div>
    `,
  }),
};

export const Colors: StoryObj<LinkComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <tedi-link ${argsToTemplate(args)}>
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </tedi-link>
        <tedi-link ${argsToTemplate(args)} [underline]="false">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </tedi-link>
        <div style="display: flex; flex-direction: column; gap: 1rem; background: var(--general-icon-background-brand-primary); border-radius: 4px; padding: 1rem;">
          <tedi-link ${argsToTemplate(args)} [variant]="'inverted'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-link>
          <tedi-link ${argsToTemplate(args)} [variant]="'inverted'" [underline]="false">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </tedi-link>
        </div>
      </div>
    `,
  }),
};

type TemplateType = LinkComponent & { titleColor?: TextColor };

const LinkTemplate: StoryFn<TemplateType> = ({
  titleColor = "primary",
  ...args
}) => ({
  props: { ...args, titleColor: titleColor, pseudoState: PSEUDO_STATE },
  template: `
    <tedi-row [cols]="1" [xl]="{ cols: 2 }" [gapY]="5">
      <tedi-col [class]="'tedi-vertical-spacing'" style="--vertical-spacing-internal: 1em;">
        <tedi-text [modifiers]="'bold'" [color]="titleColor">Default size</tedi-text>
        <tedi-row *ngFor="let state of pseudoState;" [cols]="4" [alignItems]="'center'">
          <tedi-col>
            <tedi-text [color]="titleColor">{{ state }}</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-link [id]="state" ${argsToTemplate(args)}>View result</tedi-link>
          </tedi-col>
          <tedi-col>
            <tedi-link [id]="state" [iconRight]="'arrow_forward'" ${argsToTemplate(args)}>Continue</tedi-link>
          </tedi-col>
          <tedi-col>
            <tedi-link [id]="state" [iconLeft]="'arrow_back'" ${argsToTemplate(args)}>Back</tedi-link>
          </tedi-col>
        </tedi-row>
      </tedi-col>
      <tedi-col [class]="'tedi-vertical-spacing'" style="--vertical-spacing-internal: 1em;">
        <tedi-text [modifiers]="'bold'" [color]="titleColor">Small size</tedi-text>
        <tedi-row *ngFor="let state of pseudoState;" [cols]="4" [alignItems]="'center'">
          <tedi-col>
            <tedi-text [color]="titleColor">{{ state }}</tedi-text>
          </tedi-col>
          <tedi-col>
            <tedi-link [id]="state" [size]="'small'" ${argsToTemplate(args)}>View result</tedi-link>
          </tedi-col>
          <tedi-col>
            <tedi-link [id]="state" [iconRight]="'arrow_forward'" [size]="'small'" ${argsToTemplate(args)}>
              Continue
            </tedi-link>
          </tedi-col>
          <tedi-col>
            <tedi-link [id]="state" [iconLeft]="'arrow_back'" [size]="'small'" ${argsToTemplate(args)}>
              Back
            </tedi-link>
          </tedi-col>
        </tedi-row>
      </tedi-col>
    </tedi-row>
  `,
});

export const DefaultUnderlined: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  render: LinkTemplate,
};

export const DefaultNoUnderline: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    underline: false,
  },
  render: LinkTemplate,
};

export const InvertedUnderlined: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
    backgrounds: { default: "brand" },
  },
  args: {
    variant: "inverted",
    titleColor: "white",
  },
  render: LinkTemplate,
};

export const InvertedNoUnderline: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
    backgrounds: { default: "brand" },
  },
  args: {
    variant: "inverted",
    underline: false,
    titleColor: "white",
  },
  render: LinkTemplate,
};
