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
    small: {
      control: "boolean",
      description: "Should show small button instead of default button.",
      table: {
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean",
        },
      },
    },
    smallIcon: {
      control: "boolean",
      description: "Should show small icon instead of default icon.",
      table: {
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean",
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
    small: false,
    smallIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-close-button [small]="small" [smallIcon]="smallIcon"></button>
    `,
  }),
};

export const Small: Story = {
  args: {
    small: true,
    smallIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-close-button [small]="small" [smallIcon]="smallIcon"></button>
    `,
  }),
};

export const SmallIcon: Story = {
  args: {
    small: false,
    smallIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-close-button [small]="small" [smallIcon]="smallIcon"></button>
    `,
  }),
};

export const SmallButtonWithSmallIcon: Story = {
  args: {
    small: true,
    smallIcon: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-close-button [small]="small" [smallIcon]="smallIcon"></button>
    `,
  }),
};
