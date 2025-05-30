import { DialogRef } from "@angular/cdk/dialog";
import { Component, inject, input } from "@angular/core";
import {
  ButtonComponent,
  FeedbackTextComponent,
  IconComponent,
  TextComponent,
} from "tedi/components";
import { ComponentInputs } from "tedi/types";

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
export class ModalHeaderComponent {
  title = input("Title");
  feedback = input<ComponentInputs<FeedbackTextComponent>>();

  private dialogRef = inject(DialogRef, { optional: true });

  public closeModal(): void {
    this.dialogRef?.close();
  }
}
