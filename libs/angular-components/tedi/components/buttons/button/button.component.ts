import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
  AfterContentChecked,
} from "@angular/core";

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
  template: "<ng-content />",
  styleUrl: "./button.component.scss",
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class ButtonComponent implements AfterContentChecked {
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

  private host = inject(ElementRef);
  iconOnly = signal(false);
  iconFirst = signal(false);
  iconLast = signal(false);

  ngAfterContentChecked(): void {
    const hostElement = this.host.nativeElement as HTMLElement;
    const nodes = Array.from(hostElement.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()));
    const nodeCount = nodes.length;
    const iconIndexes = nodes
      .map((node, index) => ({ node, index }))
      .filter(x => x.node.nodeType === Node.ELEMENT_NODE && x.node.nodeName === "TEDI-ICON")
      .map(x => x.index);
    
    const iconCount = iconIndexes.length;
    this.iconOnly.set(nodeCount === 1 && iconCount === 1);
    this.iconFirst.set(iconIndexes.includes(0));
    this.iconLast.set(iconIndexes.includes(nodes.length - 1));
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

    if (!this.iconFirst()) {
      classList.push("tedi-button--pl");
    }

    if (!this.iconLast()) {
      classList.push("tedi-button--pr");
    }

    return classList.join(" ");
  });
}
