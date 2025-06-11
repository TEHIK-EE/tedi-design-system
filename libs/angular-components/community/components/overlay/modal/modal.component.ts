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
import { ComponentInputs } from "@tehik-ee/tedi-angular/tedi";

export type ModalSizes = "lg" | "md" | "sm";

export type DialogData = ComponentInputs<
  ModalHeaderComponent & ModalFooterComponent
> & {
  maxWidth?: ModalSizes;
  variant?: "default" | "small";
};

@Component({
  selector: "tedi-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
  imports: [DialogModule],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class.tedi-modal]": "true",
    "[class.tedi-modal--lg]": "maxWidth() === 'lg'",
    "[class.tedi-modal--md]": "maxWidth() === 'md'",
    "[class.tedi-modal--sm]": "maxWidth() === 'sm'",
    "[class.tedi-modal--small]": "variant() === 'small'",
  },
})
export class ModalComponent implements OnInit {
  readonly maxWidth = model<ModalSizes>("sm");
  readonly variant = model<"default" | "small">("default");

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
    if (data.variant) {
      this.variant.set(data.variant);
    }
  }
}
