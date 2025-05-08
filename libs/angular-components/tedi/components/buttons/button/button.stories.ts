import { argsToTemplate, Meta, moduleMetadata, StoryFn, StoryObj } from "@storybook/angular";
import { ButtonComponent } from "./button.component";
import { TextColor, TextComponent } from "../../base/text/text.component";
import { RowComponent } from "../../layout/grid/row/row.component";
import { ColComponent } from "../../layout/grid/col/col.component";
import { IconComponent } from "../../base/icon/icon.component";

const PSEUDO_STATE = ["Default", "Hover", "Active", "Focus", "Disabled"];

export default {
  title: "TEDI-Ready Angular/Buttons/Button",
  component: ButtonComponent,
  decorators: [
      moduleMetadata({
        imports: [ButtonComponent, RowComponent, ColComponent, TextComponent, IconComponent],
      }),
    ],
  args: {
    size: "default",
    variant: "primary",
  },
  argTypes: {
    ngContent: {
      name: "ng-content",
      description: "Link text.",
      control: "text",
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
      description: "Specifies the color theme of the button. The color should meet accessibility standards for color contrast.",
      table: {
        category: "inputs",
        defaultValue: { summary: "primary" },
        type: {
          summary:
            '"primary"  | "secondary" | "neutral" | "success" | "danger" | "danger-neutral"',
        },
      },
    },
    size: {
      control: "radio",
      options: ["small", "medium"],
      description: "Defines the size of the button.",
      table: {
        category: "inputs",
        defaultValue: { summary: "medium" },
        type: {
          summary: '"small"  | "medium"',
        },
      },
    },
  },
} as Meta<ButtonComponent>;

type ButtonType = ButtonComponent & { ngContent: string };

export const Default: StoryObj<ButtonType> = {
  args: {
    ngContent: "Button",
  },
  render: ({ ngContent, ...args }) => ({
    props: { ngContent, ...args },
    template: `<button tedi-button ${argsToTemplate(args)}>${ngContent}</button>`,
  }),
};

type TemplateType = ButtonComponent & { titleColor?: TextColor };

const ButtonTemplate: StoryFn<TemplateType> = ({
  titleColor = "primary",
  ...args
}) => ({
  props: { ...args, titleColor: titleColor, pseudoState: PSEUDO_STATE },
  template: `
    <tedi-row [cols]="1" [xl]="{ cols: 2 }" [gapY]="5">
      <tedi-col [class]="'tedi-vertical-spacing'" style="--vertical-spacing-internal: 1em;">
        <p tedi-text modifiers="bold" [color]="titleColor">Default</p>
        <tedi-row *ngFor="let state of pseudoState;" [cols]="5" alignItems="center">
          <tedi-col>
            <p tedi-text [color]="titleColor">{{ state }}</p>
          </tedi-col>
          <tedi-col>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'">Create</button>
          </tedi-col>
          <tedi-col>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'">
              Continue
              <tedi-icon name="arrow_right_alt" />
            </button>
          </tedi-col>
          <tedi-col justifySelf="center">
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'">
              <tedi-icon name="edit" />
              Edit
            </button>
          </tedi-col>
          <tedi-col>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'">
              <tedi-icon name="arrow_forward" />
            </button>
          </tedi-col>
        </tedi-row>
      </tedi-col>
      <tedi-col [class]="'tedi-vertical-spacing'" style="--vertical-spacing-internal: 1.4em;">
        <p tedi-text modifiers="bold" [color]="titleColor">Small</p>
        <tedi-row *ngFor="let state of pseudoState;" [cols]="5" alignItems="center">
          <tedi-col>
            <p tedi-text [color]="titleColor">{{ state }}</p>
          </tedi-col>
          <tedi-col>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'" [size]="'small'">Create</button>
          </tedi-col>
          <tedi-col>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'" [size]="'small'">
              Continue
              <tedi-icon name="arrow_right_alt" />
            </button>
          </tedi-col>
          <tedi-col justifySelf="center">
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'" [size]="'small'">
              <tedi-icon name="edit" />
              Edit
            </button>
          </tedi-col>
          <tedi-col>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'" [size]="'small'">
              <tedi-icon name="arrow_forward" />
            </button>
          </tedi-col>
        </tedi-row>
      </tedi-col>
    </tedi-row>
  `,
});

type ButtonStory = StoryObj<ButtonComponent & { disabled: boolean }>;

export const Primary: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    variant: "primary",
  },
  render: ButtonTemplate,
};

export const PrimaryInverted: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
    backgrounds: { default: "brand" },
  },
  args: {
    titleColor: "white",
    variant: "primary-inverted",
  },
  render: ButtonTemplate,
};

export const Secondary: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    variant: "secondary",
  },
  render: ButtonTemplate,
};

export const SecondaryInverted: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
    backgrounds: { default: "brand" },
  },
  args: {
    titleColor: "white",
    variant: "secondary-inverted",
  },
  render: ButtonTemplate,
};

export const Neutral: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    variant: "neutral",
  },
  render: ButtonTemplate,
};

export const NeutralInverted: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
    backgrounds: { default: "brand" },
  },
  args: {
    titleColor: "white",
    variant: "neutral-inverted",
  },
  render: ButtonTemplate,
};

export const Success: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    variant: "success",
  },
  render: ButtonTemplate,
};

export const Danger: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    variant: "danger",
  },
  render: ButtonTemplate,
};

export const DangerNeutral: StoryObj<TemplateType> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    variant: "danger-neutral",
  },
  render: ButtonTemplate,
};

export const FullWidth: ButtonStory = {
  render: (args) => ({
    props: args,
    template: `<button tedi-button style="width: 100%;">Full Width Button</button>`,
  }),
};

export const LinkAsButton: ButtonStory = {
  render: (props) => ({
    props,
    template: `
        <a tedi-button>Link</a>
      `,
  }),
};
