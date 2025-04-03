import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from "@angular/core";
import {
  CardColors,
  CardContentComponent,
} from "libs/angular-components/community/public-api";
import { AccordionItemComponent } from "../accordion-item/accordion-item.component";

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
  headerId = this.accordionItem.headerId;
  contentId = this.accordionItem.contentId;
}
