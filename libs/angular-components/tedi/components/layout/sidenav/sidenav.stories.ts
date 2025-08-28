import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { SideNavComponent } from "./sidenav.component";
import { SideNavItemComponent } from "./sidenav-item/sidenav-item.component";
import { SideNavDropdownComponent } from "./sidenav-dropdown/sidenav-dropdown.component";
import { SideNavDropdownItemComponent } from "./sidenav-dropdown-item/sidenav-dropdown-item.component";
import { SideNavDropdownGroupComponent } from "./sidenav-dropdown-group/sidenav-dropdown-group.component";
import { SideNavGroupTitleComponent } from "./sidenav-group-title/sidenav-group-title.component";
import { SideNavToggleComponent } from "./sidenav-toggle/sidenav-toggle.component";
import { SideNavOverlayComponent } from "./sidenav-overlay/sidenav-overlay.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.8.9--work-in-progress-?node-id=6367-171750&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="#" target="_BLANK">Zeroheight ↗</a>
 *
 * To test the mobile layout, either resize your browser window or use Storybook's built-in viewport tools.
 * The sidenav component is used to display the side navigation at the left side of the page. It can contain external links, router links, dropdowns, and more.
 * This component is responsive and adapts to mobile layout when at certain screen size. To toggle side navigation in mobile user needs to click sidenav-toggle button.
 * It consists of several sub-components:
 * - `SideNavItemComponent`: Used for showing item which can be text, external link or router link. And can contain a dropdown.
 * - `SideNavDropdownComponent`: Used for showing subitems in a dropdown.
 * - `SideNavDropdownItemComponent`: Dropdown item component. Subitems can be text, external link or router link.
 * - `SideNavDropdownGroup`: Used for grouping items in a dropdown. Grouping changes first item style, suggesting it is parent link.
 * - `SideNavGroupTitleComponent`: Used for showing title in menu and grouping similar items.
 * - `SideNavToggleComponent`: Used for toggling side navigation in mobile layout.
 * - `SideNavOverlayComponent`: Used for showing dark overlay when side navigation is open in mobile layout.
 */

