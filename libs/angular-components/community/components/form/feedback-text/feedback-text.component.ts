import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { InputsWithSignals } from "@tehik-ee/tedi-angular/tedi";

export type FeedbackTextType = "hint" | "valid" | "error";
export type FeedbackTextPosition = "left" | "right";
export type FeedbackTextInputs = {
  /**
   * Helper text
   */
  text: string;
  /**
   * Type of form-helper.
   * @default help
   */
  type: FeedbackTextType;
  /**
   * Position of the helper.
   * @default left
   */
  position: FeedbackTextPosition;
};

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
export class FeedbackTextComponent
  implements InputsWithSignals<FeedbackTextInputs> {
  text = input.required<string>();
  type = input<FeedbackTextType>("hint");
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
