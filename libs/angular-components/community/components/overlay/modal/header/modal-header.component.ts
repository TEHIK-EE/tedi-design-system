import { Component, input } from "@angular/core";
import { ButtonComponent, FeedbackTextComponent } from "tedi/components";

@Component({
  selector: "tedi-modal-header",
  templateUrl: "./modal-header.component.html",
  styleUrl: "./modal-header.component.scss",
  imports: [FeedbackTextComponent, ButtonComponent],
})
export class ModalHeaderComponent {
  title = input("Title");
  description = input<string>();
}
