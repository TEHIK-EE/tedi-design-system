import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from "@angular/core";
import { IconColor, IconComponent } from "@tehik-ee/tedi-angular/tedi";

export type ToggleVariant = "primary" | "colored";
export type ToggleType = "filled" | "outlined";
export type ToggleSize = "default" | "large";

@Component({
  selector: "tedi-toggle",
  standalone: true,
  templateUrl: "./toggle.component.html",
  styleUrl: "./toggle.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  host: {
    "[class]": "classes()",
  },
})
export class ToggleComponent {
  /**
   * Color variant of the toggle
   * @default primary
   */
  variant = input<ToggleVariant>("primary");
  /**
   * Type of the toggle
   * @default filled
   */
  type = input<ToggleType>("filled");
  /**
   * Size of the toggle
   * @default default
   */
  size = input<ToggleSize>("default");
  /**
   * Should the toggle show lock icon. Works only with large toggle.
   * @default false
   */
  icon = input<boolean>(false);
  /**
   * Value of the toggle. Supports two-way binding, use with form controls.
   */
  value = model<boolean>(false);

  classes = computed(() => {
    return [
      "tedi-toggle",
      `tedi-toggle--${this.variant()}-${this.type()}`,
      `tedi-toggle--size-${this.size()}`,
    ].join(" ");
  });

  iconColor = computed<IconColor>(() => {
    if (this.type() === "outlined") {
      return 'white';
    }

    switch (this.variant()) {
      case "primary":
        return this.value() ? "brand": "tertiary";
      case "colored":
        return this.value() ? "success" : "danger";
    }
  });

  handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value.set(target.checked);
  }
}
