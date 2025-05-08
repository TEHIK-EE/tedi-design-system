import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

export type ClosingButtonSize = "medium" | "large";

@Component({
  selector: "[tedi-closing-button]",
  imports: [IconComponent],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./closing-button.component.html",
  styleUrl: "./closing-button.component.scss",
  host: {
    type: "button",
    "[title]": "title()",
    "[attr.aria-label]": "title()",
    "[class.tedi-closing-button]": "true",
    "[class.tedi-closing-button--small]": "size() === 'medium'",

  },
})
export class CloseButtonComponent {
  /**
   * Determins if the button should be medium or large.
   * @default false
   */
  size = input<ClosingButtonSize>("medium");
  /**
   * The title for the button.
   * Used for accessibility and inside browsers default tooltip on hover.
   * If not provided, the 'close' label will be used as a fallback.
   * @default Sulge
   */
  title = input<string>("Sulge");
}
