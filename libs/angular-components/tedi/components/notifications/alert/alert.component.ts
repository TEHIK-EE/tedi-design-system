import {
  Component,
  computed,
  input,
  model,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent } from "../../base/icon/icon.component";
import { ClosingButtonComponent } from "../../buttons/closing-button/closing-button.component";
import { NgTemplateOutlet } from "@angular/common";

export type AlertRole = "alert" | "status" | "none";
export type AlertType = "info" | "success" | "warning" | "danger";
export type AlertTitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
export type AlertVariant = "default" | "global" | "noSideBorders";

@Component({
  standalone: true,
  selector: "tedi-alert",
  imports: [IconComponent, ClosingButtonComponent, NgTemplateOutlet],
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[style.display]": "open() ? 'flex' : 'none'",
    "[attr.aria-live]": "getAriaLive()",
    "[attr.aria-label]": "getAriaLabel()",
    "[class]": "classes()",
    "[attr.role]": "role() === 'none' ? null : role()",
  },
})
export class AlertComponent {
  /**
   * An optional title for the alert, typically used to summarize the message's purpose.
   * If provided, it appears prominently at the top of the alert.
   */
  title = input<string>();
  /**
   * Defines the visual and contextual type of the alert. This determines the icon, color, and
   * overall style, making it clear whether the alert is informational, a success message,
   * a warning, or an error.
   * @default info
   */
  type = input<AlertType>("info");
  /**
   * Specifies an optional icon to display in the alert, providing quick visual context.
   */
  icon = input<string>("");
  /**
   * If true, a close button will be displayed.
   * @default false
   */
  showClose = input<boolean>(false);
  /**
   * The ARIA role of the alert, informing screen readers about the alert's purpose.
   * Options:
   * - 'alert': For high-priority messages that demand immediate attention.
   * - 'status': For less urgent messages providing feedback or updates.
   * - 'none': Used when no ARIA role is needed.
   * @default alert
   */
  role = input<AlertRole>("alert");
  /**
   * Variant for the alert, which can be used to apply specific styles.
   * For example, 'global' for full-width alerts or 'noSideBorders' for alerts without side borders.
   */
  variant = input<AlertVariant>("default");
  /**
   * The HTML tag to be used for the alert title.
   * @default h2
   */
  titleElement = input<AlertTitleType>("h2");
  /**
   * Is alert open?
   * @default true
   */
  open = model(true);

  getAriaLive = computed(() => {
    switch (this.role()) {
      case "alert":
        return "assertive";
      case "status":
        return "polite";
      case "none":
        return "off";
    }
  });

  getAriaLabel = computed(() => {
    if (this.title()) {
      return `${this.type()} alert: ${this.title()}`;
    }
    return `${this.type()} alert`;
  });

  classes = computed(() => {
    return {
      "tedi-alert": true,
      [`tedi-alert--${this.type()}`]: !!this.type(),
      "tedi-alert--global": this.variant() === "global",
      "tedi-alert--no-side-borders": this.variant() === "noSideBorders",
    };
  });

  handleClose() {
    this.open.set(false);
  }
}
