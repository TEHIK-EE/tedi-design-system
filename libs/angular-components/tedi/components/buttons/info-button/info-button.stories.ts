import { Meta, StoryObj } from "@storybook/angular";
import { InfoButtonComponent } from "./info-button.component";

export default {
  title: "Tedi-Ready Angular/Components/Buttons/InfoButton",
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
