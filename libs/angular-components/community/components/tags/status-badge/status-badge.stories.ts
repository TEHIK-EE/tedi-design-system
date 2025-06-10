import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";

import {
  StatusBadgeColor,
  StatusBadgeComponent,
  StatusBadgeSize,
  StatusBadgeStatus,
  StatusBadgeVariant,
} from "./status-badge.component";
import { ComponentInputs } from "tedi/types";
import { VerticalSpacingDirective } from "tedi/directives";
import { NgFor } from "@angular/common";
import { ColComponent, RowComponent } from "tedi/components";

/// presets identical to libs/react-components/src/tedi/components/tags/status-badge/status-badge.stories.tsx,
///  redo to use shared constants when possible

const colors: StatusBadgeColor[] = [
  "neutral",
  "brand",
  "accent",
  "success",
  "danger",
  "warning",
];
const variants: StatusBadgeVariant[] = [
  "filled",
  "filled-bordered",
  "bordered",
];
const statuses: StatusBadgeStatus[] = [
  "inactive",
  "success",
  "warning",
  "danger",
];
const colorToIconMap: Record<StatusBadgeColor, string> = {
  neutral: "edit",
  brand: "send",
  accent: "sync",
  success: "check_circle",
  danger: "error",
  warning: "warning",
  transparent: "edit",
};
const statusToIconMap: Record<StatusBadgeStatus, string> = {
  inactive: "edit",
  success: "send",
  warning: "sync",
  danger: "error",
};

/**
 * StatusBadge is a component that displays a badge with a status indicator. <br>
 * It can be used to represent various states such as success, danger, warning, or inactivity. <br>
 * The badge can be styled with different colors and variants, and it can optionally include an icon.
 *
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2385-24154&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/764a67-status-badge" target="_BLANK">ZeroHeight ↗</a>
 */

const meta: Meta<StatusBadgeComponent> = {
  component: StatusBadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StatusBadgeComponent,
        VerticalSpacingDirective,
        NgFor,
        RowComponent,
        ColComponent,
      ],
    }),
  ],

  title: "Community Angular/Tags/StatusBadge",
  args: {
    className: "",
    title: "",
    id: "",
    role: "",
    color: "neutral",
    variant: "filled",
    size: "default",
    status: "inactive",
    icon: "",
  },
  argTypes: {
    className: {
      control: "text",
      description:
        "Additional classes to apply custom styles to the StatusBadge.",
    },
    title: {
      control: "text",
      description:
        "Provides the full text or description when the Badge represents an abbreviation. This is typically shown as a tooltip on hover.",
    },
    id: {
      control: "text",
      description: "ID attribute",
    },
    role: {
      control: "text",
      description: "ARIA role attribute for accessibility.",
    },
    color: {
      control: "radio",
      options: colors,
      description: "Specifies the color scheme of the StatusBadge.",
    },
    variant: {
      control: "radio",
      options: variants,
      description: "Determines the style or visual type of the StatusBadge.",
    },
    size: {
      control: "radio",
      options: ["default", "large"] as StatusBadgeSize[],
      description: "Specifies the size of the StatusBadge.",
    },
    status: {
      control: "radio",
      options: statuses,
      description: "StatusBadge status indicator",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2385-24154&m=dev",
    },
  },
};
export default meta;

type Story = StoryObj<StatusBadgeComponent>;

const defaultTemplate = (args: ComponentInputs<StatusBadgeComponent>) =>
  `<tedi-status-badge ${argsToTemplate(args)}>Text</tedi-status-badge>`;

export const Default: Story = {
  render: (args) => ({ template: defaultTemplate(args), props: args }),
  args: {
    color: "neutral",
    variant: "filled",
  },
};

const TemplateAllCombos = (args: ComponentInputs<StatusBadgeComponent>) => {
  return `
  <div>
    <div [tediVerticalSpacing]="1">
      <div *ngFor="let color of colors" style="display: flex; justify-content: space-between;">
        <div style="width: 3.5rem;">
          <strong>{{color.charAt(0).toUpperCase() + color.slice(1)}}</strong>
        </div>
        <ng-container *ngFor="let variant of variants">
          <div>
            <tedi-status-badge ${argsToTemplate(args)}>
              Text
            </tedi-status-badge>
          </div>
          <div>
            <tedi-status-badge ${argsToTemplate(args)} [color]="color" [variant]="variant" [icon]="colorToIconMap[color]">
              Text
            </tedi-status-badge>
          </div>
          <div>
            <tedi-status-badge ${argsToTemplate(args)} [color]="color" [variant]="variant" [icon]="colorToIconMap[color]" />
          </div>
        </ng-container>
      </div>
    </div>
  </div>
`;
};

export const Colors: Story = {
  render: (args) => {
    const { color: _color, variant: _variant, ...rest } = args;
    return {
      template: TemplateAllCombos(args),
      props: { colors, variants, colorToIconMap, ...rest },
    };
  },
};

const TemplateStatusGrid = (args: ComponentInputs<StatusBadgeComponent>) => {
  return `
  <div>
    <div [tediVerticalSpacing]="1">
      <div *ngFor="let status of statuses" style="display: flex; justify-content: space-between;">
        <div style="width: 3.5rem;">
          <strong>{{status.charAt(0).toUpperCase() + status.slice(1)}}</strong>
        </div>
        <ng-container *ngFor="let variant of variants">
          <div>
            <tedi-status-badge ${argsToTemplate(args)}>
              Text
            </tedi-status-badge>
          </div>
          <div>
            <tedi-status-badge ${argsToTemplate(args)} [variant]="variant" [icon]="statusToIconMap[status]" [status]="status" >
              Text
            </tedi-status-badge>
          </div>
          <div>
            <tedi-status-badge ${argsToTemplate(args)} [variant]="variant" [icon]="statusToIconMap[status]" [status]="status" />
          </div>
        </ng-container>
      </div>
    </div>
  </div>
`;
};

export const StatusIndicator: Story = {
  render: (args) => {
    const { color = "neutral", variant: _variant, ...rest } = args;
    return {
      template: TemplateStatusGrid(args),
      props: { color, statuses, variants, statusToIconMap, ...rest },
    };
  },
};

const TemplateLarge = (args: ComponentInputs<StatusBadgeComponent>) => `
  <div style="display: flex; gap: 1rem;">
    <div>
      <tedi-status-badge ${argsToTemplate(args)}>Draft</tedi-status-badge>
    </div>
    <div>
      <tedi-status-badge ${argsToTemplate(args)} [status]="'success'">Draft</tedi-status-badge>
    </div>
  </div>
`;

export const Large: Story = {
  render: (args) => ({ template: TemplateLarge(args), props: args }),
  args: {
    color: "neutral",
    size: "large",
  },
};
