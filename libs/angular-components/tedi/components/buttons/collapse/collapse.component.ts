import {
  Component,
  input,
  signal,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent, TextComponent } from "@tehik-ee/tedi-angular/tedi";

export type ArrowType = "default" | "secondary";

@Component({
  standalone: true,
  selector: "tedi-collapse",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconComponent, TextComponent],
  templateUrl: "./collapse.component.html",
  styleUrls: ["./collapse.component.scss"],
})
export class CollapseComponent implements AfterViewInit {
  /**
   * The title/header element for the collapsible section.
   * Rendered inside the toggle button.
   * @default "Näita"
   */
  openText = input<string>("Näita");
  /**
   * Text shown on the toggle button when the content is expanded.
   * @default "Peida"
   */
  closeText = input<string>("Peida");
  /**
   * Whether the collapse should be initially open.
   * @default false
   */
  defaultOpen = input<boolean>(false);
  /**
   * To show or hide the openText and closeText.
   * @default "false"
   */
  hideCollapseText = input<boolean>(false);
  /**
   * Option for toggling different arrow styles.
   * @default "default"
   */
  arrowType = input<ArrowType>("default");

  collapseContentId: string = `collapse-content-${self.crypto.randomUUID()}`;
  isOpen = signal<boolean>(false);

  toggleCollapse() {
    this.isOpen.update((prev) => !prev);
  }

  ngAfterViewInit() {
    if (this.defaultOpen()) {
      this.isOpen.set(true);
    }
  }
}
