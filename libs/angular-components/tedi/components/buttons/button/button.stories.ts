import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryFn,
  StoryObj,
} from "@storybook/angular";
import { ButtonComponent } from "./button.component";
import { TextColor, TextComponent } from "../../base/text/text.component";
import { RowComponent } from "../../helpers/grid/row/row.component";
import { ColComponent } from "../../helpers/grid/col/col.component";
import { IconComponent } from "../../base/icon/icon.component";

const PSEUDO_STATE = ["Default", "Hover", "Active", "Focus", "Disabled"];

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=136-29124&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/10984a-button" target="_blank">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready/Components/Buttons/Button",
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ButtonComponent,
        RowComponent,
        ColComponent,
        TextComponent,
        IconComponent,
      ],
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
      description:
        "Specifies the color theme of the button. The color should meet accessibility standards for color contrast.",
      table: {
        category: "inputs",
        defaultValue: { summary: "primary" },
        type: {
          summary: "ButtonVariant",
          detail:
            "primary \nsecondary \nneutral \nsuccess \ndanger \ndanger-neutral \nprimary-inverted \nsecondary-inverted \nneutral-inverted",
        },
      },
    },
    size: {
      control: "radio",
      options: ["default", "small"],
      description: "Defines the size of the button.",
      table: {
        category: "inputs",
        defaultValue: { summary: "default" },
        type: {
          summary: "ButtonSize",
          detail: "default \nsmall",
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
    <tedi-row [cols]="1" [gapY]="5">
      <tedi-col [class]="'tedi-vertical-spacing'" style="--vertical-spacing-internal: 1em; overflow-x: auto;">
        <p tedi-text modifiers="bold" [color]="titleColor">Default</p>
        <tedi-row *ngFor="let state of pseudoState;" [cols]="5" alignItems="center" [gapX]="2">
          <p tedi-text [color]="titleColor">{{ state }}</p>
          <tedi-col [width]="4" style="display: flex; gap: 1rem;">
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'">Create</button>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'">
              Continue
              <tedi-icon name="arrow_right_alt" />
            </button>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'">
              <tedi-icon name="edit" />
              Edit
            </button>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'">
              <tedi-icon name="arrow_forward" />
            </button>
          </tedi-col>
        </tedi-row>
      </tedi-col>
      <tedi-col [class]="'tedi-vertical-spacing'" style="--vertical-spacing-internal: 1.4em; overflow-x: auto;">
        <p tedi-text modifiers="bold" [color]="titleColor">Small</p>
        <tedi-row *ngFor="let state of pseudoState;" [cols]="5" alignItems="center" [gapX]="2">
          <tedi-col>
            <p tedi-text [color]="titleColor">{{ state }}</p>
          </tedi-col>
          <tedi-col [width]="4" style="display: flex; gap: 1rem;">
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'" [size]="'small'">Create</button>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'" [size]="'small'">
              Continue
              <tedi-icon name="arrow_right_alt" />
            </button>
            <button tedi-button ${argsToTemplate(args)} [id]="state" [disabled]="state === 'Disabled'" [size]="'small'">
              <tedi-icon name="edit" />
              Edit
            </button>
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
