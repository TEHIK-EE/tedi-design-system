import { Component, inject, input, OnInit } from "@angular/core";
import { DialogModule, DialogRef } from "@angular/cdk/dialog";
import { ModalHeaderComponent } from "./header/modal-header.component";
import { ModalFooterComponent } from "./footer/modal-footer.component";

export enum ModalSizes {
  Large = "lg",
  Medium = "md",
  Small = "sm",
}

@Component({
  selector: "tedi-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
  imports: [DialogModule, ModalHeaderComponent, ModalFooterComponent],
})
export class ModalComponent implements OnInit {
  readonly maxWidth = input(ModalSizes.Large);

  private dialogRef = inject(DialogRef, { optional: true });

  public ngOnInit() {
    // this.dialogRef.
    // this.dialogRef?.updateSize(560);
  }
}
