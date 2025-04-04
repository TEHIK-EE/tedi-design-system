import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type labelSize = "small" | "default";

@Component({
  selector: "[tedi-label]",
  imports: [],
  templateUrl: "./label.component.html",
  styleUrl: "./label.component.scss",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-label]": "true",
    "[class.tedi-label--required]": "required()",
    "[class]": "modifierClasses()",
  },
})
export class LabelComponent {
  /**
   * Size of the label.
   * @default default
   */
  size = input<labelSize>("default");
  /**
   * Whether label is required.
   * @default false
   */
  required = input<boolean>(false);

  modifierClasses = computed(() => {
    const modifiers = [];
    if (this.size()) {
      modifiers.push(`tedi-label--size--${this.size()}`);
    }
    return modifiers.join(" ");
  });
}
