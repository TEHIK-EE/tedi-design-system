import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
} from "@angular/core";

export type SpinnerSize = 10 | 16 | 48;
export type SpinnerColor = "primary" | "secondary";

export interface SpinnerProps {
  /**
   * Size of the spinner in px.
   * @default 16
   */
  size?: InputSignal<SpinnerSize>;
  /**
   * Specifies the color theme of the spinner.
   * The color should meet accessibility standards for color contrast.
   *
   * @default primary
   */
  color?: InputSignal<SpinnerColor>;
  /**
   * Adds a custom CSS class to the spinner element for additional styling or theming purposes.
   */
  class?: InputSignal<string>;
  /**
   * Provides a text label for screen readers to announce the spinner's purpose or status.
   */
  label?: InputSignal<string>;
}

@Component({
  selector: "tedi-spinner",
  standalone: true,
  templateUrl: "./spinner.component.html",
  styleUrl: "./spinner.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements SpinnerProps {
  size = input<SpinnerSize>(16);
  color = input<SpinnerColor>("primary");
  class = input<string>("");
  label = input<string>("");

  classes = computed(() => {
    const classList = [
      "tedi-spinner",
      `tedi-spinner--size-${this.size()}`,
      `tedi-spinner--color-${this.color()}`,
    ];

    if (this.class()) {
      classList.push(this.class());
    }

    return classList.join(" ");
  });
}
