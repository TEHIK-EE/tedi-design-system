import { Component, inject, input, Renderer2, signal } from "@angular/core";
import { IconComponent, TextComponent } from "@tehik-ee/tedi-angular/tedi";

export type ArrowType = "default" | "secondary";

@Component({
  standalone: true,
  selector: "tedi-collapse",
  imports: [IconComponent, TextComponent],
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
   * To show or hide the openText and closeText
   * @default "false"
   */
  hideOpenCloseText = input<boolean>(false);
  /**
   * You are able to toggle different arrow styles.
   * Arrow type "secondary" will add a circle over the icon.
   * @default "default"
   */
  arrowType = input<ArrowType>("secondary");

  collapseContentId: string = `collapse-content-${Math.random().toString(36).substr(2, 9)}`;
  isOpen = signal<boolean>(false);
  renderer = inject(Renderer2);

  toggleCollapse() {
    this.isOpen.update((prev) => !prev);
  }
}
