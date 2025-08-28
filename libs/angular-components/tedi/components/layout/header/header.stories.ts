import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { HeaderComponent } from "./header.component";
import { HeaderContentComponent } from "./header-content/header-content.component";
import { HeaderActionsComponent } from "./header-actions/header-actions.component";
import { HeaderRoleComponent } from "./header-role/header-role.component";
import { HeaderLanguageComponent } from "./header-language/header-language.component";
import { HeaderProfileComponent } from "./header-profile/header-profile.component";
import { HeaderLoginComponent } from "./header-login/header-login.component";
import { HeaderLogoutComponent } from "./header-logout/header-logout.component";
import { LinkComponent } from "../../navigation/link/link.component";
import { IconComponent } from "../../base/icon/icon.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { ShowAtDirective } from "../../../directives/show-at/show-at.directive";
import { HideAtDirective } from "../../../directives/hide-at/hide-at.directive";
import { SideNavToggleComponent } from "../sidenav/sidenav-toggle/sidenav-toggle.component";
import { SideNavComponent } from "../sidenav/sidenav.component";
import { SideNavItemComponent } from "../sidenav/sidenav-item/sidenav-item.component";
import { SideNavOverlayComponent } from "../sidenav/sidenav-overlay/sidenav-overlay.component";
import { SeparatorComponent } from "../../helpers/separator/separator.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.13.19?node-id=2137-19318&m=dev&focus-id=6380-53060" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.zeroheight.com/styleguide/s/118912/p/68343d-header" target="_BLANK">Zeroheight ↗</a>
 *
 * To test the mobile layout, either resize your browser window or use Storybook's built-in viewport tools.
 * The header component is used to display the header at the top of the page. It can contain SideNav menu toggle, logo, content links, language select, role select, profile menu, login and logout buttons and more.
 * This component is responsive and adapts to mobile layout when at certain screen size. But it is needed to use showAt and hideAt directives also, to show and hide some components, since their location changes in different breakpoints.
 * For an example, HeaderRoleComponent is in main header in desktop, but in mobile it is under HeaderProfileComponent menu.
 * Header consists of several sub-components:
 * - `HeaderContentComponent`: Used for showing links in desktop view.
 * - `HeaderActionsComponent`: Used for showing and styling actions in header (placed at the right side).
 * - `HeaderRoleComponent`: Used for showing role selection.
 * - `HeaderLanguageComponent`: Used for selecting language.
 * - `HeaderProfileComponent`: Used for showing profile menu.
 * - `HeaderLoginComponent`: Used for showing login button.
 * - `HeaderLogoutComponent`: Used for showing logout button.
 */

