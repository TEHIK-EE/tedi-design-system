import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type CardHeaderVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "brand"
  | "brand-dark";

@Component({
  selector: "tedi-card-header",
  standalone: true,
  imports: [],
  templateUrl: "./card-header.component.html",
  styleUrl: "./card-header.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-card-header]": "true",
    "[class]": "modifierClasses()",
  },
})
export class CardHeaderComponent {
  /**
   * Variant of the card header.
   * @default primary
   */
  variant = input<CardHeaderVariant>("primary");

  modifierClasses = computed(() => {
    return `tedi-card-header--${this.variant()}`;
  });
}
