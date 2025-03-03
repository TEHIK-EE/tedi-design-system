import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "danger"
  | "danger-neutral";

export type ButtonSize = "md" | "sm";

@Component({
  selector: "button[tedi-button]",
  standalone: true,
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-btn]": "true",
    "[class.tedi-btn--inverted]": "inverted()",
    "[class.tedi-btn--full-width]": "fullWidth()",
    "[class]": "modifierClasses()",
  },
})
export class ButtonComponent {
  variant = input<ButtonVariant>("primary");
  size = input<ButtonSize>("md");
  inverted = input<boolean>();
  fullWidth = input<boolean>();

  modifierClasses = computed(() => {
    return `tedi-btn--${this.variant()} tedi-btn--${this.size()}`;
  });
}
