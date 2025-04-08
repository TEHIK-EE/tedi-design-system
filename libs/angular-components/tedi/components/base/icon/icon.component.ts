import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { InputsWithSignals } from "../../../types/inputs.type";

const ICON_WITH_BACKGROUND = [16, 24];

export type IconSize = 8 | 12 | 16 | 18 | 24 | 36 | 48 | "inherit";
export type IconVariant = "filled" | "outlined";
export type IconType = "outlined" | "sharp" | "rounded";
export type IconColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "brand"
  | "brand-dark"
  | "success"
  | "warning"
  | "warning-dark"
  | "danger"
  | "white";
export type IconBackgroundColor =
  | "primary"
  | "secondary"
  | "brand-primary"
  | "brand-secondary";

export type IconInputs = {
  /**
   * Name of the Material Icon
   * https://fonts.google.com/icons
   */
  name: string;
  /**
   * Size of the icon in pixels.
   * @default 24
   */
  size: IconSize;
  /**
   * Color of the icon.
   * @default primary
   */
  color: IconColor;
  /**
   * Background color for the icon (adds a circular background).
   */
  background?: IconBackgroundColor;
  /**
   * Whether the icon should be filled or outlined.
   * @default outlined
   */
  variant: IconVariant;
  /**
   * Type of Material Symbols icon style.
   * It is recommended to only use one type throughout your app.
   * @default outlined
   */
  type: IconType;
  /**
   * Accessible label for screen readers.
   * If omitted then the icon is hidden for screen-readers.
   */
  label?: string;
};

@Component({
  selector: "tedi-icon",
  standalone: true,
  templateUrl: "./icon.component.html",
  styleUrl: "./icon.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
    "role": "img",
    "[attr.aria-label]": "label()",
    "[attr.aria-hidden]": "!label()"
  }
})
export class IconComponent implements InputsWithSignals<IconInputs> {
  name = input.required<string>();
  size = input<IconSize>(24);
  color = input<IconColor>("primary");
  background = input<IconBackgroundColor>();
  variant = input<IconVariant>("outlined");
  type = input<IconType>("outlined");
  label = input<string>();

  classes = computed(() => {
    let size = this.size();

    if (this.background()) {
      if (size === "inherit") {
        size = 24;
      } else {
        size = ICON_WITH_BACKGROUND.includes(size) ? size : 24;
      }
    }

    const classes: string[] = [
      "notranslate",
      "material-symbols",
      `material-symbols--${this.type()}`,
      "tedi-icon",
      `tedi-icon--color-${this.color()}`,
      `tedi-icon--size-${size}`,
    ];

    if (this.background()) {
      classes.push("tedi-icon--bg", `tedi-icon--bg-${this.background()}`);
    }

    if (this.variant() === "filled") {
      classes.push("tedi-icon--filled");
    }

    return classes.join(" ");
  });
}
