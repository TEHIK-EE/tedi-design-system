import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from "@angular/core";
import { IconComponent } from "../../../../tedi/components/base/icon/icon.component";

type InfoButtonInputs = {
  /**
   * If true, applies a small size to the InfoButton.
   * @default false
   */
  isSmall?: InputSignal<boolean>;
  title?: InputSignal<string | undefined>;
  ariaLabel?: InputSignal<string | undefined>;
};

@Component({
  standalone: true,
  selector: "tedi-info-button",
  imports: [IconComponent],
  templateUrl: "./info-button.component.html",
  styleUrl: "./info-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonComponent implements InfoButtonInputs {
  isSmall = input<boolean>(false);
  title = input<string | undefined>();
  label = input<string | undefined>();
}
