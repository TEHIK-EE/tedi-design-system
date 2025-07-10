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
import { LinkComponent } from "../../navigation/link/link.component";
import { IconComponent } from "../../base/icon/icon.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { ShowAtDirective } from "../../../directives/show-at/show-at.directive";
import { HideAtDirective } from "../../../directives/hide-at/hide-at.directive";

export default {
  title: "TEDI-Ready Angular/Layout/Header",
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
          LinkComponent,
          IconComponent,
          ButtonComponent,
          ShowAtDirective,
          HideAtDirective
        ],
      }),
    ],
  parameters: {
    layout: "fullscreen",
  },
} as Meta<HeaderComponent>;

export const Default: StoryObj<HeaderComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <header tedi-header ${argsToTemplate(args)}>
          <img src="header-logo.svg" alt="Logo" />
          <tedi-header-content *showAt="'lg'">
            <a href="#">Link text</a>
            <a href="#">Link text</a>
            <a href="#">Link text</a>
          </tedi-header-content>
          <tedi-header-actions>
            <tedi-header-language [languages]="[{ name: 'Estonian', label: 'EST', isSelected: true }, { name: 'English', label: 'ENG' }]" currentLanguage="EST" />
            <tedi-header-login />
          </tedi-header-actions>
        </header>
    `,
  }),
};

export const LoggedOut: StoryObj<HeaderComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <header tedi-header ${argsToTemplate(args)}>
          <img src="header-logo.svg" alt="Logo" />
          <tedi-header-content>
            <a tedi-link [underline]="false">Link text</a>
            <a tedi-link [underline]="false">Link text</a>
            <a tedi-link [underline]="false">Link text</a>
          </tedi-header-content>
          <tedi-header-actions>
            <tedi-header-language 
              [languages]="[{ name: 'Estonian', label: 'EST', isSelected: true }, { name: 'English', label: 'ENG' }]" 
              currentLanguage="EST" 
            />
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
        <header tedi-header ${argsToTemplate(args)}>
          <img src="header-logo.svg" alt="Logo" />
          <tedi-header-actions>
            <a tedi-link [underline]="false">
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
            />
            <tedi-header-language [languages]="[{ name: 'Estonian', label: 'EST', isSelected: true }, { name: 'English', label: 'ENG' }]" currentLanguage="EST" />
            <tedi-header-profile>
              <a tedi-link [underline]="false">Minu andmed</a>
              <a tedi-link [underline]="false">Esindatavad</a>
              <a tedi-link [underline]="false">Kontaktid</a>
              <div style="height: 1px; background: var(--general-border-primary);"></div>
              <a tedi-link [underline]="false">
                <tedi-icon name="logout" />
                Logi välja
              </a>
            </tedi-header-profile>
          </tedi-header-actions>
        </header>
    `,
  }),
};