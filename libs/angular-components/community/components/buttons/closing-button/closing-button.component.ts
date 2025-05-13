import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

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
    "[class.tedi-closing-button--small]": "small()",
    "[class.tedi-closing-button--small-icon]": "smallIcon()",
  },
})
export class CloseButtonComponent {
  /**
   * Should show small button instead of default button.
   * @default false
   */
  small = input<boolean>(false);
  /**
   * Should show small icon instead of default icon.
   * @default false
   */
  smallIcon = input<boolean>(false);
}
