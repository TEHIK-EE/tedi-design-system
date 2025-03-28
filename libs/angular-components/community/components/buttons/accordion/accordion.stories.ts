import { Meta, StoryObj } from "@storybook/angular";

import { Component } from "@angular/core";
import { AccordionComponent } from "./accordion/accordion.component";
import { AccordionItemComponent } from "./accordion-item/accordion-item.component";
import { AccordionItemHeaderComponent } from "./accordion-item-header/accordion-item-header.component";
import { AccordionItemContentComponent } from "./accordion-item-content/accordion-item-content.component";

@Component({
  selector: "accordion-story",
  standalone: true,
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemHeaderComponent,
    AccordionItemContentComponent,
  ],
  template: `<tedi-accordion
    [defaultOpenItems]="['accordion-2']"
    [singleOpen]="true"
  >
    <tedi-accordion-item id="accordion-1">
      <tedi-accordion-item-header>
        Accordion header 1
      </tedi-accordion-item-header>
      <tedi-accordion-item-content>
        Accordion content 1
      </tedi-accordion-item-content>
    </tedi-accordion-item>

    <tedi-accordion-item id="accordion-2">
      <tedi-accordion-item-header>
        Accordion header 2
      </tedi-accordion-item-header>
      <tedi-accordion-item-content>
        Accordion content 2
      </tedi-accordion-item-content>
    </tedi-accordion-item>

    <tedi-accordion-item id="accordion-3">
      <tedi-accordion-item-header>
        Accordion header 3
      </tedi-accordion-item-header>
      <tedi-accordion-item-content>
        Accordion content 3
      </tedi-accordion-item-content>
    </tedi-accordion-item>
  </tedi-accordion>`,
})
export class AccordionStoryComponent {}

export default {
  title: "Community Angular/Buttons/Accordion",
  component: AccordionStoryComponent,
} as Meta<AccordionStoryComponent>;

type AccordionStory = StoryObj<AccordionStoryComponent>;

export const Default: AccordionStory = {};
