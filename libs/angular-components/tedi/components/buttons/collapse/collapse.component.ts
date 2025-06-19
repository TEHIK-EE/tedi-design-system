import {
  Component,
  input,
  signal,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  Renderer2,
} from "@angular/core";
import { TediTranslationPipe } from "../../../services/translation/translation.pipe";
import { IconComponent } from "../../base/icon/icon.component";
import { TextComponent } from "../../base/text/text.component";
import { generateUUID } from "../../../helpers/generate-uuid";

export type ArrowType = "default" | "secondary";

@Component({
  standalone: true,
  selector: "tedi-collapse",
  imports: [IconComponent, TextComponent, TediTranslationPipe],
  templateUrl: "./collapse.component.html",
  styleUrls: ["./collapse.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CollapseComponent implements AfterViewInit {
  /**
   * The title/header element for the collapsible section.
   * Rendered inside the toggle button.
   */
  openText = input<string>();
  /**
   * Text shown on the toggle button when the content is expanded.
   */
  closeText = input<string>();
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

  renderer = inject(Renderer2);
  collapseContentId: string = `collapse-content-${generateUUID()}`;
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
