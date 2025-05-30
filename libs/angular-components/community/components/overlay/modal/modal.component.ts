import {
  Component,
  inject,
  model,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { DIALOG_DATA, DialogModule, DialogRef } from "@angular/cdk/dialog";
import { ModalHeaderComponent } from "./header/modal-header.component";
import { ModalFooterComponent } from "./footer/modal-footer.component";
import { ComponentInputs } from "tedi/types";

export enum ModalSizes {
  Large = "lg",
  Medium = "md",
  Small = "sm",
}

export type DialogData = ComponentInputs<
  ModalHeaderComponent & ModalFooterComponent
> & {
  maxWidth?: ModalSizes;
};

@Component({
  selector: "tedi-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
  imports: [DialogModule, ModalHeaderComponent, ModalFooterComponent],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class.tedi-modal]": "true",
    "[class.tedi-modal--lg]": "maxWidth() === ModalSizes.Large",
    "[class.tedi-modal--md]": "maxWidth() === ModalSizes.Medium",
    "[class.tedi-modal--sm]": "maxWidth() === ModalSizes.Small",
  },
})
export class ModalComponent implements OnInit {
  readonly maxWidth = model(ModalSizes.Large);
  readonly showFooter = model(true);

  readonly ModalSizes = ModalSizes;

  readonly dialogRef = inject(DialogRef, { optional: true });
  readonly dialogData = inject(DIALOG_DATA, {
    optional: true,
  });

  ngOnInit(): void {
    const data: DialogData = this.dialogData;
    this.dialogRef?.addPanelClass("tedi-modal-panel");

    if (!data) return;

    if (data.maxWidth) {
      this.maxWidth.set(data.maxWidth);
    }
  }
}
