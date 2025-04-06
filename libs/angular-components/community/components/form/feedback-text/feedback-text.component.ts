import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from "@angular/core";

export type feedbackTextType = "valid" | "error" | "hint";

@Component({
  selector: "tedi-feedback-text",
  standalone: true,
  template: `<span class="tedi-text--small">{{ text() }}</span>`,
  styleUrl: "./feedback-text.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-feedback-text]": "true",
  },
})
export class FeedbackTextComponent {
  /**
   * Helper text
   */
  text = signal<string>("Helper text");

  /**
   * Type of form-helper.
   * @default help
   */
  type = signal<feedbackTextType>("hint");
}
