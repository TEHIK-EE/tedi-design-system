import { DialogRef } from "@angular/cdk/dialog";
import { Component, inject, input } from "@angular/core";
import {
  ButtonComponent,
  FeedbackTextComponent,
  IconComponent,
} from "tedi/components";

@Component({
  selector: "tedi-modal-header",
  templateUrl: "./modal-header.component.html",
  styleUrl: "./modal-header.component.scss",
  imports: [FeedbackTextComponent, ButtonComponent, IconComponent],
})
export class ModalHeaderComponent {
  title = input("Title");
  description = input<string>();

  private dialogRef = inject(DialogRef, { optional: true });

  public closeModal(): void {
    this.dialogRef?.close();
  }
}
