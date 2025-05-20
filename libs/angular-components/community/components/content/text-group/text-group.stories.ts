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
      imports: [VerticalSpacingDirective, TextGroupComponent, TextComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <tedi-text-group ${argsToTemplate(args)} >
        <p tedi-text tedi-text-group-label>Patsient</p>
        <p tedi-text tedi-text-group-value>Mari Maasikas</p>
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

export const Horizontal: Story = {
  ...Default,
  args: {
    type: "horizontal",
    labelWidth: "200px",
  },
  render: (args) => ({
    props: args,
    template: `
      <div [tediVerticalSpacing]="0.5">
        <tedi-text-group
          ${argsToTemplate(args)}
          label="Patsient"
          value="Mari Maasikas"
        />
        <tedi-text-group
          ${argsToTemplate(args)}
          label="Address"
          value="Tulbi tn 4, Tallinn, 23562, Estonia"
        />
        <tedi-text-group
          ${argsToTemplate(args)}
          label="Tervisekassa"
          value="SA Põhja-Eesti Regionaalhaigla"
        />
        <tedi-text-group
          ${argsToTemplate(args)}
          label="Kuupäev"
          value="16.08.2023 14:51:48"
        />
      </div>
    `,
  }),
};

export const Vertical: Story = {
  ...Default,
  args: {
    labelWidth: "150px",
    type: "vertical",
  },
  render: (args) => ({
    props: args,
    template: `
      <div [tediVerticalSpacing]="0.5">
        <tedi-text-group
            ${argsToTemplate(args)}
            label="Patsient"
            value="Mari Maasikas"
        />
        <tedi-text-group
          ${argsToTemplate(args)}
          label="Address"
          value="Tulbi tn 4, Tallinn, 23562, Estonia"
        />
        <tedi-text-group
          ${argsToTemplate(args)}
          label="Tervisekassa"
          value="SA Põhja-Eesti Regionaalhaigla"
        />
        <tedi-text-group
          ${argsToTemplate(args)}
          label="Kuupäev"
          value="16.08.2023 14:51:48"
        />
      </div>
    `,
  }),
};