export default {
  title: "TEDI-Ready/Layout/SideNav",
  component: SideNavComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SideNavComponent,
        SideNavItemComponent,
        SideNavDropdownComponent,
        SideNavDropdownItemComponent,
        SideNavDropdownGroupComponent,
        SideNavGroupTitleComponent,
        SideNavToggleComponent,
        SideNavOverlayComponent,
      ],
    }),
  ],
  argTypes: {
    dividers: {
      description: "Show dividers between items",
      control: "boolean",
      table: {
        category: "sidenav",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    size: {
      description: "Size of navigation item",
      control: "radio",
      options: ["small", "medium", "large"],
      table: {
        category: "sidenav",
        type: { summary: "SideNavItemSize", detail: "small \nmedium \nlarge" },
        defaultValue: { summary: "large" },
      },
    },
    collapsible: {
      description: "Is navigation collapsible in desktop?",
      control: "boolean",
      table: {
        category: "sidenav",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    desktopBreakpoint: {
      description: "Breakpoint when to show desktop navigation",
      control: "radio",
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      table: {
        category: "sidenav",
        type: { summary: "Breakpoint", detail: "xs \nsm \nmd \nlg \nxl \nxxl" },
        defaultValue: { summary: "lg" },
      },
    },
    itemSelected: {
      name: "selected",
      description: "Is navigation item selected",
      control: "boolean",
      table: {
        category: "sidenav-item",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    itemIcon: {
      name: "icon",
      description: "Name of the item icon",
      control: "text",
      table: {
        category: "sidenav-item",
        type: { summary: "string" },
      },
    },
    itemHref: {
      name: "href",
      description: "External link",
      control: "text",
      table: {
        category: "sidenav-item",
        type: { summary: "string" },
      },
    },
    itemRouterLink: {
      name: "routerLink",
      description: "Router link",
      control: "text",
      table: {
        category: "sidenav-item",
        type: { summary: "string" },
      },
    },
    dropdownItemSelected: {
      name: "selected",
      description: "Is dropdown item selected",
      control: "boolean",
      table: {
        category: "sidenav-dropdown-item",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    dropdownItemHref: {
      name: "href",
      description: "External link",
      control: "text",
      table: {
        category: "sidenav-dropdown-item",
        type: { summary: "string" },
      },
    },
    dropdownItemRouterLink: {
      name: "routerLink",
      description: "Router link",
      control: "text",
      table: {
        category: "sidenav-dropdown-item",
        type: { summary: "string" },
      },
    },
  },
} as Meta<SideNavComponent>;

export const Default: StoryObj<SideNavComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    dividers: true,
    size: "large",
    collapsible: false,
    desktopBreakpoint: "lg",
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-sidenav-toggle></button>
      <tedi-sidenav-overlay></tedi-sidenav-overlay>
      <div style="height: 1024px;">
        <nav tedi-sidenav ${argsToTemplate(args)}>
          <tedi-sidenav-item icon="home" href="#">
            Home
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="account_box" href="#">
            Clients
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="child_care" href="#" [selected]="true">
            Children
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="edit" routerLink="#">
            Some very long text that wraps to new line
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="assignment" href="#">
            Assignments
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="payments" routerLink="#">
            Payments
          </tedi-sidenav-item>
        </nav>
      </div>
    `,
  }),
};

export const SecondLevelMenuItems: StoryObj<SideNavComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    dividers: true,
    size: "large",
    collapsible: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-sidenav-toggle></button>
      <tedi-sidenav-overlay></tedi-sidenav-overlay>
      <div style="height: 1024px;">
        <nav tedi-sidenav ${argsToTemplate(args)}>
          <tedi-sidenav-item icon="dashboard" href="#">
            Dashboard
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="people" routerLink="#">
            Patient Records
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="medical_services">
            Clinical Management
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-item href="#">
                Vital Signs
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Assessments
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Treatments
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Documentation
              </tedi-sidenav-dropdown-item>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="admin_panel_settings">
            Administration
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-item routerLink="#">
                Staff Management
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                Scheduling
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                System Settings
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                Reports & Analytics
              </tedi-sidenav-dropdown-item>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="inventory" href="#">
            Inventory Management
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="payments" routerLink="#">
            Billing & Finance
          </tedi-sidenav-item>
        </nav>
      </div>
    `,
  }),
};

export const SecondLevelMenuItemsParentsAreLinks: StoryObj<SideNavComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    dividers: true,
    size: "large",
    collapsible: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-sidenav-toggle></button>
      <tedi-sidenav-overlay></tedi-sidenav-overlay>
      <div style="height: 1024px;">
        <nav tedi-sidenav ${argsToTemplate(args)}>
          <tedi-sidenav-item icon="dashboard" href="#">
            Dashboard
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="people" routerLink="#">
            Patient Records
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="medical_services" href="#">
            Clinical Management
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-item href="#">
                Vital Signs
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Assessments
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Treatments
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Documentation
              </tedi-sidenav-dropdown-item>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="admin_panel_settings" routerLink="#">
            Administration
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-item routerLink="#">
                Staff Management
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                Scheduling
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                System Settings
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                Reports & Analytics
              </tedi-sidenav-dropdown-item>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="inventory" href="#">
            Inventory Management
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="payments" routerLink="#">
            Billing & Finance
          </tedi-sidenav-item>
        </nav>
      </div>
    `,
  }),
};

export const ThirdLevelMenuItems: StoryObj<SideNavComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    dividers: true,
    size: "large",
    collapsible: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-sidenav-toggle></button>
      <tedi-sidenav-overlay></tedi-sidenav-overlay>
      <div style="height: 1024px;">
        <nav tedi-sidenav ${argsToTemplate(args)}>
          <tedi-sidenav-item icon="dashboard" href="#">
            Dashboard
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="people" routerLink="#">
            Patient Records
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="medical_services">
            Clinical Management
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-item href="#">
                Vital Signs
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Assessments
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Active Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment History
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment Plans
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Protocols
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Documentation
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Notes
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Medical Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Consent Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Reports
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="admin_panel_settings">
            Administration
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Staff Management
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Scheduling
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  System Settings
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-item routerLink="#">
                Reports & Analytics
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                Statistics
              </tedi-sidenav-dropdown-item>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="inventory" href="#">
            Inventory Management
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="payments" routerLink="#">
            Billing & Finance
          </tedi-sidenav-item>
        </nav>
      </div>
    `,
  }),
};

export const ThirdLevelMenuItemsParentsAreLinks: StoryObj<SideNavComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    dividers: true,
    size: "large",
    collapsible: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-sidenav-toggle></button>
      <tedi-sidenav-overlay></tedi-sidenav-overlay>
      <div style="height: 1024px;">
        <nav tedi-sidenav ${argsToTemplate(args)}>
          <tedi-sidenav-item icon="dashboard" href="#">
            Dashboard
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="people" routerLink="#">
            Patient Records
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="medical_services" href="#">
            Clinical Management
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-item href="#">
                Vital Signs
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Assessments
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Active Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment History
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment Plans
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Protocols
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Documentation
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Notes
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Medical Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Consent Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Reports
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="admin_panel_settings" routerLink="#">
            Administration
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Staff Management
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Scheduling
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  System Settings
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-item routerLink="#">
                Reports & Analytics
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                Statistics
              </tedi-sidenav-dropdown-item>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="inventory" href="#">
            Inventory Management
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="payments" routerLink="#">
            Billing & Finance
          </tedi-sidenav-item>
        </nav>
      </div>
    `,
  }),
};

export const CollapsibleToggle: StoryObj<SideNavComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    dividers: true,
    size: "large",
    collapsible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-sidenav-toggle></button>
      <tedi-sidenav-overlay></tedi-sidenav-overlay>
      <div style="height: 1024px;">
        <nav tedi-sidenav ${argsToTemplate(args)}>
          <tedi-sidenav-item icon="dashboard" href="#">
            Dashboard
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="people" routerLink="#">
            Patient Records
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="medical_services" href="#">
            Clinical Management
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-item href="#">
                Vital Signs
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Assessments
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Active Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment History
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment Plans
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Protocols
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Documentation
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Notes
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Medical Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Consent Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Reports
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="admin_panel_settings">
            Administration
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Staff Management
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Scheduling
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  System Settings
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-item routerLink="#">
                Reports & Analytics
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                Statistics
              </tedi-sidenav-dropdown-item>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="inventory" href="#">
            Inventory Management
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="payments" routerLink="#">
            Billing & Finance
          </tedi-sidenav-item>
        </nav>
      </div>
    `,
  }),
};

