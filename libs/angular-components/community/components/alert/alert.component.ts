import { Component, computed, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextComponent, IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { ClosingButtonComponent } from "../buttons/closing-button/closing-button.component";

export type AlertRole = "alert" | "status" | "none";
export type AlertType = "info" | "success" | "warning" | "danger";

@Component({
  standalone: true,
  selector: "tedi-alert",
  imports: [CommonModule, TextComponent, IconComponent, ClosingButtonComponent],
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
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
   * Can be a string (icon name) or an object with additional `IconProps` to further customize the icon.
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
   * Indicates that the alert is intended to span the full width of the page,
   * typically for critical or prominent messages.
   * @default false
   */
  isGlobal = input<boolean>();
  /**
   * Removes the side borders from the alert for a cleaner appearance.
   * This also sets the border radius to 0.
   * @default false
   */
  noSideBorders = input<boolean>();
  ariaLive = signal<string>(
    this.role() === "alert"
      ? "assertive"
      : this.role() === "status"
        ? "polite"
        : "off",
  );

  ariaLabel = signal<string>(
    this.title()
      ? `${this.type()} alert: ${this.title()}`
      : `${this.type()} alert`,
  );

  classes = computed(() => {
    return {
      "tedi-alert": true,
      [`tedi-alert--${this.type()}`]: !!this.type(),
      "tedi-alert--global": this.isGlobal(),
      "tedi-alert--no-side-borders": this.noSideBorders(),
    };
  });
}
