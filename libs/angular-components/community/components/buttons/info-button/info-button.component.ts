import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { IconComponent, InputsWithSignals } from "@tehik-ee/tedi-angular/tedi";

export type InfoButtonInputs = {
  /**
   * If true, applies a small size to the InfoButton.
   * @default false
   */
  isSmall?: boolean;
  /**
   * The title attribute for the InfoButton.
   * Will be used as a default browser tooltip.
   */
  title?: string;
  /**
   * The aria-label attribute for the InfoButton.
   */
  ariaLabel?: string;
};

@Component({
  standalone: true,
  selector: "button[tedi-info-button]",
  imports: [IconComponent],
  templateUrl: "./info-button.component.html",
  styleUrl: "./info-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.role]": "button",
    "[attr.aria-label]": "ariaLabel()",
    "[attr.title]": "title()",
  },
})
export class InfoButtonComponent
  implements InputsWithSignals<InfoButtonInputs> {
  isSmall = input<boolean>();
  title = input<string>();
  ariaLabel = input<string>();
}
