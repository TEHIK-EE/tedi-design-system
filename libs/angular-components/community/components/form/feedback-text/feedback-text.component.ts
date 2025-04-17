import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type FeedbackTextType = "hint" | "valid" | "error";
export type FeedbackTextPosition = "left" | "right";

@Component({
  selector: "tedi-feedback-text",
  standalone: true,
  templateUrl: "./feedback-text.component.html",
  styleUrl: "./feedback-text.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
    "[attr.role]": "role()",
    "[attr.aria-live]": "ariaLive()",
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
  /**
   * Position of the helper.
   * @default left
   */
  position = input<FeedbackTextPosition>("left");

  role = computed(() => {
    if (this.type() === "valid" || this.type() === "error") {
      return "alert";
    }

    return undefined;
  });

  ariaLive = computed(() => {
    if (this.type() === "error" || this.type() === "valid") {
      return "assertive";
    }

    return "polite";
  });

  classes = computed(() => {
    return `tedi-feedback-text tedi-feedback-text--${this.type()} tedi-feedback-text--${this.position()}`;
  });
}
