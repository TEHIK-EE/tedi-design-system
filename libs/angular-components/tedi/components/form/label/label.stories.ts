import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { LabelComponent } from "./label.component";
import { RowComponent } from "../../helpers/grid/row/row.component";
import { ColComponent } from "../../helpers/grid/col/col.component";
import { TooltipComponent } from "../../overlay/tooltip/tooltip.component";
import { TooltipTriggerComponent } from "../../overlay/tooltip/tooltip-trigger.component";
import { TooltipContentComponent } from "../../overlay/tooltip/tooltip-content.component";
import { InfoButtonComponent } from "../../buttons/info-button/info-button.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=2137-19322&m=dev" target="_blank">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/64479c-label" target="_blank">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready/Components/Form/Label",
  component: LabelComponent,
  decorators: [
    moduleMetadata({
      imports: [
        LabelComponent,
        RowComponent,
        ColComponent,
        TooltipComponent,
        TooltipTriggerComponent,
        TooltipContentComponent,
        InfoButtonComponent,
      ],
    }),
  ],
  argTypes: {
    ngContent: {
      name: "ng-content",
      description: "Label text",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: "radio",
      options: ["small", "default"],
      description: "Defines the size of the label.",
      table: {
        category: "inputs",
        defaultValue: { summary: "default" },
        type: { summary: "LabelSize", detail: "default \nsmall" },
      },
    },
    required: {
      control: "boolean",
      description: "Marks the label as required.",
      table: {
        category: "inputs",
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean",
        },
      },
    },
  },
} as Meta<LabelComponent>;

type LabelStory = StoryObj<LabelComponent & { ngContent: string }>;

export const Default: LabelStory = {
  args: {
    ngContent: "Label",
    size: "default",
  },
  render: ({ ngContent, ...args }) => ({
    props: args,
    template: `
      <label tedi-label ${argsToTemplate(args)}>${ngContent}</label>
    `,
  }),
};

export const Size: StoryObj<LabelComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="2" [gapY]="3">
        <b>Default</b>
        <div style="display: flex; gap: 1rem;">
          <label tedi-label>Label</label>
          <label tedi-label>
            <b>Label</b>
          </label>
        </div>
        <b>Small</b>
        <div style="display: flex; gap: 1rem;">
          <label tedi-label size="small">Label</label>
          <label tedi-label size="small">
            <b>Label</b>
          </label>
        </div>
      </tedi-row>
    `,
  }),
};

export const Structure: LabelStory = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="1" [gapY]="3">
        <tedi-col>
          <label tedi-label>Active ingredient</label>
        </tedi-col>
        <tedi-col>
          <label tedi-label [required]="true">Active ingredient</label>
        </tedi-col>
        <tedi-col>
          <div style="display: flex; gap: 2px;">
            <label tedi-label>Active ingredient</label>
            <tedi-tooltip>
              <tedi-tooltip-trigger>
                <button tedi-info-button></button>
              </tedi-tooltip-trigger>
              <tedi-tooltip-content>
                Tooltip content
              </tedi-tooltip-content>
            </tedi-tooltip>
          </div>
        </tedi-col>
        <tedi-col>
          <div style="display: flex; gap: 2px;">
            <label tedi-label [required]="true">Active ingredient</label>
            <tedi-tooltip>
              <tedi-tooltip-trigger>
                <button tedi-info-button></button>
              </tedi-tooltip-trigger>
              <tedi-tooltip-content>
                Tooltip content
              </tedi-tooltip-content>
            </tedi-tooltip>
          </div>
        </tedi-col>
      </tedi-row>
    `,
  }),
};
