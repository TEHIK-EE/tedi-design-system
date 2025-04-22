import {
  argsToTemplate,
  type Meta,
  type StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { TooltipComponent } from "./tooltip.component";
import { ButtonComponent, InfoButtonComponent } from "community";
import { RowComponent } from "tedi/components/layout/grid/row/row.component";
import { ColComponent } from "tedi/components/layout/grid/col/col.component";
import { VerticalSpacingItemDirective } from "tedi/directives/vertical-spacing/vertical-spacing-item.directive";
import { TextComponent } from "tedi/components/base/text/text.component";

const MAXWIDTH = ["none", "small", "medium", "large"];

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117363&amp;m=dev" target="_BLANK">Figma ↗</a><br>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/035e20-tooltip" target="_BLANK">Zeroheight ↗</a>
 * <hr>
 * TooltipComponent is a component that displays a Tooltip when the user hovers over or clicks on an element.<br>
 * It uses the Angular CDK Overlay module to create a flexible connected overlay that can be positioned relative to the trigger element.<br>
 *
 * It is recommended to always specify backup positions for the tooltip.
 * If you only specify one position, the tooltip will only be displayed in that position.
 * If you specify multiple positions, the tooltip will be displayed in the first position that fits.
 * If the tooltip cannot be positioned in the specified direction, the CDK will try to position the tooltip
 * in the next direction in the positions list.
 */

export default {
  title: "Community Angular/Overlay/Tooltip",
  component: TooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TooltipComponent,
        InfoButtonComponent,
        ButtonComponent,
        RowComponent,
        ColComponent,
        VerticalSpacingItemDirective,
        TextComponent,
      ],
    }),
  ],
  args: {
    text: "Tooltip content",
    positions: "top, bottom, left, right",
    maxWidth: "medium",
    openWith: "hover",
  },
  argTypes: {
    text: {
      control: "text",
      description: "The text to display in the tooltip.",
    },
    positions: {
      control: "text",
      description:
        "The position of the tooltip relative to the trigger element. ",
      defaultValue: {
        summary: '"top, bottom, left, right"',
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
        type: {
          summary: "none | small | medium | large",
        },
      },
    },
    openWith: {
      control: "select",
      options: ["click", "hover"],
      description: "The event that triggers the tooltip.",
      defaultValue: {
        summary: "hover",
      },
      table: {
        type: {
          summary: "click | hover",
        },
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-tooltip ${argsToTemplate(args)}>
        <button #tooltipTrigger tedi-info-button></button>
      </tedi-tooltip>
    `,
  }),
} as Meta<TooltipComponent>;

type Story = StoryObj<TooltipComponent>;

export const Default: Story = {};

export const Positions: Story = {
  name: "Tooltip positions",
  render: (args) => ({
    props: args,
    template: `
      <tedi-row cols="2" gapY="2" justifyItems="center">
        <tedi-col>
          <tedi-tooltip text="Tooltip content" positions="top">
            <button #tooltipTrigger tedi-button>Top</button>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip text="Tooltip content" positions="left">
            <button #tooltipTrigger tedi-button>Left</button>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip text="Tooltip content" positions="bottom">
            <button #tooltipTrigger tedi-button>Bottom</button>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip text="Tooltip content" positions="right">
            <button #tooltipTrigger tedi-button>Right</button>
          </tedi-tooltip>
        </tedi-col>
      </tedi-row>
    `,
  }),
};

export const Click: Story = {
  name: "Open with click",
  args: {
    openWith: "click",
  },
};

export const Hover: Story = {
  name: "Text example",
  args: {
    openWith: "hover",
  },
  render: (args) => ({
    props: args,
    template: `<p tedi-text>Tooltip works even inside a text. Hover over 
      <tedi-tooltip text="Tooltip content" positions="top">
        <span #tooltipTrigger tedi-text color="brand">this</span>
      </tedi-tooltip>
      text to see the tooltip. 
    </p>`,
  }),
};
