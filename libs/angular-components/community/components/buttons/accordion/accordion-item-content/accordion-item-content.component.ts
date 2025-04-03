import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { AccordionItemComponent } from "../accordion-item/accordion-item.component";
import {
  CardColors,
  CardContentComponent,
} from "libs/angular-components/community/public-api";

@Component({
  selector: "tedi-accordion-item-content",
  standalone: true,
  imports: [CardContentComponent],
  templateUrl: "./accordion-item-content.component.html",
  styleUrl: "./accordion-item-content.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-accordion-item-content]": "true",
  },
})
export class AccordionItemContentComponent {
  background = input<CardColors>();

  accordionItem = inject(AccordionItemComponent);
  headerId = computed(() => {
    return `tedi-accordion-header-${this.accordionItem.id()}`;
  });
  contentId = computed(() => {
    return `tedi-accordion-content-${this.accordionItem.id()}`;
  });
}
