import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { Component, inject, model, OnInit } from "@angular/core";
import { DialogData } from "../modal.component";
import {
  FeedbackTextComponent,
  TextComponent,
  ClosingButtonComponent,
  ComponentInputs,
} from "@tehik-ee/tedi-angular/tedi";

@Component({
  selector: "tedi-modal-header",
  templateUrl: "./modal-header.component.html",
  styleUrl: "./modal-header.component.scss",
  imports: [FeedbackTextComponent, ClosingButtonComponent, TextComponent],
})
export class ModalHeaderComponent implements OnInit {
  title = model("Title");
  feedback = model<ComponentInputs<FeedbackTextComponent>>();
  closeButton = model(true);

  private readonly dialogRef = inject(DialogRef, { optional: true });
  readonly dialogData = inject(DIALOG_DATA, {
    optional: true,
  });

  public closeModal(): void {
    this.dialogRef?.close();
  }

  ngOnInit(): void {
    const data: DialogData = this.dialogData;
    if (!data) return;

    const { title, feedback, closeButton } = data;

    if (title) {
      this.title.set(title);
    }

    if (feedback) {
      this.feedback.set({
        ...feedback,
      });
    }

    if (typeof closeButton === "boolean") {
      this.closeButton.set(data.closeButton);
    }
  }
}
