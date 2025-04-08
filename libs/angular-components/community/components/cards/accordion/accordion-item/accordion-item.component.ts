import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { CardComponent } from "../../card/card.component";

@Component({
  selector: "tedi-accordion-item",
  standalone: true,
  imports: [CardComponent],
  templateUrl: "./accordion-item.component.html",
  styleUrl: "./accordion-item.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-accordion-item]": "true",
  },
})
export class AccordionItemComponent {
  /**
   * Accordion item id
   */
  id = input.required<string>();
  /**
   * Whether accordion item is selected
   */
  selected = input<boolean>(false);

  opened = signal<boolean>(false);

  headerId = computed(() => {
    return `tedi-accordion-header-${this.id()}`;
  });
  contentId = computed(() => {
    return `tedi-accordion-content-${this.id()}`;
  });

  open() {
    this.opened.set(true);
  }

  close() {
    this.opened.set(false);
  }

  toggle() {
    this.opened.update((wasOpened) => !wasOpened);
  }
}
