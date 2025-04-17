import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type SpinnerSize = 10 | 16 | 48;
export type SpinnerColor = "primary" | "secondary";

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
export class SpinnerComponent {
  /**
   * Size of the spinner in px.
   * @default 16
   */
  size = input<SpinnerSize>(16);
  /**
   * Specifies the color theme of the spinner.
   * The color should meet accessibility standards for color contrast.
   * @default primary
   */
  color = input<SpinnerColor>("primary");
  /**
   * Provides a text label for screen readers to announce the spinner's purpose or status.
   */
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
