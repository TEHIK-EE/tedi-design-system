import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { CardComponent } from "libs/angular-components/community/public-api";

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
