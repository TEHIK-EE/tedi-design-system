import { Component, input, signal } from "@angular/core";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";
@Component({
  selector: "tedi-collapse",
  imports: [IconComponent],
  templateUrl: "./collapse.component.html",
  styleUrls: ["./collapse.component.scss"],
})
export class CollapseComponent {
  /**
   * The title/header element for the collapsible section.
   * Rendered inside the toggle button.
   */
  openText = input<string>("Open");
  /**
   * Text shown on the toggle button when the content is expanded.
   * @default "Close"
   */
  closeText = input<string>("Close");
  /**
   * Whether the collapse should be initially open.
   * @default false
   */
  defaultOpen = input<boolean>(false);
  /**
   * Whether the collapse is open or closed.
   * @default false
   */
  isOpen = signal<boolean>(false);

  toggleCollapse() {
    this.isOpen.update((prev) => !prev);
  }
}
