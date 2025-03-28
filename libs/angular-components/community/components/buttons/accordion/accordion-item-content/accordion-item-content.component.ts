import { Component, inject } from "@angular/core";
import { AccordionItemComponent } from "../accordion-item/accordion-item.component";

@Component({
  selector: "tedi-accordion-item-content",
  standalone: true,
  imports: [],
  templateUrl: "./accordion-item-content.component.html",
  styleUrl: "./accordion-item-content.component.scss",
})
export class AccordionItemContentComponent {
  accordionItem = inject(AccordionItemComponent);
  opened = this.accordionItem.opened;
}
