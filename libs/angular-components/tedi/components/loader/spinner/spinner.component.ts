import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { InputsWithSignals } from "../../../types/inputs.type";

export type SpinnerSize = 10 | 16 | 48;
export type SpinnerColor = "primary" | "secondary";
export interface SpinnerInputs {
  /**
   * Size of the spinner in px.
   * @default 16
   */
  size: SpinnerSize;
  /**
   * Specifies the color theme of the spinner.
   * The color should meet accessibility standards for color contrast.
   * @default primary
   */
  color: SpinnerColor;
  /**
   * Provides a text label for screen readers to announce the spinner's purpose or status.
   */
  label?: string;
}

@Component({
  selector: "tedi-spinner",
  standalone: true,
  templateUrl: "./spinner.component.html",
  styleUrl: "./spinner.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
    "role": "status",
    "aria-live": "polite",
    "[attr.aria-label]": "label() ? label() : null",
    "[attr.aria-hidden]": "!label()"
  }
})
export class SpinnerComponent implements InputsWithSignals<SpinnerInputs> {
  size = input<SpinnerSize>(16);
  color = input<SpinnerColor>("primary");
  label = input<string>();

  classes = computed(() => {
    const classList = [
      "tedi-spinner",
      `tedi-spinner--size-${this.size()}`,
      `tedi-spinner--color-${this.color()}`,
    ];

    return classList.join(" ");
  });
}