export default {
  title: "TEDI-Ready/Layout/Header",
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HeaderComponent,
        HeaderContentComponent,
        HeaderActionsComponent,
        HeaderRoleComponent,
        HeaderLanguageComponent,
        HeaderProfileComponent,
        HeaderLoginComponent,
        HeaderLogoutComponent,
        SeparatorComponent,
        LinkComponent,
        IconComponent,
        ButtonComponent,
        ShowAtDirective,
        HideAtDirective,
        SideNavComponent,
        SideNavItemComponent,
        SideNavToggleComponent,
        SideNavOverlayComponent,
      ],
    }),
  ],
  parameters: {
    layout: "fullscreen",
    docs: { toc: false },
  },
  argTypes: {
    role: {
      description: "Role text",
      control: "text",
      table: {
        category: "header-role",
        type: { summary: "string" },
      },
    },
    description: {
      description: "Description text",
      control: "text",
      table: {
        category: "header-role",
        type: { summary: "string" },
      },
    },
    showInput: {
      description: "Should show input in representative list?",
      control: "boolean",
      table: {
        category: "header-role",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    representatives: {
      description: "List of representatives",
      table: {
        category: "header-role",
        type: { summary: "Representative[]" },
      },
    },
    currentRepresentative: {
      description: "Current representative",
      table: {
        category: "header-role",
        type: { summary: "Representative" },
      },
    },
    name: {
      description: "Name of representative",
      control: "text",
      table: {
        category: "header-profile",
        type: { summary: "string" },
      },
    },
    showDropdown: {
      description: "Breakpoint at which we show dropdown instead of modal",
      control: "radio",
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      table: {
        category: "header-profile",
        type: { summary: "Breakpoint", detail: "xs \nsm \nmd \nlg \nxl \nxxl" },
      },
    },
    languages: {
      description:
        "Languages object. <br />Key is value in 'Language' type. <br />Value should be text shown in the UI.",
      table: {
        category: "header-language",
        type: { summary: "HeaderLanguage" },
      },
    },
  },
} as Meta<HeaderComponent>;

export const Default: StoryObj<HeaderComponent> = {
  render: (args) => ({
    props: args,
    styles: [
      `
      img {
        max-height: 40px;

        @media (min-width: 992px) {
          max-height: 52px;
        }
      }
    `,
    ],
    template: `
      <header tedi-header ${argsToTemplate(args)}>
        <button tedi-sidenav-toggle></button>
        <img src="header-logo.svg" alt="Logo" />
        <tedi-header-content *showAt="'lg'">
          <a tedi-link href="#" [underline]="false">Link text</a>
          <a tedi-link href="#" [underline]="false">Link text</a>
        </tedi-header-content>
        <tedi-header-actions>
          <tedi-header-language
            [languages]="{ et: 'EST', en: 'ENG', ru: 'RUS' }"
            currentLanguage="et"
          />
          <tedi-header-login />
        </tedi-header-actions>
      </header>
      <tedi-sidenav-overlay></tedi-sidenav-overlay>
      <nav tedi-sidenav *hideAt="'lg'">
        <tedi-sidenav-item href="#">
          Link text
        </tedi-sidenav-item>
        <tedi-sidenav-item href="#">
          Link text
        </tedi-sidenav-item>
      </nav>
    `,
  }),
};

export const LoggedIn1: StoryObj<HeaderComponent> = {
  render: (args) => ({
    props: args,
    styles: [
      `
      img {
        max-height: 40px;

        @media (min-width: 992px) {
          max-height: 52px;
        }
      }
    `,
    ],
    template: `
      <div style="height: 300px;">
        <header tedi-header ${argsToTemplate(args)}>
          <img src="header-logo.svg" alt="Logo" />
          <tedi-header-actions>
            <tedi-header-role
              role="Roll:"
              description="49504080934"
              [showInput]="true"
              [representatives]="[
                { icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' },
                { icon: 'supervised_user_circle', name: 'Marta Sarapuu', description: '62204115671' },
                { icon: 'supervised_user_circle', name: 'Helgi Sarapuu', description: '62407194692' }
              ]"
              [currentRepresentative]="{ icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' }"
              *showAt="'lg'"
            />
            <tedi-header-language [languages]="{ et: 'EST', en: 'ENG', ru: 'RUS' }" />
            <tedi-header-profile showDropdown="lg">
              <tedi-header-role
                role="Roll:"
                description="49504080934"
                [showInput]="true"
                [representatives]="[
                  { icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' },
                  { icon: 'supervised_user_circle', name: 'Marta Sarapuu', description: '62204115671' },
                  { icon: 'supervised_user_circle', name: 'Helgi Sarapuu', description: '62407194692' }
                ]"
                [currentRepresentative]="{ icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' }"
                *hideAt="'lg'"
              />
              <a tedi-link href="#" [underline]="false">Minu andmed</a>
              <a tedi-link href="#" [underline]="false">Esindatavad</a>
              <a tedi-link href="#" [underline]="false">Kontaktid</a>
              <tedi-separator *showAt="'lg'" />
              <button tedi-header-logout>
                Logi välja
              </button>
            </tedi-header-profile>
          </tedi-header-actions>
        </header>
      </div>
    `,
  }),
};

export const LoggedIn2: StoryObj<HeaderComponent> = {
  render: (args) => ({
    props: args,
    styles: [
      `
      img {
        max-height: 40px;

        @media (min-width: 992px) {
          max-height: 52px;
        }
      }
    `,
    ],
    template: `
      <div style="height: 300px;">
        <header tedi-header ${argsToTemplate(args)}>
          <img src="header-logo.svg" alt="Logo" />
          <tedi-header-actions>
            <tedi-header-role
              role="Roll:"
              description="49504080934"
              [showInput]="true"
              [representatives]="[
                { icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' },
                { icon: 'supervised_user_circle', name: 'Marta Sarapuu', description: '62204115671' },
                { icon: 'supervised_user_circle', name: 'Helgi Sarapuu', description: '62407194692' }
              ]"
              [currentRepresentative]="{ icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' }"
              *showAt="'lg'"
            />
            <tedi-header-language [languages]="{ et: 'EST', en: 'ENG', ru: 'RUS' }" />
            <button tedi-header-logout>
              Logi välja
            </button>
          </tedi-header-actions>
        </header>
      </div>
    `,
  }),
};

export const LoggedIn3: StoryObj<HeaderComponent> = {
  render: (args) => ({
    props: args,
    styles: [
      `
      img {
        max-height: 40px;

        @media (min-width: 992px) {
          max-height: 52px;
        }
      }
    `,
    ],
    template: `
      <div style="height: 300px;">
        <header tedi-header ${argsToTemplate(args)}>
          <img src="header-logo.svg" alt="Logo" />
          <tedi-header-actions>
            <tedi-header-role
              role="Roll:"
              description="49504080934"
              [showInput]="true"
              [representatives]="[
                { icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' },
                { icon: 'supervised_user_circle', name: 'Marta Sarapuu', description: '62204115671' },
                { icon: 'supervised_user_circle', name: 'Helgi Sarapuu', description: '62407194692' }
              ]"
              [currentRepresentative]="{ icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' }"
              *showAt="'lg'"
            />
            <tedi-header-language [languages]="{ et: 'EST', en: 'ENG', ru: 'RUS' }" />
            <tedi-header-profile name="Juulia Sarapuu" showDropdown="lg">
              <tedi-header-role
                role="Roll:"
                description="49504080934"
                [showInput]="true"
                [representatives]="[
                  { icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' },
                  { icon: 'supervised_user_circle', name: 'Marta Sarapuu', description: '62204115671' },
                  { icon: 'supervised_user_circle', name: 'Helgi Sarapuu', description: '62407194692' }
                ]"
                [currentRepresentative]="{ icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' }"
                *hideAt="'lg'"
              />
              <a tedi-link href="#" [underline]="false">Minu andmed</a>
              <a tedi-link href="#" [underline]="false">Esindatavad</a>
              <a tedi-link href="#" [underline]="false">Kontaktid</a>
              <tedi-separator *showAt="'lg'" />
              <button tedi-header-logout>
                Logi välja
              </button>
            </tedi-header-profile>
          </tedi-header-actions>
        </header>
      </div>
    `,
  }),
};

export const LoggedOut: StoryObj<HeaderComponent> = {
  render: (args) => ({
    props: args,
    styles: [
      `
      img {
        max-height: 40px;

        @media (min-width: 992px) {
          max-height: 52px;
        }
      }
    `,
    ],
    template: `
      <header tedi-header ${argsToTemplate(args)}>
        <img src="header-logo.svg" alt="Logo" />
        <tedi-header-actions>
          <tedi-header-language [languages]="{ et: 'EST', en: 'ENG', ru: 'RUS' }" />
          <tedi-header-login />
        </tedi-header-actions>
      </header>
    `,
  }),
};

export const WithOrganization: StoryObj<HeaderComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px;">
        <header tedi-header ${argsToTemplate(args)}>
          <img src="header-logo.svg" alt="Logo" />
          <tedi-header-actions>
            <a tedi-link [underline]="false" *showAt="'lg'">
              Ligipääsetavus
              <tedi-icon name="call_made" />
            </a>
            <tedi-header-role
              role="Asutus:"
              [showInput]="true"
              [representatives]="[
                { icon: 'person', name: 'Valik 1' },
                { icon: 'supervised_user_circle', name: 'Valik 2' },
                { icon: 'supervised_user_circle', name: 'Valik 3' }
              ]"
              [currentRepresentative]="{ icon: 'person', name: 'Valik 1' }"
              *showAt="'lg'"
            />
            <tedi-header-role
              role="Roll:"
              description="49504080934"
              [showInput]="true"
              [representatives]="[
                { icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' },
                { icon: 'supervised_user_circle', name: 'Marta Sarapuu', description: '62204115671' },
                { icon: 'supervised_user_circle', name: 'Helgi Sarapuu', description: '62407194692' }
              ]"
              [currentRepresentative]="{ icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' }"
              *showAt="'lg'"
            />
            <tedi-header-language [languages]="{ et: 'EST', en: 'ENG', ru: 'RUS' }" />
            <tedi-header-profile showDropdown="lg">
              <tedi-header-role
                role="Asutus:"
                [showInput]="true"
                [representatives]="[
                  { icon: 'person', name: 'Valik 1' },
                  { icon: 'supervised_user_circle', name: 'Valik 2' },
                  { icon: 'supervised_user_circle', name: 'Valik 3' }
                ]"
                [currentRepresentative]="{ icon: 'person', name: 'Valik 1' }"
                *hideAt="'lg'"
              />
              <tedi-header-role
                role="Roll:"
                description="49504080934"
                [showInput]="true"
                [representatives]="[
                  { icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' },
                  { icon: 'supervised_user_circle', name: 'Marta Sarapuu', description: '62204115671' },
                  { icon: 'supervised_user_circle', name: 'Helgi Sarapuu', description: '62407194692' }
                ]"
                [currentRepresentative]="{ icon: 'person', name: 'Juulia Sarapuu', description: '62004122984' }"
                *hideAt="'lg'"
              />
              <a tedi-link [underline]="false" *hideAt="'lg'">
                Ligipääsetavus
                <tedi-icon name="call_made" />
              </a>
              <a tedi-link [underline]="false">Minu andmed</a>
              <a tedi-link [underline]="false">Esindatavad</a>
              <a tedi-link [underline]="false">Kontaktid</a>
              <tedi-separator *showAt="'lg'" />
              <button tedi-header-logout>
                Logi välja
              </button>
            </tedi-header-profile>
          </tedi-header-actions>
        </header>
      </div>
    `,
  }),
};
