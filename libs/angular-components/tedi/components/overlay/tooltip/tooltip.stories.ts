import {
  argsToTemplate,
  type Meta,
  type StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { TooltipComponent } from "./tooltip.component";
import { InfoButtonComponent } from "community";

const MAXWIDTH = ["none", "small", "medium", "large"];

export default {
  title: "TEDI-Ready Angular/Components/Overlay/Tooltip",
  component: TooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [TooltipComponent, InfoButtonComponent],
    }),
  ],
  args: {
    text: "Hello",
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
        'The position of the tooltip relative to the trigger element. Options are "top", "bottom", "left", or "right".',
      defaultValue: {
        summary: "top, bottom, left, right",
      },
    },
    maxWidth: {
      control: "select",
      options: MAXWIDTH,
      description:
        'The width of the tooltip. Options are "none", "small", "medium", or "large".',
      defaultValue: {
        summary: "medium",
      },
    },
    openWith: {
      control: "select",
      options: ["click", "hover"],
      description:
        'The event that triggers the tooltip. Options are "click" or "hover".',
      defaultValue: {
        summary: "hover",
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-tooltip ${argsToTemplate(args)}>
        <div #tooltipTrigger><button tedi-info-button></button></div>
      </tedi-tooltip>
    `,
  }),
} as Meta<TooltipComponent>;

type Story = StoryObj<TooltipComponent>;

export const Default: Story = {};
