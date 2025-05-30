import { NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, inject, model, OnInit } from "@angular/core";
import {
  ButtonComponent,
  ButtonSize,
  ButtonVariant,
  IconComponent,
} from "tedi/components";
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

export enum ModalIconPosition {
  None = 0,
  Start = 1 << 0,
  End = 1 << 1,
}

const defaultButtons: ModalFooterButton[] = [
  {
    label: "Cancel",
    variant: "secondary",
    action: () => {},
  },
  {
    label: "Confirm",
    variant: "primary",
    action: () => {},
  },
];

@Component({
  selector: "tedi-modal-footer",
  templateUrl: "./modal-footer.component.html",
  styleUrl: "./modal-footer.component.scss",
  imports: [ButtonComponent, IconComponent, NgFor, NgIf, NgStyle],
})
export class ModalFooterComponent implements OnInit {
  alignButtons = model<string>("flex-end");
  buttons = model<ModalFooterButton[]>(defaultButtons);
  iconPosition = ModalIconPosition;

  readonly dialogData = inject(DIALOG_DATA, {
    optional: true,
  });

  ngOnInit(): void {
    const data: DialogData = this.dialogData;

    if (!data) return;

    const { buttons, alignButtons } = data;
    if (buttons) {
      this.buttons.set(buttons);
    }
    if (alignButtons) {
      this.alignButtons.set(alignButtons);
    }
  }
}
