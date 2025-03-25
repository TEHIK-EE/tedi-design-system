import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { CardColorsDirective } from "./card-colors.directive";

export type CardSpacing = "xs" | "sm" | "md" | "lg" | "none";
export type CardAccentBorder = "info" | "success" | "warning" | "danger";

@Component({
  selector: "tedi-card",
  standalone: true,
  imports: [],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-card]": "true",
    "[class.tedi-card--borderless]": "borderless()",
    "[class.tedi-card--selected]": "selected()",
    "[class]": "modifierClasses()",
  },
  hostDirectives: [
    {
      directive: CardColorsDirective,
      inputs: ["background", "border"],
    },
  ],
})
export class CardComponent {
  borderless = input<boolean>();
  spacing = input<CardSpacing>("md");
  accentBorder = input<CardAccentBorder>();
  selected = input<boolean>();

  modifierClasses = computed(() => {
    const modifiers = [`tedi-card--spacing-${this.spacing()}`];
    if (this.accentBorder()) {
      modifiers.push(
        `tedi-card--accent-border`,
        `tedi-card--accent-border--${this.accentBorder()}`,
      );
    }
    return modifiers.join(" ");
  });
}
