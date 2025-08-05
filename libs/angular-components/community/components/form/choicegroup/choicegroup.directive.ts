import { computed, Directive, input } from "@angular/core";

export type ChoicegroupVariant = "primary" | "secondary";

@Directive({
  standalone: true,
  host: {
    "[class.tedi-choicegroup]": "true",
    "[class.tedi-choicegroup--stacked]": "spacing() === 0",
    "[class.tedi-choicegroup--plain]": "!hasIndicator()",
    "[class]": "modifierClasses()",
  },
})
export class ChoiceGroupDirective {
  /*
   * Variant of the cards in group.
   */
  variant = input<ChoicegroupVariant>("primary");
  /*
   * Whether choicegroup card has indicator
   */
  hasIndicator = input<boolean>(true);
  /*
   * Spacing between radios. unit: px.
   * @default 4
   */
  spacing = input<number>(4);

  modifierClasses = computed(() => {
    return `tedi-choicegroup--${this.variant()}`;
  });
}
