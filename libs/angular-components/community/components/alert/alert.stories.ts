import {
  type Meta,
  type StoryObj,
  moduleMetadata,
  argsToTemplate,
} from "@storybook/angular";

import { AlertComponent } from "./alert.component";
import { TextComponent, LinkComponent } from "@tehik-ee/tedi-angular/tedi";

export default {
  title: "Community Angular/Notifications/Alert",
  component: AlertComponent,
  args: {
    title: "",
    type: "info",
    icon: "",
    showClose: false,
    role: "alert",
    titleElement: "h2",
  },
  argTypes: {
    title: {
      control: "text",
      description:
        "An optional title for the alert, typically used to summarize the message's purpose. Appears in top of the alert.",
    },
    titleElement: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "div", "strong"],
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
  },
  decorators: [
    moduleMetadata({
      imports: [AlertComponent, TextComponent, LinkComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
    <tedi-alert ${argsToTemplate(args)}>
      <p tedi-text>This is an alert message. It provides important information to the user.</p>
    </tedi-alert>`,
  }),
} as Meta<AlertComponent>;

type Story = StoryObj<AlertComponent>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    title: "Alert Title",
  },
  render: (args) => ({
    props: args,
    template: `
    <tedi-alert ${argsToTemplate(args)}>
      <p tedi-text>This is an alert message. It provides important information to the user.</p>
    </tedi-alert>
    `,
  }),
};

export const Global: Story = {
  render: (args) => ({
    props: args,
    template: `
    <tedi-alert title="Global Alert" variant="global">
      <p tedi-text>This is an global alert message. It provides important information to the user. <a style="display: inline;" tedi-link>Click here to read more</a></p>
    </tedi-alert>
    <tedi-alert variant="global">
      <p tedi-text>This is an global alert message. It provides important information to the user. <a style="display: inline;" tedi-link>Click here to read more</a></p>
    </tedi-alert>
    `,
  }),
};

export const noSideBorders: Story = {
  name: "No side borders",
  render: (args) => ({
    props: args,
    template: `
    <tedi-alert variant="noSideBorders" title="Global Alert">
      <p tedi-text>This is an alert message. It provides important information to the user.</p>
    </tedi-alert>
    <tedi-alert variant="noSideBorders">
      <p tedi-text>This is an alert message. It provides important information to the user.</p>
    </tedi-alert>
    `,
  }),
};

export const Colors: Story = {
  name: "Alert colors",
  args: {
    icon: "info",
    type: "info",
    showClose: true,
    role: "alert",
  },
  render: (args) => ({
    props: args,
    template: `
    <tedi-alert ${argsToTemplate(args)} [title]="'Info alert'" [type]="'info'">
      <p tedi-text>This is an alert message. It provides important information to the user.</p>
    </tedi-alert>
    <tedi-alert ${argsToTemplate(args)} [title]="'Successful alert'" [type]="'success'">
      <p tedi-text>This is a success alert message. It indicates a successful action.</p>
    </tedi-alert>
    <tedi-alert ${argsToTemplate(args)} [title]="'Warning alert'" [type]="'warning'">
      <p tedi-text>This is a warning alert message. It indicates a potential issue.</p>
    </tedi-alert>
    <tedi-alert ${argsToTemplate(args)} [title]="'Danger alert'" [type]="'danger'">
      <p tedi-text>This is an danger alert message. It indicates an error or problem.</p>
    </tedi-alert>
    `,
  }),
};
