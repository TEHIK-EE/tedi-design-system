import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { TagComponent } from "./tag.component";

/**
 * The Tag component is used to label, categorize, or organize items using keywords.
 */
export default {
  title: "Community/Tags/Tag",
  component: TagComponent,
  decorators: [
    moduleMetadata({
      imports: [TagComponent],
    }),
  ],
  render: (props) => ({
    props,
    template: `
      <tedi-tag [type]="type" [loading]="loading" [closable]="closable">
        {{content}}
      </tedi-tag>
    `,
  }),
  args: {
    type: "primary",
    loading: false,
    closable: false,
    content: "Tag Content",
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Whether the tag is in loading state.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
        category: "inputs",
      },
    },
    closable: {
      control: "boolean",
      description: "Whether the tag can be closed.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
        category: "inputs",
      },
    },
    content: {
      control: "text",
      description: "The content of the tag.",
      table: {
        category: "story-only",
      },
    },
    type: {
      control: "select",
      options: ["primary", "secondary", "danger"],
      description: "The type of the tag.",
      table: {
        defaultValue: { summary: "primary" },
        type: { summary: "string" },
        category: "inputs",
      },
    },
  },
} as Meta<TagComponent>;

type Story = StoryObj<TagComponent>;

export const Default: Story = {};

// Primary Tag Story
export const Primary: Story = {
  render: (props) => ({
    props,
    template: `
    <div style="display: flex; align-items: flex-start; gap: 2em;">
      <tedi-tag [type]="type">
        Tag
      </tedi-tag>

      <tedi-tag [type]="type" [closable]="true">
        Tag
      </tedi-tag>

      <tedi-tag [type]="type" [loading]="true">
        taotlus_scan_lk_1.pdf
      </tedi-tag>

      <tedi-tag [type]="type" [closable]="true" style="max-width: 150px;">
        Tag with a very long text but little room
      </tedi-tag>

      <tedi-tag [type]="type" [loading]="true" style="max-width: 150px;">
        Tag with a very long text but little room
      </tedi-tag>
    </div>
    `,
  }),
  args: {
    type: "primary",
  },
};

// Secondary Tag Story
export const Secondary: Story = {
  render: (props) => ({
    props,
    template: `
    <div style="display: flex; align-items: flex-start; gap: 2em;">
      <tedi-tag [type]="type">
        Tag
      </tedi-tag>

      <tedi-tag [type]="type" [closable]="true">
        Tag
      </tedi-tag>

      <tedi-tag [type]="type" [loading]="true">
        taotlus_scan_lk_1.pdf
      </tedi-tag>

      <tedi-tag [type]="type" [closable]="true" style="max-width: 150px;">
        Tag with a very long text but little room
      </tedi-tag>

      <tedi-tag [type]="type" [loading]="true" style="max-width: 150px;">
        Tag with a very long text but little room
      </tedi-tag>
    </div>
    `,
  }),
  args: {
    type: "secondary",
  },
};

// Danger Tag Story
export const Danger: Story = {
  render: (props) => ({
    props,
    template: `
    <div style="display: flex; align-items: flex-start; gap: 2em;">
      <tedi-tag [type]="type">
        Tag
      </tedi-tag>

      <tedi-tag [type]="type" [closable]="true">
        Tag
      </tedi-tag>

      <tedi-tag [type]="type" [loading]="true">
        taotlus_scan_lk_1.pdf
      </tedi-tag>

      <tedi-tag [type]="type" [closable]="true" style="max-width: 150px;">
        Tag with a very long text but little room
      </tedi-tag>

      <tedi-tag [type]="type" [loading]="true" style="max-width: 150px;">
        Tag with a very long text but little room
      </tedi-tag>
    </div>
    `,
  }),
  args: {
    type: "danger",
  },
};
