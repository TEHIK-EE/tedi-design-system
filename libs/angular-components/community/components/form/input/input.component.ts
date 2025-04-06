import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type inputSize = "small" | "default";
export type inputState = "valid" | "error" | "default";

@Component({
  selector: "[tedi-input]",
  standalone: true,
  template: "<ng-content />",
  styleUrl: "./input.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-input]": "true",
    "[class]": "modifierClasses()",
  },
})
export class InputComponent {
  /**
   * Size of the input.
   * @default default
   */
  size = input<inputSize>("default");

  modifierClasses = computed(() => {
    const modifiers = [];
    if (this.size()) {
      modifiers.push(`tedi-input--size--${this.size()}`);
    }
    return modifiers.join(" ");
  });
}
