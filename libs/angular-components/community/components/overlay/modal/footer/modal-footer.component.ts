import { NgFor, NgStyle } from "@angular/common";
import { Component, input } from "@angular/core";
import { ButtonVariant } from "community/components/buttons";
import { ButtonComponent, ButtonSize } from "tedi/components";

export interface ModalFooterButton {
  label: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  action: () => void;
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
  imports: [ButtonComponent, NgFor, NgStyle],
})
export class ModalFooterComponent {
  alignButtons = input<string>("flex-end");
  buttons = input<ModalFooterButton[]>(defaultButtons);
}
