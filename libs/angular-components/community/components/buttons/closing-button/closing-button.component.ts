import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

export type CloseButtonSize = "default" | "small";

@Component({
  selector: "[tedi-close-button]",
  imports: [IconComponent],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./closing-button.component.html",
  styleUrl: "./closing-button.component.scss",
  host: {
    "[class.tedi-closing-button]": "true",
    "[class]": "modifierClasses()",
  },
})
export class CloseButtonComponent {
  /**
   * Size of the close button.
   * @default default
   */
  size = input<CloseButtonSize>("default");

  modifierClasses = computed(() => {
    const modifiers = [];
    if (this.size()) modifiers.push(`tedi-closing-button--${this.size()}`);
    return modifiers.join(" ");
  });
}
