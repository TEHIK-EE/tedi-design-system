import { argsToTemplate, type Meta, type StoryObj } from "@storybook/angular";

import { CollapseComponent } from "./collapse.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.0.4-(work-in-progress)?node-id=15433-138256&amp;m=dev" target="_BLANK" class="sbdocs sbdocs-a css-ajfpqr">Figma ↗</a><br>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/546461-floating-button" target="_BLANK" class="sbdocs sbdocs-a css-ajfpqr">Zeroheight ↗</a>
 * <hr>
 * <p>Collapse component is used to hide or show content.</p>
 */

export default {
  title: "TEDI Ready/Components/Buttons/Collapse",
  component: CollapseComponent,
  args: {
    defaultOpen: false,
    hideCollapseText: false,
    arrowType: "default",
  },
  argTypes: {
    openText: {
      control: "text",
      description:
        "The title for the collapsible section. Rendered inside the toggle button.",
      table: {
        type: { summary: "string" },
      },
    },
    closeText: {
      control: "text",
      description:
        "Text shown on the toggle button when the content is expanded.",
      table: {
        type: { summary: "string" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Optional prop to set the collapse open by default.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hideCollapseText: {
      control: "boolean",
      description: "To show or hide the openText and closeText",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    arrowType: {
      control: "radio",
      options: ["default", "secondary"],
      description:
        "You are able to toggle different arrow styles. Arrow type 'secondary' will add a circle over the icon.",
      table: {
        defaultValue: { summary: "default" },
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-collapse ${argsToTemplate(args)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rerum
        perspiciatis consectetur blanditiis maxime, optio minus amet similique!
        Et, saepe placeat. Omnis obcaecati corrupti repellat enim asperiores sunt
        quam laudantium voluptate optio deserunt distinctio harum dolores, iure
        unde nemo reprehenderit!
      </tedi-collapse>
    `,
  }),
} as Meta<CollapseComponent>;

type Story = StoryObj<CollapseComponent>;

export const Default: Story = {
  args: {
    openText: "Open",
    closeText: "Close",
  },
};

export const IconNeutralButton: Story = {
  args: {
    arrowType: "default",
    hideCollapseText: true,
  },
};

export const IconSecondaryButton: Story = {
  args: {
    arrowType: "secondary",
    hideCollapseText: true,
  },
};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
    openText: "Open",
    closeText: "Close",
  },
};
