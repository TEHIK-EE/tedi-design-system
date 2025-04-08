import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";

export type FeedbackTextType = "valid" | "error" | "hint";

@Component({
  selector: "tedi-feedback-text",
  standalone: true,
  template: `{{ text() }}`,
  styleUrl: "./feedback-text.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-feedback-text]": "true",
    "[class]": "modifierClasses()",
  },
})
export class FeedbackTextComponent {
  /**
   * Helper text
   */
  text = input.required<string>();

  /**
   * Type of form-helper.
   * @default hint
   */
  type = input<FeedbackTextType>("hint");

  modifierClasses = computed(() => {
    const modifiers = [];
    if (this.type()) modifiers.push(`tedi-feedback-text--type--${this.type()}`);
    return modifiers.join(" ");
  });
}
