import { Component, inject, input } from "@angular/core";
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
  host: {
    "[class.tedi-modal]": "true",
    "[class.tedi-modal--lg]": "maxWidth() === ModalSizes.Large",
    "[class.tedi-modal--md]": "maxWidth() === ModalSizes.Medium",
    "[class.tedi-modal--sm]": "maxWidth() === ModalSizes.Small",
  },
})
export class ModalComponent {
  readonly maxWidth = input(ModalSizes.Large);
  readonly ModalSizes = ModalSizes;

  private dialogRef = inject(DialogRef, { optional: true });

  // public ngOnInit() {
  //   // this.dialogRef?.updateSize(560);
  // }
}
