import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { AccordionItemComponent } from "../accordion-item/accordion-item.component";
import { ButtonComponent } from "../../../buttons/button/button.component";
import { CardColors } from "../../card/card-colors.directive";
import {
  CardHeaderComponent,
  CardHeaderVariant,
} from "../../card/card-header/card-header.component";
import { IconColor, IconComponent } from "@tehik-ee/tedi-angular/tedi";

const WHITE_ICON_VARIANTS = ["brand", "brand-dark"];

@Component({
  selector: "tedi-accordion-item-header",
  standalone: true,
  imports: [CardHeaderComponent, IconComponent, ButtonComponent],
  templateUrl: "./accordion-item-header.component.html",
  styleUrl: "./accordion-item-header.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-accordion-item-header-host]": "true",
  },
})
export class AccordionItemHeaderComponent {
  /**
   * Whether accordion header should have indicator arrow
   * @default false
   */
  indicator = input<boolean>(false);
  /**
   * Open button text. Visible if both openText and closeText are provided.
   */
  openText = input<string>();
  /**
   * Close button text. Visible if both openText and closeText are provided.
   */
  closeText = input<string>();
  /**
   * Accordion header variant
   */
  variant = input<CardHeaderVariant>();
  /**
   * Accordion header background
   */
  background = input<CardColors>();
  /**
   * Color of the indicator arrow
   */
  indicatorColor = input<IconColor>();

  accordionItem = inject(AccordionItemComponent);
  opened = this.accordionItem.opened;
  headerId = this.accordionItem.headerId;
  contentId = this.accordionItem.contentId;

  toggleButtonText = computed(() => {
    if (this.openText() && this.closeText()) {
      return this.opened() ? this.closeText() : this.openText();
    }
    return;
  });

  indicatorIconColor = computed(() => {
    if (this.indicatorColor()) {
      return this.indicatorColor()!;
    }
    return WHITE_ICON_VARIANTS.includes(this.variant() as CardHeaderVariant)
      ? "white"
      : "brand";
  });

  toggle() {
    this.accordionItem.toggle();
  }
}
