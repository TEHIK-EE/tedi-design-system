import { computed, Directive, input } from "@angular/core";
import { CardSpacing } from "./card.component";

export type CardPadding =
  | CardSpacing
  | { horizontal?: CardSpacing; vertical?: CardSpacing }
  | {
      top?: CardSpacing;
      bottom?: CardSpacing;
      left?: CardSpacing;
      right?: CardSpacing;
    };

const getPaddingClasses = (padding: CardPadding) => {
  if (typeof padding === "string") {
    return `tedi-card--padding-${padding}`;
  } else {
    return Object.entries(padding)
      .map(([direction, padding]) => {
        return `tedi-card--padding-${direction}-${padding}`;
      })
      .join(" ");
  }
};

@Directive({
  standalone: true,
  host: {
    "[class]": "modifierClasses()",
  },
})
export class CardPaddingDirective {
  /**
   * Modifies padding of the block it's attached to. Can be override whole block or horizontal, vertical or each side separately.
   */
  padding = input<CardPadding>();

  modifierClasses = computed(() => {
    if (this.padding()) {
      return getPaddingClasses(this.padding()!);
    }
    return "";
  });
}
