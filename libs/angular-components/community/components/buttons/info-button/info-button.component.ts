import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

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
export class InfoButtonComponent {
  /**
   * If true, applies a small size to the InfoButton.
   * @default false
   */
  isSmall = input<boolean>(false);
  /**
   * The title attribute for the InfoButton.
   * Will be used as a default browser tooltip.
   */
  title = input<string>();
  /**
   * The aria-label attribute for the InfoButton.
   */
  ariaLabel = input<string>();
}
