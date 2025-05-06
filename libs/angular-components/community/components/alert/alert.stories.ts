import {
  type Meta,
  type StoryObj,
  moduleMetadata,
  argsToTemplate,
} from "@storybook/angular";

import { AlertComponent } from "./alert.component";
import { TextComponent } from "@tehik-ee/tedi-angular/tedi";
import { LinkComponent } from "../navigation/link/link.component";

export default {
  title: "Community Angular/Notifications/Alert",
  component: AlertComponent,
  args: {
    title: "",
    type: "info",
    icon: "",
    showClose: false,
    role: "alert",
    isGlobal: false,
    noSideBorders: false,
  },
  argTypes: {
    title: {
      control: "text",
      description:
        "An optional title for the alert, typically used to summarize the message's purpose. If provided, it appears prominently at the top of the alert.",
    },
    type: {
      control: "select",
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
        "Specifies an optional icon to display in the alert, providing quick visual context. Can be a string (icon name) or an object with additional `IconProps` to further customize the icon.",
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
        "The ARIA role of the alert, informing screen readers about the alert's purpose. Options: - 'alert': For high-priority messages that demand immediate attention. - 'status': For less urgent messages providing feedback or updates. - 'none': Used when no ARIA role is needed.",
      defaultValue: {
        summary: "alert",
      },
    },
    isGlobal: {
      control: "boolean",
      description:
        "Indicates that the alert is intended to span the full width of the page, typically for critical or prominent messages.",
      defaultValue: {
        summary: false,
      },
    },
    noSideBorders: {
      control: "boolean",
      description:
        "Removes the side borders from the alert for a cleaner appearance. This also sets the border radius to 0.",
      defaultValue: {
        summary: false,
      },
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
    <tedi-alert title="Global Alert" isGlobal="true">
      <p tedi-text>This is an global alert message. It provides important information to the user. <a style="display: inline;"tedi-link>Click here to read more</a></p>
    </tedi-alert>
    <tedi-alert isGlobal="true">
      <p tedi-text>This is an global alert message. It provides important information to the user. <a style="display: inline;"tedi-link>Click here to read more</a></p>
    </tedi-alert>
    `,
  }),
};

export const noSideBorders: Story = {
  name: "No side borders",
  render: (args) => ({
    props: args,
    template: `
    <tedi-alert noSideBorders="true" title="Global Alert">
      <p tedi-text>This is an alert message. It provides important information to the user.</p>
    </tedi-alert>
    <tedi-alert noSideBorders="true">
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
    isGlobal: false,
    noSideBorders: false,
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
