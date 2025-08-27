import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { SpinnerComponent } from "./spinner.component";

const SIZES = [10, 16, 48];
const COLORS = ["primary", "secondary"];

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2768-42334&mode=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/13d6ac-spinner" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: "TEDI-Ready/Components/Loader/Spinner",
  component: SpinnerComponent,
  argTypes: {
    size: {
      control: "radio",
      options: SIZES,
      description: "Size of the spinner in px.",
      table: {
        category: "inputs",
        defaultValue: {
          summary: "16",
        },
        type: { summary: "SpinnerSize", detail: "10 \n16 \n48" },
      },
    },
    color: {
      control: "radio",
      options: COLORS,
      description:
        "Specifies the color theme of the spinner. The color should meet accessibility standards for color contrast.",
      table: {
        category: "inputs",
        defaultValue: { summary: "primary" },
        type: { summary: "SpinnerColor", detail: "primary \nsecondary" },
      },
    },
    label: {
      control: "text",
      description:
        "Provides a text label for screen readers to announce the spinners purpose or status.",
      table: {
        category: "inputs",
      },
    },
  },
} as Meta<SpinnerComponent>;

export const Default: StoryObj<SpinnerComponent> = {
  args: {
    size: 16,
    color: "primary",
    label: "Loading...",
  },
  render: (args) => ({
    props: args,
    template: `<tedi-spinner ${argsToTemplate(args)} />`,
  }),
};

export const Size: StoryObj<SpinnerComponent> = {
  args: {
    color: "primary",
    label: "Loading...",
  },
  render: (args) => ({
    props: {
      ...args,
      sizes: SIZES,
    },
    template: `
      <div class="example-list">
        <div
          *ngFor="let size of sizes; let last = last"
          class="padding-14-16"
          [ngClass]="{ 'border-bottom': !last }"
          style="display: grid; grid-template-columns: repeat(2, 1fr); align-items: center;"
        >
          <div>{{ size }}</div>
          <tedi-spinner ${argsToTemplate(args)} [size]="size" />
        </div>
      </div>
    `,
  }),
};

export const Color: StoryObj<SpinnerComponent> = {
  args: {
    size: 48,
    label: "Loading...",
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex align-items-center gap-4">
        <tedi-spinner ${argsToTemplate(args)} color="primary" />
        <div
          [ngStyle]="{
            'background': 'var(--general-surface-brand-primary)',
            'borderRadius': '4px',
            'padding': '24px'
          }"
        >
          <tedi-spinner ${argsToTemplate(args)} color="secondary" />
        </div>
        <div
          [ngStyle]="{
            'background': 'var(--general-status-danger-background-secondary)',
            'borderRadius': '4px',
            'padding': '24px'
          }"
        >
          <tedi-spinner ${argsToTemplate(args)} color="secondary" />
        </div>
        <div
          [ngStyle]="{
            'background': 'var(--general-status-success-background-secondary)',
            'borderRadius': '4px',
            'padding': '24px'
          }"
        >
          <tedi-spinner ${argsToTemplate(args)} color="secondary" />
        </div>
      </div>
    `,
  }),
};
