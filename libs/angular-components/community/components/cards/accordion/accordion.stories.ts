import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { CommonModule } from "@angular/common";
import {
  HeadingComponent,
  IconComponent,
  TextComponent,
} from "@tehik-ee/tedi-angular/tedi";
import { ButtonComponent } from "../../buttons/button/button.component";
import { AccordionIconComponent } from "./accordion-icon/accordion-icon.component";
import { AccordionItemContentComponent } from "./accordion-item-content/accordion-item-content.component";
import { AccordionItemHeaderComponent } from "./accordion-item-header/accordion-item-header.component";
import { AccordionItemComponent } from "./accordion-item/accordion-item.component";
import { AccordionComponent } from "./accordion/accordion.component";

export default {
  title: "Community Angular/Cards/Accordion",
  component: AccordionComponent,
  subcomponents: {
    AccordionIconComponent,
    AccordionItemComponent,
    AccordionItemHeaderComponent,
    AccordionItemContentComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        AccordionComponent,
        AccordionIconComponent,
        AccordionItemComponent,
        AccordionItemHeaderComponent,
        AccordionItemContentComponent,
        HeadingComponent,
        TextComponent,
        IconComponent,
        ButtonComponent,
      ],
    }),
  ],
} as Meta<AccordionComponent>;

type AccordionStory = StoryObj<AccordionComponent>;

export const Default: AccordionStory = {
  render: () => {
    return {
      template: `<tedi-accordion
    [defaultOpenItems]="['accordion-2']"
    [singleOpen]="true"
  >
    <div [style]="{ display: 'flex', 'flex-direction': 'column', gap: '10px' }">
      <tedi-accordion-item id="accordion-1">
        <tedi-accordion-item-header [indicator]="true">
          <tedi-text color="secondary">Title</tedi-text>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </tedi-text>
        </tedi-accordion-item-content>
      </tedi-accordion-item>

      <tedi-accordion-item id="accordion-2">
        <tedi-accordion-item-header openText="Open" closeText="Close">
          <tedi-text color="secondary">Title</tedi-text>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </tedi-text>
        </tedi-accordion-item-content>
      </tedi-accordion-item>
    </div>
  </tedi-accordion>`,
    };
  },
};

export const IconAccordion: AccordionStory = {
  render: () => {
    return {
      template: `
      <tedi-accordion-item id="accordion-1">
        <tedi-accordion-icon>
          <div [style]="{ display: 'flex', 'align-items': 'center', gap: '8px' }">
            <tedi-icon
              name="business_center"
              color="secondary"
              size="18"
            />
            <tedi-text modifiers="bold" color="secondary">
              Töövõime
            </tedi-text>
          </div>
        </tedi-accordion-icon>
        <tedi-accordion-item-header [indicator]="true">
          <tedi-text color="secondary">Title</tedi-text>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </tedi-text>
        </tedi-accordion-item-content>
      </tedi-accordion-item>`,
    };
  },
};

export const ColoredHeaders: AccordionStory = {
  render: () => {
    return {
      template: `<tedi-accordion
  >
    <div [style]="{ display: 'flex', 'flex-direction': 'column', gap: '10px' }">
      <tedi-accordion-item id="accordion-1">
        <tedi-accordion-item-header [indicator]="true">
          <tedi-text color="secondary">Title</tedi-text>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </tedi-text>
        </tedi-accordion-item-content>
      </tedi-accordion-item>

      <tedi-accordion-item id="accordion-2">
        <tedi-accordion-item-header [indicator]="true" variant="brand">
          <tedi-text color="white">Brand header variant</tedi-text>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </tedi-text>
        </tedi-accordion-item-content>
      </tedi-accordion-item>

      <tedi-accordion-item id="accordion-3">
        <tedi-accordion-item-header [indicator]="true" background="brand-quaternary">
          <tedi-text color="brand">Brand quaternary header background</tedi-text>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </tedi-text>
        </tedi-accordion-item-content>
      </tedi-accordion-item>
    </div>
  </tedi-accordion>`,
    };
  },
};
