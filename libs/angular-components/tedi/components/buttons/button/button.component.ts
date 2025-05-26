import {
  Component,
  computed,
  ContentChildren,
  ElementRef,
  inject,
  input,
  QueryList,
  Renderer2,
  signal,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { IconComponent } from "../../base/icon/icon.component";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "danger"
  | "danger-neutral"
  | "primary-inverted"
  | "secondary-inverted"
  | "neutral-inverted";

export type ButtonSize = "default" | "small";

@Component({
  selector: "[tedi-button]",
  standalone: true,
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class ButtonComponent implements AfterViewInit, OnDestroy {
  /**
   * Specifies the color theme of the button. The color should meet accessibility standards for color contrast.
   * @default primary
   */
  variant = input<ButtonVariant>("primary");
  /**
   * Defines the size of the button.
   * @default default
   */
  size = input<ButtonSize>("default");

  @ContentChildren(IconComponent, { descendants: true, read: ElementRef })
  icons!: QueryList<ElementRef>;

  private iconOnly = signal(false);
  private host = inject(ElementRef);
  private renderer = inject(Renderer2);

  private observer: MutationObserver | null = null;

  ngAfterViewInit(): void {
    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const span = this.renderer.createElement("span") as HTMLSpanElement;
            const textNode = this.renderer.createText(node.textContent.trim());

            this.renderer.appendChild(span, textNode);
            this.renderer.insertBefore(this.host.nativeElement, span, node);
            this.renderer.removeChild(this.host.nativeElement, node);
          }
        }
      }

      const childNodes: ChildNode[] = Array.from(
        this.host.nativeElement.childNodes,
      );
      const elements = childNodes.filter(
        (node) => node.nodeType === Node.ELEMENT_NODE,
      );
      const hasText = childNodes.some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );

      if (elements.length === 1 && this.icons.length === 1 && !hasText) {
        this.iconOnly.set(true);
      }
    });

    this.observer.observe(this.host.nativeElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  classes = computed(() => {
    const classList = [
      "tedi-button",
      `tedi-button--${this.variant()}`,
      `tedi-button--${this.size()}`,
    ];

    if (this.iconOnly()) {
      classList.push("tedi-button--icon-only");
    }

    return classList.join(" ");
  });
}
