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
  title: "TEDI-Ready Angular/Content/TextGroup",
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
    ...createBreakpointArgTypes("TextGroup"),
  },
};

export const Type: Story = {
  ...Default,
  args: {
    textGroups: [
      { type: "vertical", label: "Accessibility", value: "Visible to doctor and representative" },
      { type: "vertical", label: "Accessibility", value: "Visible to doctor and representative" },
      { type: "vertical", label: "Accessibility", value: "Visible to doctor and representative", icon: { size: 24, name: "lock", color: "tertiary" }, valueModifiers: "inline-block" },
      { type: "vertical", label: "Accessibility", labelModifiers: "bold", value: "Visible to doctor and representative" },
      { type: "vertical", label: "Accessibility", value: "Visible to doctor and representative", valueModifiers: "bold" },
      { type: "horizontal", label: "Patient", value: "Mari Maasikas", icon: { size: 24, name: "person_filled", color: "tertiary" }, valueModifiers: "inline-block" },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div [tediVerticalSpacing]="1.5">
        <tedi-text-group
          *ngFor="let group of textGroups"
          [type]="group.type"
        >
          <tedi-text-group-label>
            <p tedi-text [attr.modifiers]="group.labelModifiers">{{ group.label }}</p>
          </tedi-text-group-label>
          <tedi-text-group-value>
            <tedi-icon
              *ngIf="group.icon"
              [size]="group.icon.size"
              [name]="group.icon.name"
              [color]="group.icon.color"
            ></tedi-icon>
            <p tedi-text [attr.modifiers]="group.valueModifiers">{{ group.value }}</p>
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
