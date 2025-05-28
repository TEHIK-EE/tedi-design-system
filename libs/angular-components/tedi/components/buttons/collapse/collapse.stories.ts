import {
  argsToTemplate,
  type Meta,
  type StoryObj,
  moduleMetadata,
} from "@storybook/angular";

import { CollapseComponent } from "./collapse.component";

import {
  TextGroupComponent,
  TextGroupLabelComponent,
  TextGroupValueComponent,
  VerticalSpacingDirective,
} from "@tehik-ee/tedi-angular/tedi";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.0.4-(work-in-progress)?node-id=15433-138256&amp;m=dev" target="_BLANK" class="sbdocs sbdocs-a css-ajfpqr">Figma ↗</a><br>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/546461-floating-button" target="_BLANK" class="sbdocs sbdocs-a css-ajfpqr">Zeroheight ↗</a>
 * <hr>
 * <p>Collapse component is used to hide or show content.</p>
 */

export default {
  title: "TEDI Ready Angular/Buttons/Collapse",
  component: CollapseComponent,
  args: {
    openText: "Näita rohkem infot",
    closeText: "Näita vähem infot",
    defaultOpen: false,
    hideCollapseText: false,
    arrowType: "default",
  },
  argTypes: {
    openText: {
      control: "text",
      description:
        "The title for the collapsible section. Rendered inside the toggle button.",
      table: {
        defaultValue: { summary: "Näita" },
      },
    },
    closeText: {
      control: "text",
      description:
        "Text shown on the toggle button when the content is expanded.",
      table: {
        defaultValue: { summary: "Peida" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Optional prop to set the collapse open by default.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hideCollapseText: {
      control: "boolean",
      description: "To show or hide the openText and closeText",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    arrowType: {
      control: "radio",
      options: ["default", "secondary"],
      description:
        "You are able to toggle different arrow styles. Arrow type 'secondary' will add a circle over the icon.",
      table: {
        defaultValue: { summary: "default" },
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-collapse
        ${argsToTemplate(args)}
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rerum
          perspiciatis consectetur blanditiis maxime, optio minus amet similique!
          Et, saepe placeat. Omnis obcaecati corrupti repellat enim asperiores sunt
          quam laudantium voluptate optio deserunt distinctio harum dolores, iure
          unde nemo reprehenderit!
        </div>
      </tedi-collapse>
    `,
  }),
} as Meta<CollapseComponent>;

type Story = StoryObj<CollapseComponent>;

export const Default: Story = {};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
  },
};

export const HiddenOpenCloseText: Story = {
  args: {
    hideCollapseText: true,
  },
};

export const SecondaryArrowType: Story = {
  args: {
    arrowType: "secondary",
  },
};

export const CustomOpenCloseText: Story = {
  args: {
    openText: "Vajuta siia, et näha rohkem informatsiooni",
    closeText: "Vajuta siia, et peita kogu informatsioon",
  },
};

export const NoContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-collapse
        ${argsToTemplate(args)}
      >
      </tedi-collapse>
    `,
  }),
};

export const LongContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-collapse
        ${argsToTemplate(args)}
      >
        <div>
          ${"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50)}
        </div>
      </tedi-collapse>
    `,
  }),
};

export const ChildComponent: Story = {
  decorators: [
    moduleMetadata({
      imports: [
        VerticalSpacingDirective,
        TextGroupComponent,
        TextGroupLabelComponent,
        TextGroupValueComponent,
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <tedi-collapse ${argsToTemplate(args)}>
        <div [tediVerticalSpacing]="0.5">
          <tedi-text-group labelWidth="150px">
            <tedi-text-group-label>Patsient</tedi-text-group-label>
            <tedi-text-group-value>Mari Maasikas</tedi-text-group-value>
          </tedi-text-group>
          <tedi-text-group labelWidth="150px">
            <tedi-text-group-label>Address</tedi-text-group-label>
            <tedi-text-group-value>Tulbi tn 4, Tallinn, 23562, Estonia</tedi-text-group-value>
          </tedi-text-group>
          <tedi-text-group labelWidth="150px">
            <tedi-text-group-label>Tervisekassa</tedi-text-group-label>
            <tedi-text-group-value>SA Põhja-Eesti Regionaalhaigla</tedi-text-group-value>
          </tedi-text-group>
          <tedi-text-group labelWidth="150px">
            <tedi-text-group-label>Kuupäev</tedi-text-group-label>
            <tedi-text-group-value>16.08.2023 14:51:48</tedi-text-group-value>
          </tedi-text-group>
        </div>
      </tedi-collapse>
    `,
  }),
};
