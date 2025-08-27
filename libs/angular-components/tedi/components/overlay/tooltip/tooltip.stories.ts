import { type Meta, type StoryObj, moduleMetadata } from "@storybook/angular";
import { TooltipComponent } from "./tooltip.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { InfoButtonComponent } from "../../buttons/info-button/info-button.component";
import { RowComponent } from "../../helpers/grid/row/row.component";
import { ColComponent } from "../../helpers/grid/col/col.component";
import { VerticalSpacingItemDirective } from "../../../directives/vertical-spacing/vertical-spacing-item.directive";
import { TextComponent } from "../../base/text/text.component";
import { TooltipTriggerComponent } from "./tooltip-trigger.component";
import {
  TooltipContentComponent,
  TooltipPosition,
  TooltipWidth,
} from "./tooltip-content.component";

const MAXWIDTH = ["none", "small", "medium", "large"];

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117363&amp;m=dev" target="_blank">Figma ↗</a><br>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/035e20-tooltip" target="_blank">Zeroheight ↗</a>
 * <hr>
 * TooltipComponent is a component that displays a Tooltip when the user hovers over or clicks on an element.<br>
 * It uses the Angular CDK Overlay module to create a flexible connected overlay that can be positioned relative to the trigger element.<br>
 */

export default {
  title: "TEDI-Ready/Components/Overlay/Tooltip",
  component: TooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TooltipComponent,
        TooltipTriggerComponent,
        TooltipContentComponent,
        InfoButtonComponent,
        ButtonComponent,
        RowComponent,
        ColComponent,
        VerticalSpacingItemDirective,
        TextComponent,
      ],
    }),
  ],
  argTypes: {
    openWith: {
      control: "select",
      options: ["click", "hover"],
      description: "The event that triggers the tooltip.",
      table: {
        category: "tooltip inputs",
        type: {
          summary: "TooltipOpenWith",
          detail: "click \nhover",
        },
        defaultValue: {
          summary: "hover",
        },
      },
    },
    position: {
      control: "select",
      description:
        "The position of the tooltip relative to the trigger element. ",
      options: ["top", "bottom", "left", "right"],
      table: {
        category: "tooltip-content inputs",
        type: {
          summary: "TooltipPosition",
          detail: "top \nbottom \nleft \nright",
        },
        defaultValue: {
          summary: "top",
        },
      },
    },
    maxWidth: {
      control: "select",
      options: MAXWIDTH,
      description: "The width of the tooltip.",
      defaultValue: {
        summary: "medium",
      },
      table: {
        category: "tooltip-content inputs",
        type: {
          summary: "TooltipWidth",
          detail: "none \nsmall \nmedium \nlarge",
        },
      },
    },
  },
} as Meta<TooltipComponent>;

type Story = StoryObj<
  TooltipComponent & {
    position: TooltipPosition;
    maxWidth: TooltipWidth;
  }
>;

export const Default: Story = {
  args: {
    openWith: "hover",
    position: "top",
    maxWidth: "medium",
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-tooltip [openWith]="openWith">
        <tedi-tooltip-trigger>
          <button tedi-info-button></button>
        </tedi-tooltip-trigger>
        <tedi-tooltip-content [position]="position" [maxWidth]="maxWidth">
          This is tooltip content. The quick brown fox jumps over the lazy dog.
        </tedi-tooltip-content>
      </tedi-tooltip>
    `,
  }),
};

export const Positions: Story = {
  name: "Tooltip positions",
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="2" [gapY]="2" justifyItems="center">
        <tedi-col>
          <tedi-tooltip>
            <tedi-tooltip-trigger>
              Top
            </tedi-tooltip-trigger>
            <tedi-tooltip-content position="top">
              Tooltip content
            </tedi-tooltip-content>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip>
            <tedi-tooltip-trigger>
              Left
            </tedi-tooltip-trigger>
            <tedi-tooltip-content position="left">
              Tooltip content
            </tedi-tooltip-content>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip>
            <tedi-tooltip-trigger>
              Bottom
            </tedi-tooltip-trigger>
            <tedi-tooltip-content position="bottom">
              Tooltip content
            </tedi-tooltip-content>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip>
            <tedi-tooltip-trigger>
              Right
            </tedi-tooltip-trigger>
            <tedi-tooltip-content position="right">
              Tooltip content
            </tedi-tooltip-content>
          </tedi-tooltip>
        </tedi-col>
      </tedi-row>
    `,
  }),
};

export const OpenWithClick: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-tooltip openWith="click">
        <tedi-tooltip-trigger>
          <button tedi-info-button></button>
        </tedi-tooltip-trigger>
        <tedi-tooltip-content>
          Tooltip content
        </tedi-tooltip-content>
      </tedi-tooltip>
    `,
  }),
};

export const TextTrigger: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p>
        Tooltip works even inside a text. Hover over
        <tedi-tooltip>
          <tedi-tooltip-trigger>
            this
          </tedi-tooltip-trigger>
          <tedi-tooltip-content>
            If tooltip trigger is a text, it will have an underline.
          </tedi-tooltip-content>
        </tedi-tooltip>
        text to see the tooltip.
      </p>
    `,
  }),
};

export const Widths: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="4">
        <tedi-col>
          <tedi-tooltip>
            <tedi-tooltip-trigger>
              Small tooltip width
            </tedi-tooltip-trigger>
            <tedi-tooltip-content maxWidth="small">
              This is an example for small tooltip. The quick brown fox jumps over the lazy dog.
            </tedi-tooltip-content>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip>
            <tedi-tooltip-trigger>
              Medium tooltip width
            </tedi-tooltip-trigger>
            <tedi-tooltip-content maxWidth="medium">
              This is an example for medium tooltip. The quick brown fox jumps over the lazy dog.
            </tedi-tooltip-content>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip>
            <tedi-tooltip-trigger>
              Large tooltip width
            </tedi-tooltip-trigger>
            <tedi-tooltip-content maxWidth="large">
              This is an example for large tooltip. The quick brown fox jumps over the lazy dog.
            </tedi-tooltip-content>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip>
            <tedi-tooltip-trigger>
              Tooltip with no width limit
            </tedi-tooltip-trigger>
            <tedi-tooltip-content maxWidth="none">
              This is an example for no max width tooltip. The quick brown fox jumps over the lazy dog.
            </tedi-tooltip-content>
          </tedi-tooltip>
        </tedi-col>
      </tedi-row>
    `,
  }),
};

export const CustomContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-tooltip>
        <tedi-tooltip-trigger>
          <span>Trigger</span>
        </tedi-tooltip-trigger>
        <tedi-tooltip-content>
          This <b>tooltip trigger</b> does not have an <u>underline,</u> because it is <i>wrapped in a span.</i>
        </tedi-tooltip-content>
      </tedi-tooltip>
    `,
  }),
};
