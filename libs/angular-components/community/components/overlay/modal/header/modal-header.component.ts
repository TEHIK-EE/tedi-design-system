import { Component, input } from "@angular/core";
import { FeedbackTextComponent } from "../../../../../tedi/components/form/feedback-text/feedback-text.component";

@Component({
  selector: "tedi-modal-header",
  templateUrl: "./modal-header.component.html",
  styleUrl: "./modal-header.component.scss",
  imports: [FeedbackTextComponent],
})
export class ModalHeaderComponent {
  title = input("Title");
  description = input<string>();
}
