import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { AccordionItemComponent } from "../accordion-item/accordion-item.component";
import { CardHeaderComponent } from "../../../card";

@Component({
  selector: "tedi-accordion-item-header",
  standalone: true,
  imports: [CardHeaderComponent],
  templateUrl: "./accordion-item-header.component.html",
  styleUrl: "./accordion-item-header.component.scss",
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemHeaderComponent {
  indicator = input<boolean>(false);
  openText = input<string>();
  closeText = input<string>();

  accordionItem = inject(AccordionItemComponent);
  opened = this.accordionItem.opened;

  toggle() {
    this.accordionItem.toggle();
  }

  // ngOnInit() {
  //   console.log(this.accordionItem.id());
  // }
}
