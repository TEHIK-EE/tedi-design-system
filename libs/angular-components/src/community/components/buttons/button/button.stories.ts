import { Meta, StoryObj } from "@storybook/angular";
import { ButtonComponent } from "./button.component";

export default {
  title: "TEDI-Ready Angular/Buttons/Button",
  component: ButtonComponent,
  render: (props) => ({
    props,
    template: `
        <button tedi-button [variant]="variant" [size]="size" [inverted]="inverted" [disabled]="disabled" [fullWidth]="fullWidth">Button</button>
      `,
  }),
  args: {
    size: "md",
    variant: "primary",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md"],
      description: "Defines the size of the button.",
      table: {
        defaultValue: { summary: "md" },
        type: {
          summary: '"sm"  | "md"',
        },
      },
    },
    variant: {
      control: "radio",
      options: [
        "primary",
        "secondary",
        "neutral",
        "success",
        "danger",
        "danger-neutral",
      ],
      description:
        "Specifies the color theme of the button. The color should meet accessibility standards for color contrast.",
      table: {
        defaultValue: { summary: "primary" },
        type: {
          summary:
            '"primary"  | "secondary" | "neutral" | "success" | "danger" | "danger-neutral"',
        },
      },
    },
    inverted: {
      description: "Inverts button color scheme.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean",
        },
      },
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
      description: "Button takes container width.",
      table: {
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean",
        },
      },
    },
  },
} as Meta<ButtonComponent>;

type ButtonStory = StoryObj<ButtonComponent & { disabled: boolean }>;

export const Primary: ButtonStory = {
  args: {
    variant: "primary",
  },
};

export const Secondary: ButtonStory = {
  args: {
    variant: "secondary",
  },
};

export const Neutral: ButtonStory = {
  args: {
    variant: "neutral",
  },
};

export const Success: ButtonStory = {
  args: {
    variant: "success",
  },
};

export const Danger: ButtonStory = {
  args: {
    variant: "danger",
  },
};

export const DangerNeutral: ButtonStory = {
  args: {
    variant: "danger-neutral",
  },
};

export const Small: ButtonStory = {
  args: {
    size: "sm",
  },
};

export const Inverted: ButtonStory = {
  args: {
    inverted: true,
  },
};

export const Disabled: ButtonStory = {
  args: {
    disabled: true,
  },
};

export const FullWidth: ButtonStory = {
  args: {
    fullWidth: true,
  },
};
