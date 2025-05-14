import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from "@angular/core";
import { IconComponent } from "../../base/icon/icon.component";

@Component({
  standalone: true,
  selector: "button[tedi-info-button]",
  imports: [IconComponent],
  templateUrl: "./info-button.component.html",
  styleUrl: "./info-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "class": "tedi-info-button",
    "[attr.aria-label]": "ariaLabel()"
  }
})
export class InfoButtonComponent {
  /**
   * Required aria label provided to button element.
   */
  ariaLabel = input.required<string>();
}
