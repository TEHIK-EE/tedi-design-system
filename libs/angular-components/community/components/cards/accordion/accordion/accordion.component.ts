import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  input,
  OnInit,
} from "@angular/core";
import { AccordionItemComponent } from "../accordion-item/accordion-item.component";

@Component({
  selector: "tedi-accordion",
  standalone: true,
  imports: [],
  templateUrl: "./accordion.component.html",
  styleUrl: "./accordion.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {
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

  private prevOpens: boolean[] = [];

  constructor() {
    effect(() => {
      const single = this.singleOpen();
      const items = this.accordionItems();
      const opens = items.map((it) => it.opened());
      let newlyOpenedIndex = -1;

      if (single && items.length > 0) {
        for (let i = 0; i < opens.length; i++) {
          const prev = i < this.prevOpens.length ? this.prevOpens[i] : false;
          if (!prev && opens[i]) {
            newlyOpenedIndex = i;
          }
        }

        if (newlyOpenedIndex >= 0) {
          for (let i = 0; i < items.length; i++) {
            if (i !== newlyOpenedIndex && items[i].opened()) {
              items[i].close();
            }
          }
        }
      }

      this.prevOpens = opens;
    });
  }

  private openDefaultOpenItems() {
    const defaultOpenItems = this.defaultOpenItems();
    this.accordionItems().forEach((item) => {
      if (defaultOpenItems?.includes(item.id())) {
        item.open();
      }
    });
  }

  ngOnInit() {
    this.openDefaultOpenItems();
  }
}
