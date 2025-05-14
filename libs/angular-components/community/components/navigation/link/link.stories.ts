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
} from "@tehik-ee/tedi-angular/tedi";
import { TextComponent } from "@tehik-ee/tedi-angular/tedi";

const PSEUDO_STATE = ["Default", "Hover", "Active", "Focus"];

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2160-25385&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/76e0c0-link" target="_BLANK">Zeroheight ↗</a>
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
      type: ["breakpointSupport", "existsInTediReady"],
    },
  },
  argTypes: {
    ngContent: {
      name: "ng-content",
      description: "Link text.",
      control: "text",
    },
    variant: {
      description: "Variant of the link.",
      control: "select",
      options: ["default", "inverted"],
      table: {
        category: "inputs",
        type: { summary: "LinkVariant", detail: "default \ninverted" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      description: "Size of the link.",
      control: "select",
      options: ["default", "small"],
      table: {
        category: "inputs",
        type: { summary: "LinkSize", detail: "default \nsmall" },
        defaultValue: { summary: "default" },
      },
    },
    underline: {
      description: "Does link have underline?",
      control: "boolean",
      table: {
        category: "inputs",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    iconLeft: {
      description: "Name of the icon we want to show on the left.",
      control: "text",
      table: {
        category: "inputs",
        type: { summary: "string" },
      },
    },
    iconRight: {
      description: "Name of the icon we want to show on the right.",
      control: "text",
      table: {
        category: "inputs",
        type: { summary: "string" },
      },
    },
    xs: {
      description: "Overrides LinkInputs on xs breakpoint (<576px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "LinkInputs",
        },
      },
    },
    sm: {
      description: "Overrides LinkInputs on sm breakpoint (≥576px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "LinkInputs",
        },
      },
    },
    md: {
      description: "Overrides LinkInputs on md breakpoint (≥768px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "LinkInputs",
        },
      },
    },
    lg: {
      description: "Overrides LinkInputs on lg breakpoint (≥992px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "LinkInputs",
        },
      },
    },
    xl: {
      description: "Overrides LinkInputs on xl breakpoint (≥1200px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "LinkInputs",
        },
      },
    },
    xxl: {
      description: "Overrides LinkInputs on xxl breakpoint (≥1400px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "LinkInputs",
        },
      },
    },
  },
} as Meta<LinkComponent>;

type LinkType = LinkComponent & { ngContent: string };

export const Default: StoryObj<LinkType> = {
  args: {
    ngContent: "Link",
  },
  render: ({ ngContent, ...args }) => ({
    props: { ngContent, ...args },
    template: `<a tedi-link ${argsToTemplate(args)}>${ngContent}</a>`,
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
            <a tedi-link ${argsToTemplate(args)}>View result</a>
          </tedi-col>
        </tedi-row>
        <tedi-row [cols]="2" [class]="'padding-14-16'">
          <tedi-col>Small</tedi-col>
          <tedi-col>
            <a tedi-link ${argsToTemplate(args)} [size]="'small'">View result</a>
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
        <a tedi-link ${argsToTemplate(args)}>
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </a>
        <a tedi-link ${argsToTemplate(args)} [underline]="false">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </a>
        <div style="display: flex; flex-direction: column; gap: 1rem; background: var(--general-icon-background-brand-primary); border-radius: 4px; padding: 1rem;">
          <a tedi-link ${argsToTemplate(args)} [variant]="'inverted'">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </a>
          <a tedi-link ${argsToTemplate(args)} [variant]="'inverted'" [underline]="false">
            Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
          </a>
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
        <p tedi-text [modifiers]="'bold'" [color]="titleColor">Default size</p>
        <tedi-row *ngFor="let state of pseudoState;" [cols]="4">
          <tedi-col>
            <p tedi-text [color]="titleColor">{{ state }}</p>
          </tedi-col>
          <tedi-col>
            <a tedi-link [id]="state" ${argsToTemplate(args)}>View result</a>
          </tedi-col>
          <tedi-col>
            <a tedi-link [id]="state" [iconRight]="'arrow_forward'" ${argsToTemplate(args)}>Continue</a>
          </tedi-col>
          <tedi-col>
            <a tedi-link [id]="state" [iconLeft]="'arrow_back'" ${argsToTemplate(args)}>Back</a>
          </tedi-col>
        </tedi-row>
      </tedi-col>
      <tedi-col [class]="'tedi-vertical-spacing'" style="--vertical-spacing-internal: 1em;">
        <p tedi-text [modifiers]="'bold'" [color]="titleColor">Small size</p>
        <tedi-row *ngFor="let state of pseudoState;" [cols]="4">
          <tedi-col>
            <p tedi-text [color]="titleColor">{{ state }}</p>
          </tedi-col>
          <tedi-col>
            <a tedi-link [id]="state" [size]="'small'" ${argsToTemplate(args)}>View result</a>
          </tedi-col>
          <tedi-col>
            <a tedi-link [id]="state" [iconRight]="'arrow_forward'" [size]="'small'" ${argsToTemplate(args)}>
              Continue
            </a>
          </tedi-col>
          <tedi-col>
            <a tedi-link [id]="state" [iconLeft]="'arrow_back'" [size]="'small'" ${argsToTemplate(args)}>
              Back
            </a>
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
