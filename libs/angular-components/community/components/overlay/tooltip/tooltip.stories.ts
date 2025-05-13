import {
  argsToTemplate,
  type Meta,
  type StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { TooltipComponent } from "./tooltip.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { InfoButtonComponent } from "../../buttons/info-button/info-button.component";
import { RowComponent, ColComponent, VerticalSpacingItemDirective, TextComponent } from "@tehik-ee/tedi-angular/tedi";

const MAXWIDTH = ["none", "small", "medium", "large"];

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117363&amp;m=dev" target="_BLANK">Figma ↗</a><br>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/035e20-tooltip" target="_BLANK">Zeroheight ↗</a>
 * <hr>
 * TooltipComponent is a component that displays a Tooltip when the user hovers over or clicks on an element.<br>
 * It uses the Angular CDK Overlay module to create a flexible connected overlay that can be positioned relative to the trigger element.<br>
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
    position: "top",
    maxWidth: "medium",
    openWith: "hover",
  },
  argTypes: {
    text: {
      control: "text",
      description: "The text to display in the tooltip.",
    },
    position: {
      control: "text",
      description:
        "The position of the tooltip relative to the trigger element. ",
      defaultValue: {
        summary: "top",
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
          <tedi-tooltip text="Tooltip content" position="top">
            <button #tooltipTrigger tedi-button>Top</button>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip text="Tooltip content" position="left">
            <button #tooltipTrigger tedi-button>Left</button>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip text="Tooltip content" position="bottom">
            <button #tooltipTrigger tedi-button>Bottom</button>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip text="Tooltip content" position="right">
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
      <tedi-tooltip text="Tooltip content" position="top">
        <span #tooltipTrigger tedi-text style="cursor: pointer" color="brand">this</span>
      </tedi-tooltip>
      text to see the tooltip. 
    </p>`,
  }),
};

export const Widths: Story = {
  name: "maxWidth examples",
  render: (args) => ({
    props: args,
    template: `
      <tedi-row cols="1" gapY="2" justifyItems="center">
        <tedi-col>
          <tedi-tooltip text="This is an example for small tooltip. The quick brown fox jumps over the lazy dog" maxWidth="small">
            <button #tooltipTrigger tedi-button>Small tooltip</button>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip text="This is an example of medium tooltip. The quick brown fox jumps over the lazy dog" maxWidth="medium">
            <button #tooltipTrigger tedi-button>Medium tooltip</button>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip text="This is an example for large tooltip. The quick brown fox jumps over the lazy dog" maxWidth="large">
            <button #tooltipTrigger tedi-button>Large tooltip</button>
          </tedi-tooltip>
        </tedi-col>
        <tedi-col>
          <tedi-tooltip text="This tooltip has no max width and is really wide. The quick brown fox jumps over the lazy dog" maxWidth="none">
            <button #tooltipTrigger tedi-button>Full width</button>
          </tedi-tooltip>
        </tedi-col>
      </tedi-row>
      `,
  }),
};
