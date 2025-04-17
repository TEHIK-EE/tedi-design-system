import type { Meta, StoryObj } from "@storybook/angular";

import { TooltipComponent } from "./tooltip.component";

export default {
  title: "TEDI-Ready Angular/Components/Overlay/Tooltip",
  component: TooltipComponent,
  render: (args) => ({
    props: args,
    template: `
      <tedi-tooltip text="Tooltip here">
        <button #trigger>Tooltip trigger</button>
      </tedi-tooltip>
    `,
  }),
} as Meta<TooltipComponent>;

type Story = StoryObj<TooltipComponent>;

export const Default: Story = {};
