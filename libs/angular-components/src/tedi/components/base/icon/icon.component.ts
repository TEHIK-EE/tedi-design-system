import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
} from "@angular/core";

export type IconSize = 8 | 12 | 16 | 18 | 24 | 36 | 48;
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

type IconProps = {
  /**
   * Name of the Material Icon
   * https://fonts.google.com/icons
   */
  name: InputSignal<string>;
  /**
   * Additional CSS classes to apply to the icon.
   */
  class?: InputSignal<string | undefined>;
  /**
   * Size of the icon in pixels.
   * @default 24
   */
  size: InputSignal<IconSize>;
  /**
   * Color of the icon.
   * @default primary
   */
  color?: InputSignal<IconColor>;
  /**
   * Background color for the icon (adds a circular background).
   */
  background?: InputSignal<IconBackgroundColor | undefined>;
  /**
   * Whether the icon should be filled or outlined.
   * @default outlined
   */
  variant?: InputSignal<IconVariant>;
  /**
   * Type of Material Symbols icon style.
   * It is recommended to only use one type throughout your app.
   * @default outlined
   */
  type?: InputSignal<IconType>;
  /**
   * Accessible label for screen readers.
   * If omitted then the icon is hidden for screen-readers.
   */
  label?: InputSignal<string | undefined>;
};

@Component({
  selector: "tedi-icon",
  standalone: true,
  templateUrl: "./icon.component.html",
  styleUrl: "./icon.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements IconProps {
  name = input.required<string>();
  class = input<string | undefined>(undefined);
  size = input<IconSize>(24);
  color = input<IconColor>("primary");
  background = input<IconBackgroundColor | undefined>(undefined);
  variant = input<IconVariant>("outlined");
  type = input<IconType>("outlined");
  label = input<string | undefined>(undefined);

  iconClasses = computed(() => {
    const type = this.type();
    const variant = this.variant();
    const color = this.color();
    const background = this.background();
    const className = this.class();
    let size = this.size();

    if (background) {
      size = [16, 24].includes(size) ? size : 24;
    }

    const classes: string[] = [
      "notranslate",
      "material-symbols",
      `material-symbols--${type}`,
      "tedi-icon",
      `tedi-icon--color-${color}`,
      `tedi-icon--size-${size}`,
    ];

    if (background) {
      classes.push("tedi-icon--bg", `tedi-icon--bg-${background}`);
    }

    if (variant === "filled") {
      classes.push("tedi-icon--filled");
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  });
}
