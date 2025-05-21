import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from "@storybook/angular";

import { ClosingButtonComponent } from "./closing-button.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-63815&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/30df1b-closing-button" target="_BLANK">Zeroheight ↗</a>
 *
 * A closing button component used for dismissing content or dialogs. It's typically displayed as an 'X' icon and can be used in various scenarios such as closing modals, popovers, or panels.
 */
export default {
  title: "Community Angular/Buttons/ClosingButton",
  component: ClosingButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [IconComponent],
    }),
  ],
  argTypes: {
    size: {
      control: "radio",
      options: ["medium", "large"],
      description: "The size of the button.",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    title: {
      control: "text",
      description:
        "The title for the button. Used for accessibility and inside browsers default tooltip on hover.",
      table: {
        defaultValue: { summary: "Sulge" },
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
  },
} as Meta<ClosingButtonComponent>;

type Story = StoryObj<ClosingButtonComponent>;

export const Default: Story = {
  args: {
    size: "medium",
    title: "Sulge",
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-closing-button ${argsToTemplate(args)}></button>
    `,
  }),
};

export const Large: Story = {
  args: {
    size: "large",
    title: "Sulge",
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-closing-button ${argsToTemplate(args)}></button>
    `,
  }),
};
