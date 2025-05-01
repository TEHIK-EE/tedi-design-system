import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { CloseButtonComponent } from "./closing-button.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-63815&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/30df1b-closing-button" target="_BLANK">Zeroheight ↗</a>
 *
 * A closing button component used for dismissing content or dialogs. It's typically displayed as an 'X' icon and can be used in various scenarios such as closing modals, popovers, or panels.
 */
export default {
  title: "Community Angular/Buttons/ClosingButton",
  component: CloseButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [IconComponent],
    }),
  ],
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "small"],
      description: "Size of the close button.",
      table: {
        defaultValue: { summary: "default" },
        type: {
          summary: "CloseButtonSize",
          detail: '"default" | "small"',
        },
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
} as Meta<CloseButtonComponent>;

type Story = StoryObj<CloseButtonComponent>;

export const Default: Story = {
  args: {
    size: "default",
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-close-button [size]="size"></button>
    `,
  }),
};

export const Small: Story = {
  args: {
    size: "small",
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-close-button [size]="size"></button>
    `,
  }),
};
