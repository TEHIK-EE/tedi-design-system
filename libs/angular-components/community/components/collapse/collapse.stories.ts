import { argsToTemplate, type Meta, type StoryObj } from "@storybook/angular";

import { CollapseComponent } from "./collapse.component";

export default {
  title: "Community Angular/Components/Collapse",
  component: CollapseComponent,
  args: {
    openText: "Näita rohkem infot",
    closeText: "Näita vähem infot",
    defaultOpen: false,
    hideOpenCloseText: false,
    arrowType: "default",
  },
  argTypes: {
    openText: {
      control: "text",
      description:
        "The title/header element for the collapsible section. Rendered inside the toggle button.",
      table: {
        defaultValue: { summary: "Open" },
      },
    },
    closeText: {
      control: "text",
      description:
        "Text shown on the toggle button when the content is expanded.",
      table: {
        defaultValue: { summary: "Close" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the collapse should be initially open.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hideOpenCloseText: {
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
      <tedi-collapse
        ${argsToTemplate(args)}
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rerum
          perspiciatis consectetur blanditiis maxime, optio minus amet similique!
          Et, saepe placeat. Omnis obcaecati corrupti repellat enim asperiores sunt
          quam laudantium voluptate optio deserunt distinctio harum dolores, iure
          unde nemo reprehenderit!
        </div>
      </tedi-collapse>
    `,
  }),
} as Meta<CollapseComponent>;

type Story = StoryObj<CollapseComponent>;

export const Default: Story = {};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
  },
};

export const HiddenOpenCloseText: Story = {
  args: {
    hideOpenCloseText: true,
  },
};

export const SecondaryArrowType: Story = {
  args: {
    arrowType: "secondary",
  },
};

export const CustomOpenCloseText: Story = {
  args: {
    openText: "Vajuta siia, et näha veel rohkem informatsiooni",
    closeText: "Vajuta siia, et peita kogu informatsioon",
  },
};

export const NoContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-collapse
        ${argsToTemplate(args)}
      >
        <!-- No content inside -->
      </tedi-collapse>
    `,
  }),
};

export const LongContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-collapse
        ${argsToTemplate(args)}
      >
        <div>
          ${"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50)}
        </div>
      </tedi-collapse>
    `,
  }),
};
