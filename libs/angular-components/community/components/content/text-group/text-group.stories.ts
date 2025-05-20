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
  TextComponent,
  VerticalSpacingDirective,
} from "@tehik-ee/tedi-angular/tedi";

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
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <tedi-text-group ${argsToTemplate(args)} >
        <tedi-text-group-label><p tedi-text>Patsient</p></tedi-text-group-label>
        <tedi-text-group-value><p tedi-text>Mari Maasikas</p></tedi-text-group-value>
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
  },
};

export const Vertical: Story = {
  ...Default,
  args: {
    type: "vertical",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-text-group ${argsToTemplate(args)} >
        <tedi-text-group-label><p tedi-text>Patsient</p></tedi-text-group-label>
        <tedi-text-group-value><p tedi-text>Mari Maasikas</p></tedi-text-group-value>
      </tedi-text-group>
    `,
  }),
};

export const Vertical2: Story = {
  ...Default,
  args: {
    labelWidth: "150px",
    type: "vertical",
  },
  render: (args) => ({
    props: args,
    template: `
      <div [tediVerticalSpacing]="0.5">
        <tedi-text-group ${argsToTemplate(args)} >
          <tedi-text-group-label><p tedi-text>Patsient</p></tedi-text-group-label>
          <tedi-text-group-value><p tedi-text>Mari Maasikas</p></tedi-text-group-value>
        </tedi-text-group>
        <tedi-text-group ${argsToTemplate(args)} >
          <tedi-text-group-label><p tedi-text>Address</p></tedi-text-group-label>
          <tedi-text-group-value><p tedi-text>Tulbi tn 4, Tallinn, 23562, Estonia</p></tedi-text-group-value>
        </tedi-text-group>
        <tedi-text-group ${argsToTemplate(args)} >
          <tedi-text-group-label><p tedi-text>Tervisekassa</p></tedi-text-group-label>
          <tedi-text-group-value><p tedi-text>SA Põhja-Eesti Regionaalhaigla</p></tedi-text-group-value>
        </tedi-text-group>
        <tedi-text-group ${argsToTemplate(args)} >
          <tedi-text-group-label><p tedi-text>Kuupäev</p></tedi-text-group-label>
          <tedi-text-group-value><p tedi-text>16.08.2023 14:51:48</p></tedi-text-group-value>
        </tedi-text-group>
      </div>
    `,
  }),
};
