import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { Component, inject, model, OnInit } from "@angular/core";
import {
  ButtonComponent,
  FeedbackTextComponent,
  IconComponent,
  TextComponent,
} from "tedi/components";
import { ComponentInputs } from "tedi/types";
import { DialogData } from "../modal.component";

@Component({
  selector: "tedi-modal-header",
  templateUrl: "./modal-header.component.html",
  styleUrl: "./modal-header.component.scss",
  imports: [
    FeedbackTextComponent,
    ButtonComponent,
    IconComponent,
    TextComponent,
  ],
})
export class ModalHeaderComponent implements OnInit {
  title = model("Title");
  feedback = model<ComponentInputs<FeedbackTextComponent>>();

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
    const { title, feedback } = data;

    if (title) {
      this.title.set(title);
    }

    if (feedback) {
      this.feedback.set({
        ...feedback,
      });
    }
  }
}
