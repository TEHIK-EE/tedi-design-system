import {
  argsToTemplate,
  Meta,
  StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { IconComponent } from "./icon.component";
import { TextComponent } from "../text/text.component";

const SIZES = [8, 12, 16, 18, 24, 36, 48, "inherit"];
const SIZES_WITH_BG = [16, 24];
const COLORS = [
  "primary",
  "secondary",
  "tertiary",
  "brand",
  "brand-dark",
  "success",
  "warning",
  "warning-dark",
  "danger",
  "white",
];
const BACKGROUNDS = [
  "primary",
  "secondary",
  "brand-primary",
  "brand-secondary",
];

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/28835d-icon" target="_BLANK">Zeroheight ↗</a><hr/>
 * <a href="https://fonts.google.com/icons?icon.set=Material+Icons" target="_BLANK">Official Google Material Icons homepage icons ↗</a><br/>
 * <a href="https://www.figma.com/community/file/1014241558898418245/material-design-icons?searchSessionId=lvxhc4l5-a6 target="_BLANK">Material Icons Figma ↗</a><br/>
 * <a href="https://www.figma.com/community/plugin/740272380439725040/material-design-icons" target="_BLANK">Figma Material Symbols plugin ↗</a>
 */

export default {
  title: "TEDI-Ready/Base/Icon",
  component: IconComponent,
  decorators: [
    moduleMetadata({
      imports: [IconComponent, TextComponent],
    }),
  ],
  argTypes: {
    name: {
      description:
        "Name of the Material Icon <br /> https://fonts.google.com/icons",
      control: "text",
      table: {
        category: "inputs",
        type: { summary: "string" },
      },
    },
    size: {
      description: "Size of the icon in pixels.",
      control: "select",
      options: SIZES,
      table: {
        category: "inputs",
        type: {
          summary: "IconSize",
          detail:
            "Without background: 8 | 12 | 16 | 18 | 24 | 36 | 48 | inherit \nWith background: 16 | 24",
        },
        defaultValue: { summary: "24" },
      },
    },
    color: {
      description: "Color of the icon.",
      control: "select",
      options: COLORS,
      table: {
        category: "inputs",
        type: {
          summary: "IconColor",
          detail:
            "primary \nsecondary \ntertiary \nbrand \nbrand-dark \nsuccess \nwarning \nwarning-dark \ndanger \nwhite",
        },
        defaultValue: { summary: "primary" },
      },
    },
    background: {
      description:
        "Background color for the icon (adds a circular background).",
      control: "select",
      options: BACKGROUNDS,
      table: {
        category: "inputs",
        type: {
          summary: "IconBackground",
          detail: "primary \nsecondary \nbrand-primary \nbrand-secondary",
        },
      },
    },
    type: {
      description:
        "Type of Material Symbols icon style. <br /> It is recommended to only use one type throughout your app.",
      control: "radio",
      options: ["outlined", "sharp", "rounded"],
      table: {
        category: "inputs",
        type: { summary: "IconType", detail: "outlined \nsharp \nrounded" },
        defaultValue: { summary: "outlined" },
      },
    },
    variant: {
      description: "Whether the icon should be filled or outlined.",
      control: "radio",
      options: ["filled", "outlined"],
      table: {
        category: "inputs",
        type: { summary: "IconVariant", detail: "filled \noutlined" },
        defaultValue: { summary: "outlined" },
      },
    },
    label: {
      description:
        "Accessible label for screen readers. <br /> If omitted then the icon is hidden for screen-readers.",
      control: "text",
      table: {
        category: "inputs",
        type: { summary: "string" },
      },
    },
  },
} as Meta<IconComponent>;

export const Default: StoryObj<IconComponent> = {
  args: {
    name: "account_circle",
  },
  render: (args) => ({
    props: args,
    template: `<tedi-icon ${argsToTemplate(args)} />`,
  }),
};

export const IconSize: StoryObj<IconComponent> = {
  args: {
    name: "account_circle",
  },
  render: (args) => ({
    props: {
      ...args,
      sizes: SIZES,
    },
    template: `
      <div class="example-list">
        <div
          *ngFor="let size of sizes; let last = last"
          class="padding-14-16"
          [ngClass]="{ 'border-bottom': !last }"
          style="display: grid; grid-template-columns: repeat(2, 1fr); align-items: center;"
        >
          <div>
            {{ size }}
            @if (size === 24) {
              <small tedi-text color="secondary">default</small>
            }
          </div>
          <div class="display-flex" [ngStyle]="{ 'font-size': size === 'inherit' ? '60px' : ''}">
            <tedi-icon ${argsToTemplate(args)} [size]="size" />
            <tedi-icon ${argsToTemplate(args)} [size]="size" variant="filled" />
          </div>
        </div>
      </div>
    `,
  }),
};

export const IconSizeInsideBackground: StoryObj<IconComponent> = {
  args: {
    background: "brand-secondary",
    color: "brand",
  },
  render: (args) => ({
    props: {
      ...args,
      sizes: SIZES_WITH_BG,
    },
    template: `
      <div class="example-list">
        <div
          *ngFor="let size of sizes; let last = last"
          class="padding-14-16"
          [ngClass]="{ 'border-bottom': !last }"
          style="display: grid; grid-template-columns: repeat(2, 1fr); align-items: center;"
        >
          <div>
            {{ size }}
            @if (size === 24) {
              <small tedi-text color="secondary">default</small>
            }
          </div>
          <div class="display-flex">
            <tedi-icon ${argsToTemplate(args)} [name]="size === 16 ? 'info' : 'vaccines'" [size]="size" />
            &nbsp;
            <tedi-icon ${argsToTemplate(args)} [name]="size === 16 ? 'info' : 'vaccines'" [size]="size" variant="filled" />
          </div>
        </div>
      </div>
    `,
  }),
};

export const IconColors: StoryObj<IconComponent> = {
  args: {
    name: "account_circle",
    size: 48,
  },
  render: (args) => ({
    props: {
      ...args,
      colors: COLORS,
    },
    template: `
      <div>
        <div class="flex flex-column">
          Outlined
          <div class="flex align-items-center gap-3">
            <div
              *ngFor="let color of colors;"
              [ngStyle]="{
                'background': color === 'white' ? 'var(--general-icon-background-brand-primary)' : 'none',
                'borderRadius': color === 'white' ? '4px' : '0px',
                'padding': color === 'white' ? '16px' : '0px'
              }"
            >
              <tedi-icon ${argsToTemplate(args)} [color]="color" />
            </div>
          </div>
        </div>
        <div class="flex flex-column">
          Filled
          <div class="flex align-items-center gap-3">
            <div
              *ngFor="let color of colors;"
              [ngStyle]="{
                'background': color === 'white' ? 'var(--general-icon-background-brand-primary)' : 'none',
                'borderRadius': color === 'white' ? '4px' : '0px',
                'padding': color === 'white' ? '16px' : '0px'
              }"
            >
              <tedi-icon ${argsToTemplate(args)} variant="filled" [color]="color" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const IconBackgroundColors: StoryObj<IconComponent> = {
  args: {
    name: "account_circle",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex align-items-center gap-4">
        <tedi-icon ${argsToTemplate(args)} [name]="'vaccines'" color="white" background="brand-primary" [size]="24" />
        <tedi-icon ${argsToTemplate(args)} [name]="'info'" color="white" background="brand-primary" [size]="16" />
        <tedi-icon ${argsToTemplate(args)} [name]="'vaccines'" color="brand" background="brand-secondary" [size]="24" />
        <tedi-icon ${argsToTemplate(args)} [name]="'info'" color="brand" background="brand-secondary" [size]="16" />
        <div
          class="display-flex gap-3"
          [ngStyle]="{
              'background': 'var(--general-icon-background-brand-primary)',
              'borderRadius': '4px',
              'padding': '16px'
          }"
        >
          <tedi-icon ${argsToTemplate(args)} [name]="'vaccines'" color="brand" background="primary" [size]="24" />
          <tedi-icon ${argsToTemplate(args)} [name]="'info'" color="brand" background="primary" [size]="16" />
          <tedi-icon ${argsToTemplate(args)} [name]="'vaccines'" color="white" background="secondary" [size]="24" />
          <tedi-icon ${argsToTemplate(args)} [name]="'info'" color="white" background="secondary" [size]="16" />
        </div>
      </div>
    `,
  }),
};

export const UsedInsideText: StoryObj<IconComponent> = {
  args: {
    name: "account_circle",
    size: "inherit",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-1">
        <h1 tedi-text class="display-flex gap-1">
          <tedi-icon ${argsToTemplate(args)} />
          This is level 1 heading with inline
          <tedi-icon ${argsToTemplate(args)} color="brand" />
          icon
        </h1>
        <h2 tedi-text class="display-flex gap-1">
          <tedi-icon ${argsToTemplate(args)} />
          This is level 2 heading with inline
          <tedi-icon ${argsToTemplate(args)} color="brand" />
          icon
        </h2>
        <h3 tedi-text class="display-flex gap-1">
          <tedi-icon ${argsToTemplate(args)} />
          This is level 3 heading with inline
          <tedi-icon ${argsToTemplate(args)} color="brand" />
          icon
        </h3>
        <h4 tedi-text class="display-flex gap-1">
          <tedi-icon ${argsToTemplate(args)} />
          This is level 4 heading with inline
          <tedi-icon ${argsToTemplate(args)} color="brand" />
          icon
        </h4>
        <h5 tedi-text class="display-flex gap-1">
          <tedi-icon ${argsToTemplate(args)} />
          This is level 5 heading with inline
          <tedi-icon ${argsToTemplate(args)} color="brand" />
          icon
        </h5>
        <h6 tedi-text class="display-flex gap-1">
          <tedi-icon ${argsToTemplate(args)} />
          This is level 6 heading with inline
          <tedi-icon ${argsToTemplate(args)} color="brand" />
          icon
        </h6>
        <p tedi-text class="display-flex gap-1">
          <tedi-icon ${argsToTemplate(args)} />
          This is paragraph text with inline
          <tedi-icon ${argsToTemplate(args)} color="brand" />
          icon
        </p>
        <small class="display-flex gap-1">
          <tedi-icon ${argsToTemplate(args)} />
          This is small text with inline
          <tedi-icon ${argsToTemplate(args)} color="brand" />
          icon
        </small>
      </div>
    `,
  }),
};
