import {
  Component,
  inject,
  input,
  Renderer2,
  signal,
  AfterViewInit,
  ChangeDetectionStrategy,
  computed,
} from "@angular/core";
import { IconComponent, TextComponent, TranslationService } from "@tehik-ee/tedi-angular/tedi";

export type ArrowType = "default" | "secondary";

@Component({
  standalone: true,
  selector: "tedi-collapse",
  imports: [IconComponent, TextComponent],
  templateUrl: "./collapse.component.html",
  styleUrls: ["./collapse.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapseComponent implements AfterViewInit {
  /**
   * The title/header element for the collapsible section.
   * Rendered inside the toggle button.
   * @default "Ava"
   */
  openText = input<string>();
  /**
   * Text shown on the toggle button when the content is expanded.
   * @default "Sulge"
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
  translationService = inject(TranslationService);

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

  textOpen = computed(() => this.openText() ?? this.translationService.translate("open"))
  textClose = computed(() => this.closeText() ?? this.translationService.translate("close"))
}
