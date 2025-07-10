import {
  type Meta,
  type StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { PopoverComponent } from "./popover.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { InfoButtonComponent } from "../../buttons/info-button/info-button.component";
import { RowComponent } from "../../layout/grid/row/row.component";
import { ColComponent } from "../../layout/grid/col/col.component";
import { VerticalSpacingItemDirective } from "../../../directives/vertical-spacing/vertical-spacing-item.directive";
import { TextComponent } from "../../base/text/text.component";
import { PopoverTriggerComponent } from "./popover-trigger.component";
import { PopoverContentComponent, PopoverPosition, PopoverWidth } from "./popover-content.component";

const MAXWIDTH = ["none", "small", "medium", "large"];

export default {
  title: "TEDI-Ready Angular/Overlay/Popover",
  component: PopoverComponent,
  decorators: [
    moduleMetadata({
      imports: [
        PopoverComponent,
        PopoverTriggerComponent,
        PopoverContentComponent,
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
          summary: "hover"
        }
      },
    },
    position: {
      control: "select",
      description: "The position of the tooltip relative to the trigger element. ",
      options: ["top", "bottom", "left", "right"],
      table: {
        category: "tooltip-content inputs",
        type: {
          summary: "TooltipPosition", detail: "top \nbottom \nleft \nright"
        },
        defaultValue: {
          summary: "top",
        },
        
      }
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
} as Meta<PopoverComponent>;

type Story = StoryObj<PopoverComponent & { 
  position: PopoverPosition;
  maxWidth: PopoverWidth;
}>;

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
      <tedi-popover [openWith]="openWith">
        <tedi-popover-trigger>
          <button tedi-info-button></button>
        </tedi-popover-trigger>
        <tedi-popover-content [position]="position" [maxWidth]="maxWidth">
          This is tooltip content. The quick brown fox jumps over the lazy dog.
        </tedi-popover-content>
      </tedi-popover>
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
          <tedi-popover>
            <tedi-popover-trigger>
              Top
            </tedi-popover-trigger>
            <tedi-popover-content position="top">
              Tooltip content
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Left
            </tedi-popover-trigger>
            <tedi-popover-content position="left">
              Tooltip content
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Bottom
            </tedi-popover-trigger>
            <tedi-popover-content position="bottom">
              Tooltip content
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Right
            </tedi-popover-trigger>
            <tedi-popover-content position="right">
              Tooltip content
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
      </tedi-row>
    `,
  }),
};

export const OpenWithClick: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-popover openWith="click">
        <tedi-popover-trigger>
          <button tedi-info-button></button>
        </tedi-popover-trigger>
        <tedi-popover-content>
          Tooltip content
        </tedi-popover-content>
      </tedi-popover>
    `,
  }),
};

export const TextTrigger: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p>
        Tooltip works even inside a text. Hover over 
        <tedi-popover>
          <tedi-popover-trigger>
            this
          </tedi-popover-trigger>
          <tedi-popover-content>
            If tooltip trigger is a text, it will have an underline.
          </tedi-popover-content>
        </tedi-popover>
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
          <tedi-popover>
            <tedi-popover-trigger>
              Small tooltip width
            </tedi-popover-trigger>
            <tedi-popover-content maxWidth="small">
              This is an example for small tooltip. The quick brown fox jumps over the lazy dog.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Medium tooltip width
            </tedi-popover-trigger>
            <tedi-popover-content maxWidth="medium">
              This is an example for medium tooltip. The quick brown fox jumps over the lazy dog.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Large tooltip width
            </tedi-popover-trigger>
            <tedi-popover-content maxWidth="large">
              This is an example for large tooltip. The quick brown fox jumps over the lazy dog.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Tooltip with no width limit
            </tedi-popover-trigger>
            <tedi-popover-content maxWidth="none">
              This is an example for no max width tooltip. The quick brown fox jumps over the lazy dog.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
      </tedi-row>
    `,
  }),
};

export const CustomContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-popover>
        <tedi-popover-trigger>
          <span>Trigger</span>
        </tedi-popover-trigger>
        <tedi-popover-content>
          This <b>tooltip trigger</b> does not have an <u>underline,</u> because it is <i>wrapped in a span.</i>
        </tedi-popover-content>
      </tedi-popover>
    `,
  }),
};