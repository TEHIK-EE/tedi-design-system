import {
  type Meta,
  type StoryObj,
  moduleMetadata,
  argsToTemplate,
} from "@storybook/angular";

import { AlertComponent } from "./alert.component";
import { RowComponent } from "../../helpers/grid/row/row.component";

export default {
  title: "TEDI-Ready/Components/Notifications/Alert",
  component: AlertComponent,
  decorators: [
    moduleMetadata({
      imports: [AlertComponent, RowComponent],
    }),
  ],
  argTypes: {
    title: {
      control: "text",
      description:
        "An optional title for the alert, typically used to summarize the message's purpose. Appears in top of the alert.",
    },
    titleElement: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "div"],
      description:
        "The HTML tag to be used for the alert title. Useful for WCAG compliance.",
      defaultValue: {
        summary: "h2",
      },
    },
    type: {
      control: "radio",
      options: ["info", "success", "warning", "error"],
      description:
        "Defines the visual and contextual type of the alert. This determines the icon, color, and overall style, making it clear whether the alert is informational, a success message, a warning, or an error.",
      defaultValue: {
        summary: "info",
      },
    },
    icon: {
      control: "text",
      description:
        "Specifies an optional icon to display in the alert. See the icon component for more details.",
    },
    showClose: {
      control: "boolean",
      description: "If true, a close button will be displayed.",
      defaultValue: {
        summary: false,
      },
    },
    role: {
      control: "select",
      options: ["alert", "status", "none"],
      description:
        "The ARIA role of the alert, informing screen readers about the alert's purpose. Options: \n - <b>alert</b> for high-priority messages that demand immediate attention. \n - <b>status</b> for less urgent messages providing feedback or updates.\n - <b>none</b> used when no ARIA role is needed.",
      defaultValue: {
        summary: "alert",
      },
    },
    variant: {
      control: "select",
      options: ["default", "global", "noSideBorders"],
      description:
        "Defines the visual and contextual type of the alert. \n - <b>global</b> indicates that the alert is intended to span the full width of the page, typically for critical or prominent messages. \n - <b>noSideBorders</b> removes the side borders from the alert for a cleaner appearance. This also sets the border radius to 0.",
    },
    open: {
      control: "boolean",
      description: "Is alert open?",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
} as Meta<AlertComponent>;

type Story = StoryObj<AlertComponent>;

export const Default: Story = {
  args: {
    title: "Title",
    type: "info",
    icon: "",
    showClose: false,
    role: "alert",
    titleElement: "h2",
    open: true,
  },
  render: (args) => ({
    props: args,
    template: `
    <tedi-alert ${argsToTemplate(args)}>
      Content description. <a href="#">Inline link example</a>
    </tedi-alert>`,
  }),
};

export const Headless: Story = {
  render: (args) => ({
    props: args,
    template: `
    <tedi-alert>
      Content description
    </tedi-alert>
    `,
  }),
};

export const Global: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="1" [gap]="3">
        <tedi-alert title="Title" variant="global">
          Content description
        </tedi-alert>
        <tedi-alert variant="global">
          Content description
        </tedi-alert>
      </tedi-row>
    `,
  }),
};

export const WithoutSideBorders: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="1" [gap]="3">
        <tedi-alert variant="noSideBorders" title="Title">
          Content description
        </tedi-alert>
        <tedi-alert variant="noSideBorders">
          Content description
        </tedi-alert>
      </tedi-row>
    `,
  }),
};

export const WithIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="1" [gap]="3">
        <tedi-alert title="Title" icon="check_circle">
          Content description
        </tedi-alert>
        <tedi-alert icon="check_circle">
          Content description
        </tedi-alert>
      </tedi-row>
    `,
  }),
};

export const WithCloseButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="1" [gap]="3">
        <tedi-alert title="Title" [showClose]="true">
          Content description
        </tedi-alert>
        <tedi-alert [showClose]="true">
          Content description
        </tedi-alert>
      </tedi-row>
    `,
  }),
};

export const AlertTypes: Story = {
  render: (args) => ({
    props: args,
    template: `
    <tedi-row [cols]="1" [gap]="3">
      <tedi-alert type="info" icon="info">
        This is a info alert.
      </tedi-alert>
      <tedi-alert type="success" icon="check_circle">
        This is a success alert.
      </tedi-alert>
      <tedi-alert type="warning" icon="warning">
        This is a warning alert.
      </tedi-alert>
      <tedi-alert type="danger" icon="error">
        This is a danger alert.
      </tedi-alert>
    </tedi-row>
    `,
  }),
};

export const WithoutTitleLongText: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-alert type="warning" icon="warning">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis nisi purus, quis bibendum lectus finibus in.
        Sed sed tellus eu augue finibus efficitur sit amet a velit. Donec vitae ex et ligula commodo luctus.
        Phasellus accumsan ligula quis nibh hendrerit, ac rutrum velit dictum. Curabitur ut vulputate justo.
        Proin eu sapien tellus. Morbi quis dapibus felis. Quisque commodo tempus vulputate.
      </tedi-alert>
    `,
  }),
};

export const WithoutTitleLongTextAndClosingButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-alert type="info" icon="info" [showClose]="true">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis nisi purus, quis bibendum lectus finibus in.
        Sed sed tellus eu augue finibus efficitur sit amet a velit. Donec vitae ex et ligula commodo luctus.
        Phasellus accumsan ligula quis nibh hendrerit, ac rutrum velit dictum. Curabitur ut vulputate justo.
        Proin eu sapien tellus. Morbi quis dapibus felis. Quisque commodo tempus vulputate.
      </tedi-alert>
    `,
  }),
};

export const WithTitleLongTextAndClosingButton: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-alert type="danger" icon="error" [showClose]="true" title="Title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis nisi purus, quis bibendum lectus finibus in.
        Sed sed tellus eu augue finibus efficitur sit amet a velit. Donec vitae ex et ligula commodo luctus.
        Phasellus accumsan ligula quis nibh hendrerit, ac rutrum velit dictum. Curabitur ut vulputate justo.
        Proin eu sapien tellus. Morbi quis dapibus felis. Quisque commodo tempus vulputate.
      </tedi-alert>
    `,
  }),
};
