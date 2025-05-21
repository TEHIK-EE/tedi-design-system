import { TextGroupValueComponent } from "./text-group-value.component";
import { TextGroupLabelComponent } from "./text-group-label.component";
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from "@storybook/angular";

import { TextGroupComponent } from "./text-group.component";
import {
  IconComponent,
  RowComponent,
  TextComponent,
  VerticalSpacingDirective,
} from "@tehik-ee/tedi-angular/tedi";
import { createBreakpointArgTypes } from "../../../../utils/createBreakpointArgTypes";

export default {
  title: "Community Angular/Content/TextGroup",
  component: TextGroupComponent,
} as Meta<TextGroupComponent>;

type Story = StoryObj<TextGroupComponent>;

export const Default: Story = {
  args: {
    type: "horizontal",
  },
  decorators: [
    moduleMetadata({
      imports: [
        VerticalSpacingDirective,
        TextGroupComponent,
        TextGroupLabelComponent,
        TextGroupValueComponent,
        TextComponent,
        IconComponent,
        RowComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <tedi-text-group ${argsToTemplate(args)} >
        <tedi-text-group-label><p tedi-text>Label</p></tedi-text-group-label>
        <tedi-text-group-value><p tedi-text>Value</p></tedi-text-group-value>
      </tedi-text-group>
    `,
  }),
  argTypes: {
    type: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Type of text group layout",
      defaultValue: "vertical",
    },
    labelWidth: {
      control: "text",
      description: 'Width for the label (e.g., "200px", "30%", etc.)',
      defaultValue: "auto",
    },

    xs: {
      description: "Overrides TextGroupInputs on xs breakpoint (<576px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "TextGroupInputs",
        },
      },
    },
    sm: {
      description: "Overrides TextGroupInputs on sm breakpoint (≥576px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "TextGroupInputs",
        },
      },
    },
    md: {
      description: "Overrides TextGroupInputs on md breakpoint (≥768px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "TextGroupInputs",
        },
      },
    },
    lg: {
      description: "Overrides TextGroupInputs on lg breakpoint (≥992px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "TextGroupInputs",
        },
      },
    },
    xl: {
      description: "Overrides TextGroupInputs on xl breakpoint (≥1200px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "TextGroupInputs",
        },
      },
    },
    xxl: {
      description: "Overrides TextGroupInputs on xxl breakpoint (≥1400px).",
      table: {
        category: "breakpoints",
        type: {
          summary: "TextGroupInputs",
        },
      },
    },
  },
};

export const Type: Story = {
  ...Default,
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div [tediVerticalSpacing]="1.5">
        <tedi-text-group type="vertical">
          <tedi-text-group-label>
            <p tedi-text>Accessibility</p>
          </tedi-text-group-label>
          <tedi-text-group-value>
            <p tedi-text>Visible to doctor and representative</p>
          </tedi-text-group-value>
        </tedi-text-group>
        <tedi-text-group type="vertical">
          <tedi-text-group-label>
            <p tedi-text>Accessibility</p>
          </tedi-text-group-label>
          <tedi-text-group-value>
            <p tedi-text>Visible to doctor and representative</p>
          </tedi-text-group-value>
        </tedi-text-group>
        <tedi-text-group type="vertical">
          <tedi-text-group-label>
            <p tedi-text>Accessibility</p>
          </tedi-text-group-label>
          <tedi-text-group-value>
            <tedi-icon size="24" name="lock" color="tertiary" />
            <p tedi-text modifiers="inline-block">Visible to doctor and representative</p>
          </tedi-text-group-value>
        </tedi-text-group>
        <tedi-text-group type="vertical">
          <tedi-text-group-label>
            <p tedi-text modifiers="bold">Accessibility</p>
          </tedi-text-group-label>
          <tedi-text-group-value>
            <p tedi-text>Visible to doctor and representative</p>
          </tedi-text-group-value>
        </tedi-text-group>
        <tedi-text-group type="vertical">
          <tedi-text-group-label>
            <p tedi-text>Accessibility</p>
          </tedi-text-group-label>
          <tedi-text-group-value>
            <p tedi-text modifiers="bold">Visible to doctor and representative</p>
          </tedi-text-group-value>
        </tedi-text-group>
        <tedi-text-group type="horizontal">
          <tedi-text-group-label>
            <p tedi-text>Patient</p>
          </tedi-text-group-label>
          <tedi-text-group-value>
            <tedi-icon size="24" name="person_filled" color="tertiary" />
            <p tedi-text modifiers="inline-block">Mari Maasikas</p>
          </tedi-text-group-value>
        </tedi-text-group>
      </div>
    `,
  }),
};

export const PositionType: Story = {
  ...Default,
  args: {},
  render: (args) => ({
    props: args,
    template: `
    <div [tediVerticalSpacing]="1">
      <tedi-text-group type="vertical">
        <tedi-text-group-label><p tedi-text>Accessibility</p></tedi-text-group-label>
        <tedi-text-group-value><p tedi-text>Visible to doctor and representative</p></tedi-text-group-value>
      </tedi-text-group>
      <tedi-text-group type="horizontal">
        <tedi-text-group-label><p tedi-text>Accessibility</p></tedi-text-group-label>
        <tedi-text-group-value><p tedi-text>Visible to doctor and representative</p></tedi-text-group-value>
      </tedi-text-group>
    </div>
    `,
  }),
};

export const HorizontalLabelLength: Story = {
  ...Default,
  args: {
    type: "horizontal",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-row cols="1" gap="3">
        <div [tediVerticalSpacing]="0.25">
          <tedi-text-group ${argsToTemplate(args)} labelWidth="132px">
            <tedi-text-group-label>
              <p tedi-text>Patient</p>
            </tedi-text-group-label>
            <tedi-text-group-value>
              <tedi-icon size="24" name="person_filled" color="tertiary" />
              <p tedi-text modifiers="inline-block">Mari Maasikas</p>
            </tedi-text-group-value>
          </tedi-text-group>
          <tedi-text-group ${argsToTemplate(args)} labelWidth="132px">
            <tedi-text-group-label>
              <p tedi-text>Address</p>
            </tedi-text-group-label>
            <tedi-text-group-value>
              <tedi-icon size="24" name="location_on" color="tertiary" />
              <p tedi-text modifiers="inline-block">
                Tulbi tn 4, Tallinn, 23562, Estonia
              </p>
            </tedi-text-group-value>
          </tedi-text-group>
        </div>
        <div [tediVerticalSpacing]="0.25">
          <tedi-text-group ${argsToTemplate(args)} labelWidth="164px">
            <tedi-text-group-label>
              <p tedi-text>Vaccine</p>
            </tedi-text-group-label>
            <tedi-text-group-value>
              <p tedi-text>Mari Maasikas</p>
            </tedi-text-group-value>
          </tedi-text-group>
          <tedi-text-group ${argsToTemplate(args)} labelWidth="164px">
            <tedi-text-group-label>
              <p tedi-text>Next vaccination</p>
            </tedi-text-group-label>
            <tedi-text-group-value>
              <p tedi-text>Immunization finished</p>
            </tedi-text-group-value>
          </tedi-text-group>
        </div>
        <div [tediVerticalSpacing]="0.25">
          <tedi-text-group ${argsToTemplate(args)} labelWidth="196px">
            <tedi-text-group-label>
              <p tedi-text>Healthcare provider</p>
            </tedi-text-group-label>
            <tedi-text-group-value>
              <p tedi-text>SA Põhja-Eesti Regionaalhaigla</p>
            </tedi-text-group-value>
          </tedi-text-group>
          <tedi-text-group ${argsToTemplate(args)} labelWidth="196px">
            <tedi-text-group-label>
              <p tedi-text>Healthcare specialist</p>
            </tedi-text-group-label>
            <tedi-text-group-value>
              <p tedi-text>Mart Mets</p>
            </tedi-text-group-value>
          </tedi-text-group>
          <tedi-text-group ${argsToTemplate(args)} labelWidth="196px">
            <tedi-text-group-label>
              <p tedi-text>Document creation time</p>
            </tedi-text-group-label>
            <tedi-text-group-value>
              <p tedi-text>16.08.2023 14:51:48</p>
            </tedi-text-group-value>
          </tedi-text-group>
        </div>
      </tedi-row>
    `,
  }),
};