export const MediumSidenavItems: StoryObj<SideNavComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    dividers: true,
    size: "medium",
    collapsible: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-sidenav-toggle></button>
      <tedi-sidenav-overlay></tedi-sidenav-overlay>
      <div style="height: 1024px;">
        <nav tedi-sidenav ${argsToTemplate(args)}>
          <tedi-sidenav-item icon="dashboard" href="#">
            Dashboard
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="people" routerLink="#">
            Patient Records
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="medical_services" href="#">
            Clinical Management
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-item href="#">
                Vital Signs
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Assessments
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Active Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment History
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment Plans
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Protocols
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Documentation
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Notes
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Medical Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Consent Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Reports
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="admin_panel_settings">
            Administration
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Staff Management
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Scheduling
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  System Settings
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-item routerLink="#">
                Reports & Analytics
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                Statistics
              </tedi-sidenav-dropdown-item>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="inventory" href="#">
            Inventory Management
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="payments" routerLink="#">
            Billing & Finance
          </tedi-sidenav-item>
        </nav>
      </div>
    `,
  }),
};

export const SmallSidenavItems: StoryObj<SideNavComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    dividers: true,
    size: "small",
    collapsible: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button tedi-sidenav-toggle></button>
      <tedi-sidenav-overlay></tedi-sidenav-overlay>
      <div style="height: 800px;">
        <nav tedi-sidenav ${argsToTemplate(args)}>
          <tedi-sidenav-item icon="dashboard" href="#">
            Dashboard
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="people" routerLink="#">
            Patient Records
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="medical_services" href="#">
            Clinical Management
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-item href="#">
                Vital Signs
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item href="#">
                Assessments
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Active Treatments
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment History
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Treatment Plans
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Protocols
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item href="#">
                  Documentation
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Clinical Notes
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Medical Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Consent Forms
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item href="#">
                  Reports
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="admin_panel_settings">
            Administration
            <tedi-sidenav-dropdown>
              <tedi-sidenav-dropdown-group>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Staff Management
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  Scheduling
                </tedi-sidenav-dropdown-item>
                <tedi-sidenav-dropdown-item routerLink="#">
                  System Settings
                </tedi-sidenav-dropdown-item>
              </tedi-sidenav-dropdown-group>
              <tedi-sidenav-dropdown-item routerLink="#">
                Reports & Analytics
              </tedi-sidenav-dropdown-item>
              <tedi-sidenav-dropdown-item routerLink="#">
                Statistics
              </tedi-sidenav-dropdown-item>
            </tedi-sidenav-dropdown>
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="inventory" href="#">
            Inventory Management
          </tedi-sidenav-item>
          <tedi-sidenav-item icon="payments" routerLink="#">
            Billing & Finance
          </tedi-sidenav-item>
        </nav>
      </div>
    `,
  }),
};
