import { Component, input, signal } from "@angular/core";
import { CardComponent } from "../../../card";

@Component({
  selector: "tedi-accordion-item",
  standalone: true,
  imports: [CardComponent],
  templateUrl: "./accordion-item.component.html",
  styleUrl: "./accordion-item.component.scss",
})
export class AccordionItemComponent {
  id = input.required<string>();
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
