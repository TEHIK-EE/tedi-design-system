import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent } from "../../base/icon/icon.component";
import { TediTranslationService } from "../../../services/translation/translation.service";

export type ClosingButtonSize = "default" | "small";
export type ClosingButtonIconSize = 18 | 24;
@Component({
  selector: "button[tedi-closing-button]",
  imports: [IconComponent],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./closing-button.component.html",
  styleUrl: "./closing-button.component.scss",
  host: {
    "[title]": "title()",
    "[attr.aria-label]": "title()",
    "[class.tedi-closing-button]": "true",
    "[class.tedi-closing-button--small]": "size() === 'small'",
  },
})
export class ClosingButtonComponent {
  /**
   * Overall button size.
   * - `default` - The default size, typically larger.
   * - `small` - A smaller version of the button, often used in compact layouts.
   * @default default
   */
  size = input<ClosingButtonSize>("default");
  /**
   * The size of the icon inside the button in pixels.
   * - `24` - A standard icon size, commonly used in most interfaces.
   * - `18` - A smaller icon size, suitable for compact designs.
   * @default 24
   */
  iconSize = input<ClosingButtonIconSize>(24);

  private translationService = inject(TediTranslationService);
  title = this.translationService.track("close");
}
