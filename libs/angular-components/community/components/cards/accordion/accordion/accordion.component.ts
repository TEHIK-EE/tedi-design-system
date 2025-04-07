import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  inject,
  Injector,
  input,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { AccordionItemComponent } from "../accordion-item/accordion-item.component";

@Component({
  selector: "tedi-accordion",
  standalone: true,
  imports: [],
  templateUrl: "./accordion.component.html",
  styleUrl: "./accordion.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  /**
   * id-s of items that should be opened by default.
   */
  defaultOpenItems = input<string[]>();
  /**
   * Whether only one accordion item can be opened at once.
   * @default false
   */
  singleOpen = input<boolean>(false);

  accordionItems = contentChildren(AccordionItemComponent, {
    descendants: true,
  });
  private injector = inject(Injector);

  private openDefaultOpenItems() {
    const defaultOpenItems = this.defaultOpenItems();
    this.accordionItems().forEach((item) => {
      if (defaultOpenItems?.includes(item.id())) {
        item.open();
      }
    });
  }

  private onSingleItemOpen() {
    this.accordionItems().forEach((item, _, allItems) => {
      toObservable(item.opened, {
        injector: this.injector,
      }).subscribe((opened) => {
        if (opened) {
          allItems.forEach((otherItem) => {
            if (otherItem.id() !== item.id()) {
              otherItem.close();
            }
          });
        }
      });
    });
  }

  ngOnInit() {
    this.openDefaultOpenItems();
    if (this.singleOpen()) {
      this.onSingleItemOpen();
    }
  }
}
