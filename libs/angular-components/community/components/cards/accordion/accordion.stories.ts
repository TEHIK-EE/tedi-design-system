import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { CommonModule } from "@angular/common";
import { IconComponent, TextComponent } from "@tehik-ee/tedi-angular/tedi";
import { ButtonComponent } from "../../buttons/button/button.component";
import { AccordionIconComponent } from "./accordion-icon/accordion-icon.component";
import { AccordionItemContentComponent } from "./accordion-item-content/accordion-item-content.component";
import { AccordionItemHeaderComponent } from "./accordion-item-header/accordion-item-header.component";
import { AccordionItemComponent } from "./accordion-item/accordion-item.component";
import { AccordionComponent } from "./accordion/accordion.component";
import { CheckboxComponent } from "../../form/checkbox/checkbox/checkbox.component";

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
        TextComponent,
        IconComponent,
        ButtonComponent,
        CheckboxComponent,
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
          <p tedi-text color="secondary">Title</p>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <p tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </tedi-accordion-item-content>
      </tedi-accordion-item>

      <tedi-accordion-item id="accordion-2">
        <tedi-accordion-item-header openText="Open" closeText="Close">
          <p tedi-text color="secondary">Title</p>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <p tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
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
            <p tedi-text modifiers="bold" color="secondary">
              Töövõime
            </p>
          </div>
        </tedi-accordion-icon>
        <tedi-accordion-item-header [indicator]="true">
          <p tedi-text color="secondary">Title</p>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <p tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
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
          <p tedi-text color="secondary">Title</p>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <p tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </tedi-accordion-item-content>
      </tedi-accordion-item>

      <tedi-accordion-item id="accordion-2">
        <tedi-accordion-item-header [indicator]="true" variant="brand">
          <p tedi-text color="white">Brand header variant</p>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <p tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </tedi-accordion-item-content>
      </tedi-accordion-item>

      <tedi-accordion-item id="accordion-3">
        <tedi-accordion-item-header [indicator]="true" background="brand-quaternary">
          <p tedi-text color="brand">Brand quaternary header background</p>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <p tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </tedi-accordion-item-content>
      </tedi-accordion-item>
    </div>
  </tedi-accordion>`,
    };
  },
};

export const AccordionWithEndContent: AccordionStory = {
  render: () => {
    const checkboxClickHandler = (e: Event) => {
      e.stopPropagation();
    };
    return {
      props: {
        checkboxClickHandler,
      },
      template: `
      <tedi-accordion-item id="accordion-item-end-1">
        <tedi-accordion-item-header [indicator]="true">
          <p tedi-text color="brand">Title</p>
          <div tedi-accordion-header-end>
            <tedi-checkbox inputId="accordion-checkbox" (click)="checkboxClickHandler($event)" />
          </div>
        </tedi-accordion-item-header>
        <tedi-accordion-item-content>
          <p tedi-text color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </tedi-accordion-item-content>
      </tedi-accordion-item>`,
    };
  },
};
