import { NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, input } from "@angular/core";
import { ButtonVariant } from "community/components/buttons";
import { ButtonComponent, ButtonSize, IconComponent } from "tedi/components";

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
export class ModalFooterComponent {
  alignButtons = input<string>("flex-end");
  buttons = input<ModalFooterButton[]>(defaultButtons);
  iconPosition = ModalIconPosition;
}
