import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type InputSize = "small" | "default";
export type InputState = "valid" | "error" | "default";

@Component({
  selector: "input[tedi-input]",
  standalone: true,
  styleUrl: "./input.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "classes()",
  },
})
export class InputComponent {
  /**
   * Size of the input.
   * @default default
   */
  size = input<InputSize>("default");
  /**
   * State of the input.
   * @default default
   */
  state = input<InputState>("default");
  /**
   * Name of the icon which is shown at the end of the input.
   */
  icon = input<string>("");

  classes = computed(() => {
    const classList = [
      "tedi-input",
      `tedi-input--size-${this.size()}`,
      `tedi-input--state-${this.state()}`,
    ];
    return classList.join(" ");
  });
}
