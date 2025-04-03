import { Meta, StoryObj } from "@storybook/angular";
import { InfoButtonComponent } from "./info-button.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-72997&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/0341c9-info-button" target="_BLANK">Zeroheight ↗</a>
 * This is a simple info button component that can be used to display additional information when hovered over. It's mosty used together wihh tooltips or popovers.
 * It can be used in various contexts, such as forms, dashboards, or any other UI where additional information is needed.
 */

export default {
  title: "Community Angular/Buttons/InfoButton",
  impots: [],
  argTypes: {
    isSmall: {
      description:
        "If true, applies a small size to the InfoButton. \n @default false",
      control: {
        type: "boolean",
      },
      table: {
        type: {
          summary: "boolean",
          detail: "true \nfalse",
        },
        defaultValue: { summary: "false" },
      },
    },
    title: {
      description:
        "Title for the info button. Will be displayed as default HTML tooltip",
      control: {
        type: "text",
      },
    },
    label: {
      description: "Aria label for the info button.",
      control: {
        type: "text",
      },
      table: {
        type: {
          detail: "Aria label for info button",
        },
      },
    },
  },
  component: InfoButtonComponent,
} as Meta<InfoButtonComponent>;

export const Default: StoryObj<InfoButtonComponent> = {
  render: (args) => ({
    props: args,
  }),
  args: {
    isSmall: false,
    title: "Info Button title",
    label: "Aria label for info button",
  },
};
