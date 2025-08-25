import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from "@storybook/angular";

import { ClosingButtonComponent } from "./closing-button.component";
import {
  ColComponent,
  IconComponent,
  RowComponent,
  VerticalSpacingDirective,
} from "@tehik-ee/tedi-angular/tedi";

const PSEUDO_STATE = ["Default", "Hover", "Active", "Focus"];

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-63815&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/30df1b-closing-button" target="_BLANK">Zeroheight ↗</a>
 *
 * A closing button component used for dismissing content or dialogs. It's typically displayed as an 'X' icon and can be used in various scenarios such as closing modals, popovers, or panels.
 */
export default {
  title: "TEDI-Ready Angular/Buttons/ClosingButton",
  component: ClosingButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        VerticalSpacingDirective,
        IconComponent,
        RowComponent,
        ColComponent,
      ],
    }),
  ],
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "small"],
      description: "The size of the button.",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    iconSize: {
      control: "radio",
      options: ["24", "18"],
      description: "The size of the button in pixels",
      table: {
        defaultValue: { summary: "24" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A button component used for closing or dismissing UI elements such as modals, popovers, or panels.",
      },
    },
    status: {
      type: ["breakpointSupport"],
    },
  },
} as Meta<ClosingButtonComponent>;

type Story = StoryObj<ClosingButtonComponent>;

export const Default: Story = {
  args: {
    size: "default",
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-closing-button ${argsToTemplate(args)}></button>
    `,
  }),
};

export const Size: Story = {
  args: {
    size: "default",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="example-list" tediVerticalSpacing="1">
        <tedi-row class="padding-14-16 border-bottom" [gap]="3">
          <tedi-col>
            Default
          </tedi-col>
          <tedi-col>
            <button tedi-closing-button></button>
          </tedi-col>
        </tedi-row>
        <tedi-row class="padding-14-16" [gap]="3">
          <tedi-col>
            Small
          </tedi-col>
          <tedi-col>
            <button tedi-closing-button size="small"></button>
          </tedi-col>
        </tedi-row>
      </div>
    `,
  }),
};

export const IconSize: Story = {
  args: {
    size: "default",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="example-list" tediVerticalSpacing="1">
        <tedi-row class="padding-14-16 border-bottom" [gap]="3">
          <tedi-col>
            18px
          </tedi-col>
          <tedi-col>
            <button tedi-closing-button size="small" iconSize="18"></button>
          </tedi-col>
        </tedi-row>
        <tedi-row class="padding-14-16" [gap]="3">
          <tedi-col>
            24px
          </tedi-col>
          <tedi-col style="display: flex; align-items: center; gap: 1rem">
            <button tedi-closing-button></button>
            <button tedi-closing-button size="small"></button>
          </tedi-col>
        </tedi-row>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  render: (args) => ({
    props: { args, PSEUDO_STATE },
    template: `
      <tedi-row [cols]="1" [gapY]="3">
        <tedi-col *ngFor="let state of PSEUDO_STATE;" style="max-width: 200px; display: grid; grid-template-columns: repeat(2, 1fr); align-items: center;">
          <b>{{ state }}</b>
          <button tedi-closing-button ${argsToTemplate(args)} [id]="state"></button>
        </tedi-col>
      </tedi-row>
    `,
  }),
};
