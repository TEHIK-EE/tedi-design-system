import { Component, computed, input, ViewEncapsulation } from "@angular/core";
import { IconColor, IconComponent } from "@tehik-ee/tedi-angular/tedi";

// StatusBadgeColor, StatusBadgeVariant, StatusBadgeSize, StatusBadgeStatus are identical to libs/react-components/src/tedi/components/tags/status-badge/status-badge.tsx,
// redo to use shared constants when possible

export type StatusBadgeColor =
  | "neutral"
  | "brand"
  | "accent"
  | "success"
  | "danger"
  | "warning"
  | "transparent";
export type StatusBadgeVariant = "filled" | "filled-bordered" | "bordered";
export type StatusBadgeSize = "default" | "large";
export type StatusBadgeStatus = "danger" | "success" | "warning" | "inactive";

@Component({
  selector: "[tedi-status-badge]",
  templateUrl: "./status-badge.component.html",
  styleUrl: "./status-badge.component.scss",
  imports: [IconComponent],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
    "[attr.title]": "title()",
    "[attr.id]": "id()",
    "[attr.role]": "role()",
    "[attr.aria-live]": "ariaLive()",
    "[attr.aria-label]": "title()",
  },
})
export class StatusBadgeComponent {
  /**
   * Additional classes to apply custom styles to the StatusBadge.
   */
  className = input<string>();
  /**
   * Provides the full text or description when the Badge represents an abbreviation.
   * This is typically shown as a tooltip on hover.
   */
  title = input<string>();
  /**
   * ID attribute
   */
  id = input<string>();
  /**
   * ARIA role attribute for accessibility.
   */
  role = input<string>();
  /**
   * Specifies the color scheme of the StatusBadge.
   * @default default
   */
  color = input<StatusBadgeColor>("neutral");
  /**
   * Determines the style or visual type of the StatusBadge.
   * @default filled
   */
  variant = input<StatusBadgeVariant>("filled");
  /**
   * Specifies the size of the StatusBadge.
   * @default default
   */
  size = input<StatusBadgeSize>("default");
  /**
   * StatusBadge status indicator
   */
  status = input<StatusBadgeStatus>("inactive");
  /**
   * The name of the icon to be displayed inside the StatusBadge. The icon is rendered using the `Icon` component.
   */
  icon = input<string>("");

  classes = computed(() => {
    const classList = ["tedi-status-badge"];
    if (this.color()) {
      classList.push(`tedi-status-badge--color-${this.color()}`);
    }

    if (this.variant()) {
      classList.push(`tedi-status-badge--variant-${this.variant()}`);
    }

    if (this.status()) {
      classList.push(
        "tedi-status-badge--status",
        `tedi-status-badge--status-${this.status()}`
      );
    }
    if (this.size() === "large") {
      classList.push("tedi-status-badge--large");
    }
    if (this.icon() && !this.title()) {
      classList.push("tedi-status-badge__icon-only");
    }
    if (this.className()) {
      classList.push(this.className()!);
    }
    return classList.join(" ");
  });

  ariaLive = computed(() => {
    switch (this.role()) {
      case "alert":
        return "assertive";
      case "status":
        return "polite";
      default:
        return undefined;
    }
  });

  mapBadgeColorToIconColor = computed((): IconColor => {
    switch (this.color()) {
      case "brand":
        return "brand-dark";
      case "success":
        return "success";
      case "accent":
        return "secondary";
      case "danger":
        return "danger";
      case "warning":
        return "warning-dark";
      default:
        return "primary";
    }
  });
}
