import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from "@angular/core";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

type InfoButtonInputs = {
  /**
   * If true, applies a small size to the InfoButton.
   * @default false
   */
  isSmall: InputSignal<boolean | undefined>;
  title: InputSignal<string | undefined>;
  ariaLabel: InputSignal<string | undefined>;
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
export class InfoButtonComponent implements InfoButtonInputs {
  isSmall = input<boolean>();
  title = input<string>();
  ariaLabel = input<string>();
}
