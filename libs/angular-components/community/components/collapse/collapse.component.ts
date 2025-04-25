import {
  Component,
  inject,
  input,
  Renderer2,
  signal,
  AfterViewInit,
} from "@angular/core";
import { IconComponent, TextComponent } from "@tehik-ee/tedi-angular/tedi";

export type ArrowType = "default" | "secondary";

@Component({
  standalone: true,
  selector: "tedi-collapse",
  imports: [IconComponent, TextComponent],
  templateUrl: "./collapse.component.html",
  styleUrls: ["./collapse.component.scss"],
})
export class CollapseComponent implements AfterViewInit {
  /**
   * The title/header element for the collapsible section.
   * Rendered inside the toggle button.
   * @default "Open"
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
   * To show or hide the openText and closeText.
   * @default "false"
   */
  hideOpenCloseText = input<boolean>(false);
  /**
   * Option for toggling different arrow styles.
   * @default "default"
   */
  arrowType = input<ArrowType>("default");

  collapseContentId: string = `collapse-content-${Math.random().toString(36).substr(2, 9)}`;
  isOpen = signal<boolean>(false);
  renderer = inject(Renderer2);

  toggleCollapse() {
    this.isOpen.update((prev) => !prev);
  }

  ngAfterViewInit() {
    if (this.defaultOpen()) {
      this.isOpen.set(true);
    }
  }
}
