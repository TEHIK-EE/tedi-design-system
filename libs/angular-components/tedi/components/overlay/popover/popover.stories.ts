import { type Meta, type StoryObj, moduleMetadata } from "@storybook/angular";
import { PopoverComponent, PopoverPosition } from "./popover.component";
import { PopoverTriggerComponent } from "./popover-trigger/popover-trigger.component";
import {
  PopoverContentComponent,
  PopoverWidth,
} from "./popover-content/popover-content.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { RowComponent } from "../../helpers/grid/row/row.component";
import { ColComponent } from "../../helpers/grid/col/col.component";
import { LinkComponent } from "../../navigation/link/link.component";
import { IconComponent } from "../../base/icon/icon.component";
import { InfoButtonComponent } from "../../buttons/info-button/info-button.component";

const MAXWIDTH = ["none", "small", "medium", "large"];
const OPENWITH = ["click", "hover", "mousedown", "none"];
const POSITIONS: PopoverPosition[] = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "right",
  "right-start",
  "right-end",
  "left",
  "left-start",
  "left-end",
];

export default {
  title: "TEDI-Ready/Components/Overlay/Popover",
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
        InfoButtonComponent,
      ],
    }),
  ],
  argTypes: {
    openWith: {
      control: "radio",
      options: OPENWITH,
      description: "The trigger event that opens the popover.",
      table: {
        category: "popover inputs",
        type: {
          summary: "PopoverOpenWith",
          detail: OPENWITH.join("\n"),
        },
        defaultValue: {
          summary: "click",
        },
      },
    },
    position: {
      control: "select",
      description:
        "The position of the popover relative to the trigger element.",
      options: POSITIONS,
      table: {
        category: "popover inputs",
        type: {
          summary: "PopoverPosition",
          detail: POSITIONS.join("\n"),
        },
        defaultValue: {
          summary: "top",
        },
      },
    },
    dismissible: {
      control: "boolean",
      description: "Is dismissible by clicking outside of content?",
      defaultValue: {
        summary: "true",
      },
      table: {
        category: "popover inputs",
        type: {
          summary: "boolean",
        },
      },
    },
    hideOnScroll: {
      control: "boolean",
      description: "Does popover content hide on scroll?",
      defaultValue: {
        summary: "false",
      },
      table: {
        category: "popover inputs",
        type: {
          summary: "boolean",
        },
      },
    },
    withBorder: {
      control: "boolean",
      description: "Does popover have illustrative border on the arrow side?",
      defaultValue: {
        summary: "false",
      },
      table: {
        category: "popover inputs",
        type: {
          summary: "boolean",
        },
      },
    },
    lockScroll: {
      control: "boolean",
      description: "Lock scrolling on rest of the page?",
      defaultValue: {
        summary: "false",
      },
      table: {
        category: "popover inputs",
        type: {
          summary: "boolean",
        },
      },
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
        type: {
          summary: "string",
        },
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
        },
      },
    },
  },
} as Meta<PopoverComponent>;

type Story = StoryObj<
  PopoverComponent & {
    maxWidth: PopoverWidth;
    title: string;
    showClose: boolean;
  }
>;

export const Default: Story = {
  args: {
    openWith: "click",
    position: "top",
    dismissible: true,
    hideOnScroll: false,
    withBorder: false,
    lockScroll: false,
    maxWidth: "small",
    title: "Heading",
    showClose: true,
  },
  render: (args) => ({
    props: args,
    template: `
        <tedi-popover [openWith]="openWith" [position]="position" [dismissible]="dismissible" [hideOnScroll]="hideOnScroll" [withBorder]="withBorder" [lockScroll]="lockScroll">
            <tedi-popover-trigger>
                <button tedi-button>
                    Popover Trigger
                </button>
            </tedi-popover-trigger>
            <tedi-popover-content [maxWidth]="maxWidth" [title]="title" [showClose]="showClose">
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
      <tedi-row [gap]="3">
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button>
                Buttons & heading
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content title="Heading" [showClose]="true">
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
            <tedi-popover-content [showClose]="true">
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
            <tedi-popover-content>
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
            <tedi-popover-content>
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
      <tedi-row [gap]="3">
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

export const Trigger: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [gap]="3">
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-button variant="secondary">
                Button Trigger
              </button>
            </tedi-popover-trigger>
            <tedi-popover-content>
              This popover is triggered by button.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              <button tedi-info-button></button>
            </tedi-popover-trigger>
            <tedi-popover-content>
              This popover is triggered by info button.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
        <tedi-col>
          <tedi-popover>
            <tedi-popover-trigger>
              Text Trigger
            </tedi-popover-trigger>
            <tedi-popover-content>
              This popover is triggered by text. By default text has dashed underline.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
      </tedi-row>
    `,
  }),
};

export const ArrowPosition: Story = {
  render: (args) => ({
    props: {
      ...args,
      positions: POSITIONS,
    },
    template: `
      <tedi-row [cols]="3" [gap]="3">
        <tedi-col *ngFor="let pos of positions;" style="display: flex; justify-content: center;">
          <tedi-popover [position]="pos">
            <tedi-popover-trigger>
              {{ pos.charAt(0).toUpperCase() + pos.slice(1) }}
            </tedi-popover-trigger>
            <tedi-popover-content>
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
    props: {
      ...args,
      widths: MAXWIDTH,
    },
    template: `
      <tedi-row [gap]="3">
        <tedi-col *ngFor="let width of widths;" style="display: flex; justify-content: center;">
          <tedi-popover>
            <tedi-popover-trigger>
              {{ width.charAt(0).toUpperCase() + width.slice(1) }}
            </tedi-popover-trigger>
            <tedi-popover-content [maxWidth]="width">
              The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas.
            </tedi-popover-content>
          </tedi-popover>
        </tedi-col>
      </tedi-row>
    `,
  }),
};
