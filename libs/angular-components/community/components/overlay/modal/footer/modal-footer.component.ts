import { NgStyle } from "@angular/common";
import { Component, inject, model, OnInit } from "@angular/core";
import {
  ButtonComponent,
  ButtonSize,
  ButtonVariant,
  IconComponent,
} from "@tehik-ee/tedi-angular/tedi";
import { DialogData } from "../modal.component";
import { DIALOG_DATA } from "@angular/cdk/dialog";

export interface ModalFooterButton {
  label: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: Record<string, unknown>;
  icon?: string;
  iconPosition?: ModalIconPosition;
  action: () => void;
}

export type ModalIconPosition = "start" | "end";

@Component({
  selector: "tedi-modal-footer",
  templateUrl: "./modal-footer.component.html",
  styleUrl: "./modal-footer.component.scss",
  imports: [ButtonComponent, IconComponent, NgStyle],
})
export class ModalFooterComponent implements OnInit {
  align = model<string>("flex-end");
  buttons = model<ModalFooterButton[]>();

  readonly dialogData = inject(DIALOG_DATA, {
    optional: true,
  });

  ngOnInit(): void {
    const data: DialogData = this.dialogData;

    if (!data) return;

    const { buttons, align: alignButtons } = data;
    if (buttons) {
      this.buttons.set(buttons);
    }
    if (alignButtons) {
      this.align.set(alignButtons);
    }
  }
}
