import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { ClosingButtonComponent } from "../buttons/closing-button/closing-button.component";

export type AlertRole = "alert" | "status" | "none";
export type AlertType = "info" | "success" | "warning" | "danger";
export type AlertTitleType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "div"
  | "strong";
export type AlertVariant = "default" | "global" | "noSideBorders";

@Component({
  standalone: true,
  selector: "tedi-alert",
  imports: [CommonModule, IconComponent, ClosingButtonComponent],
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements AfterViewInit {
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

  @ViewChild("alertTitle", { static: true })
  headingAnchor!: ElementRef<HTMLElement>;
  renderer = inject(Renderer2);

  ngAfterViewInit() {
    if (this.title()) {
      const headingTag = this.titleElement();
      const headingElement = this.renderer.createElement(headingTag);

      this.renderer.setAttribute(headingElement, "tedi-text", "");
      this.renderer.addClass(headingElement, "tedi-alert__title__text");

      const text = this.renderer.createText(this.title()!);

      this.renderer.appendChild(headingElement, text);
      this.renderer.appendChild(
        this.headingAnchor.nativeElement,
        headingElement,
      );
    }
  }

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
      "tedi-alert--global": this.variant() === "global",
      "tedi-alert--no-side-borders": this.variant() === "noSideBorders",
    };
  });
}
