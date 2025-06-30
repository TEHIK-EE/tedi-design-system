import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
  contentChildren,
  AfterContentChecked,
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

  icons = contentChildren(IconComponent);
  private host = inject(ElementRef);
  iconOnly = signal(false);

  ngAfterContentChecked(): void {
    const hostElement = this.host.nativeElement as HTMLElement;
    const nodeCount = hostElement.childNodes.length;
    const iconCount = this.icons().length;

    this.iconOnly.set(nodeCount === 1 && iconCount === 1);
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
