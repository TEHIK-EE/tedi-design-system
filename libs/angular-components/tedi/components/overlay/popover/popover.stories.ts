import {
  type Meta,
  type StoryObj,
  moduleMetadata,
} from "@storybook/angular";
import { PopoverComponent } from "./popover.component";
import { PopoverTriggerComponent } from "./popover-trigger/popover-trigger.component";
import { PopoverContentComponent, PopoverPosition, PopoverWidth } from "./popover-content/popover-content.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { RowComponent } from "../../layout/grid/row/row.component";
import { ColComponent } from "../../layout/grid/col/col.component";
import { VerticalSpacingItemDirective } from "../../../directives/vertical-spacing/vertical-spacing-item.directive";
import { TextComponent } from "../../base/text/text.component";
import { LinkComponent } from "../../navigation/link/link.component";
import { IconComponent } from "../../base/icon/icon.component";

const MAXWIDTH = ["none", "small", "medium", "large"];

export default {
  title: "TEDI-Ready Angular/Overlay/Popover",
  component: PopoverComponent,
  decorators: [
    moduleMetadata({
      imports: [
        PopoverComponent,
        PopoverTriggerComponent,
        PopoverContentComponent,
        ButtonComponent,
        LinkComponent,
        IconComponent,
        RowComponent,
        ColComponent,
        VerticalSpacingItemDirective,
        TextComponent,
      ],
    }),
  ],
  argTypes: {
    openWith: {
      control: "select",
      options: ["click", "hover"],
      description: "The trigger event that opens the popover. Can be 'click' or 'hover'.",
      table: {
        category: "popover inputs",
        type: {
          summary: "PopoverOpenWith",
          detail: "click \nhover",
        },
        defaultValue: {
          summary: "click"
        }
      },
    },
    position: {
      control: "select",
      description: "The position of the popover relative to the trigger element. If popover can't be positioned in the specified direction, the CDK will try to position the popover in the next direction in positions list.",
      options: ["top", "bottom", "left", "right"],
      table: {
        category: "popover-content inputs",
        type: {
          summary: "PopoverPosition", detail: "top \nbottom \nleft \nright"
        },
        defaultValue: {
          summary: "top",
        },
      }
    },
    maxWidth: {
      control: "select",
      options: MAXWIDTH,
      description: "The width of the popover.",
      defaultValue: {
        summary: "small",
      },
      table: {
        category: "popover-content inputs",
        type: {
          summary: "PopoverWidth",
          detail: "none \nsmall \nmedium \nlarge",
        },
      },
    },
    title: {
      control: "text",
      description: "Heading title of the content",
      table: {
        category: "popover-content inputs",
      },
    },
    withBorder: {
      control: "boolean",
      description: "Does popover have illustrative border on the arrow side?",
      defaultValue: {
        summary: "false",
      },
      table: {
        category: "popover-content inputs",
        type: {
          summary: "boolean",
        }
      },
    },
    showClose: {
      control: "boolean",
      description: "Should content show close button?",
      defaultValue: {
        summary: "false",
      },
      table: {
        category: "popover-content inputs",
        type: {
          summary: "boolean",
        }
      },
    },
  },
} as Meta<PopoverComponent>;

type Story = StoryObj<PopoverComponent & { 
  position: PopoverPosition;
  maxWidth: PopoverWidth;
  title: string;
  withBorder: boolean;
  showClose: boolean;
}>;

export const Default: Story = {
  args: {
    openWith: "click",
    position: "top",
    maxWidth: "small",
    title: "",
    withBorder: false,
    showClose: false,
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-popover [openWith]="openWith">
        <tedi-popover-trigger>
          <button tedi-button>
            Popover Trigger
          </button>
        </tedi-popover-trigger>
        <tedi-popover-content [position]="position" [maxWidth]="maxWidth" [title]="title" [withBorder]="withBorder" [showClose]="showClose">
          The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
        </tedi-popover-content>
      </tedi-popover>
    `,
  }),
};

export const ContentExamples: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button>
                Buttons & heading
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content position="top" title="Heading" [showClose]="true">
              <p>The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.</p>
              <div style="display: flex; gap: 0.5rem;">
                <button tedi-button variant="secondary">Cancel</button>
                <button tedi-button>Submit</button>
              </div>
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button>
                Buttons
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content position="top" [showClose]="true">
              <p>The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.</p>
              <div style="display: flex; gap: 0.5rem;">
                <button tedi-button variant="secondary">Cancel</button>
                <button tedi-button>Submit</button>
              </div>
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button>
                Link
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content position="top">
              <p>The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.</p>
              <a tedi-link style="margin-left: auto;">
                Read more
                <tedi-icon name="north_east" />
              </a>
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button>
                Text
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content position="top">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
      </tedi-row>
    `,
  }),
};

export const Heading: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button variant="secondary">
                Heading & close
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content position="top" maxWidth="medium" title="Heading" [showClose]="true">
              <p>This popover is with title and close button.</p>
              <div style="margin-left: auto; display: flex; gap: 0.5rem;">
                <button tedi-button variant="secondary">Cancel</button>
                <button tedi-button>Submit</button>
              </div>
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button variant="secondary">
                Heading
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content position="top" maxWidth="medium" title="Heading">
              <p>This popover is with title.</p>
              <div style="margin-left: auto; display: flex; gap: 0.5rem;">
                <button tedi-button variant="secondary">Cancel</button>
                <button tedi-button>Submit</button>
              </div>
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button variant="secondary">
                Content & close
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content position="top" maxWidth="medium" [showClose]="true">
              <p>This popover is with content and close button.</p>
              <div style="margin-left: auto; display: flex; gap: 0.5rem;">
                <button tedi-button variant="secondary">Cancel</button>
                <button tedi-button>Submit</button>
              </div>
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button variant="secondary">
                Only ontent
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content position="top" maxWidth="medium">
              <p>This popover is with content only.</p>
              <div style="margin-left: auto; display: flex; gap: 0.5rem;">
                <button tedi-button variant="secondary">Cancel</button>
                <button tedi-button>Submit</button>
              </div>
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
      </tedi-row>
    `,
  }),
};

export const Position: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="2">
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Top
            </tedi-popover-trigger>
            <tedi-popover-content position="top">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Bottom
            </tedi-popover-trigger>
            <tedi-popover-content position="bottom">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Left
            </tedi-popover-trigger>
            <tedi-popover-content position="left">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Right
            </tedi-popover-trigger>
            <tedi-popover-content position="right">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
      </tedi-row>
    `,
  }),
};

export const Size: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Small
            </tedi-popover-trigger>
            <tedi-popover-content maxWidth="small">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Medium
            </tedi-popover-trigger>
            <tedi-popover-content maxWidth="medium">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Large
            </tedi-popover-trigger>
            <tedi-popover-content maxWidth="large">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              No max width
            </tedi-popover-trigger>
            <tedi-popover-content maxWidth="none">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
      </tedi-row>
    `,
  }),
};