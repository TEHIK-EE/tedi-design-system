import {
  Meta,
  StoryFn,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from "@storybook/angular";
import { ToggleComponent } from "./toggle.component";
import { ColComponent } from "../../helpers/grid/col/col.component";
import { RowComponent } from "../../helpers/grid/row/row.component";
import { LabelComponent } from "../label/label.component";

const PSEUDO_STATE = ["Default", "Hover", "Active", "Focus"];

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.1.6--work-in-progress-?node-id=7123-152108&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/7083d0-toggle" target="_blank">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready/Components/Form/Toggle",
  component: ToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [ToggleComponent, RowComponent, ColComponent, LabelComponent],
    }),
  ],
  argTypes: {
    id: {
      description:
        "The unique identifier for the input element that is associated with label.",
      control: {
        type: "text",
      },
      table: {
        category: "inputs",
        type: { summary: "string" },
      },
    },
    checked: {
      description:
        "Is toggle checked? Supports two-way binding, use with form controls.",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      description: "Indicates whether the toggle field is required.",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "Is toggle disabled?",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    variant: {
      description: "Color variant of the toggle",
      control: {
        type: "radio",
      },
      options: ["primary", "colored"],
      table: {
        category: "inputs",
        type: { summary: "ToggleVariant", detail: "primary \ncolored" },
        defaultValue: { summary: "primary" },
      },
    },
    type: {
      description: "Type of the toggle",
      control: {
        type: "radio",
      },
      options: ["filled", "outlined"],
      table: {
        category: "inputs",
        type: { summary: "ToggleType", detail: "filled \noutlined" },
        defaultValue: { summary: "filled" },
      },
    },
    size: {
      description: "Size of the toggle",
      control: {
        type: "radio",
      },
      options: ["default", "large"],
      table: {
        category: "inputs",
        type: { summary: "ToggleSize", detail: "default \nlarge" },
        defaultValue: { summary: "default" },
      },
    },
    icon: {
      description:
        "Should the toggle show lock icon. Works only with large toggle.",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
} as Meta<ToggleComponent>;

export const Default: StoryObj<ToggleComponent> = {
  args: {
    id: "example-toggle-1",
    variant: "primary",
    type: "filled",
    size: "default",
  },
  render: (args) => ({
    props: args,
    template: `<tedi-toggle ${argsToTemplate(args)} />`,
  }),
};

export const Size: StoryObj<ToggleComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="2" [gapY]="3">
        <b>Default</b>
        <tedi-toggle id="example-toggle-2.1" />
        <b>Large</b>
        <tedi-toggle id="example-toggle-2.2" size="large" />
      </tedi-row>
    `,
  }),
};

export const LabelPosition: StoryObj<ToggleComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="1" [gapY]="3">
        <div style="display: flex; align-items: center; gap: 8px;">
          <label tedi-label for="example-toggle-3.1">Toggle button</label>
          <tedi-toggle [id]="'example-toggle-3.1'" />
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <tedi-toggle [id]="'example-toggle-3.2'" />
          <label tedi-label for="example-toggle-3.2">Toggle button</label>
        </div>
      </tedi-row>
    `,
  }),
};

const Template: StoryFn<ToggleComponent> = (args) => ({
  props: { ...args, pseudoState: PSEUDO_STATE },
  template: `
    <tedi-row [cols]="1" [gapY]="4">
      <tedi-row *ngFor="let state of pseudoState;" cols="4" alignItems="center">
        <b>{{ state }}</b>
        <tedi-col [width]="3" style="display: flex; flex-wrap: wrap; align-items: center; column-gap: 2rem; row-gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <tedi-toggle ${argsToTemplate(args)} [id]="state" />
            <tedi-toggle ${argsToTemplate(args)} [id]="state" [checked]="true" />
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <tedi-toggle ${argsToTemplate(args)} [id]="state" size="large" />
            <tedi-toggle ${argsToTemplate(args)} [id]="state" size="large" [checked]="true" />
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <tedi-toggle ${argsToTemplate(args)} [id]="state" size="large" [icon]="true" />
            <tedi-toggle ${argsToTemplate(args)} [id]="state" size="large" [icon]="true" [checked]="true" />
          </div>
        </tedi-col>
      </tedi-row>
    </tedi-row>
  `,
});

export const PrimaryFilled: StoryObj<ToggleComponent> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    type: "filled",
    variant: "primary",
  },
  render: Template,
};

export const PrimaryOutlined: StoryObj<ToggleComponent> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    type: "outlined",
    variant: "primary",
  },
  render: Template,
};

export const ColoredFilled: StoryObj<ToggleComponent> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    type: "filled",
    variant: "colored",
  },
  render: Template,
};

export const ColoredOutlined: StoryObj<ToggleComponent> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  args: {
    type: "outlined",
    variant: "colored",
  },
  render: Template,
};
