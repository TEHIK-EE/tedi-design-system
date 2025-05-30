import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewEncapsulation,
} from "@angular/core";
import { BreakpointInputs, BreakpointService } from "../../../services/breakpoint/breakpoint.service";
import { IconComponent } from "../../base/icon/icon.component";

export type LinkVariant = "default" | "inverted";
export type LinkSize = "default" | "small";
export type LinkInputs = {
  /**
   * Variant of the link.
   * @default default
   */
  variant: LinkVariant;
  /**
   * Size of the link.
   * @default default
   */
  size: LinkSize;
  /**
   * Does link have underline?
   * @default true
   */
  underline: boolean;
};

@Component({
  selector: "[tedi-link]",
  standalone: true,
  templateUrl: "./link.component.html",
  styleUrl: "./link.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
    "[attr.tabIndex]": "0",
  },
})
export class LinkComponent implements BreakpointInputs<LinkInputs>, AfterContentInit {
  variant = input<LinkVariant>("default");
  size = input<LinkSize>("default");
  underline = input<boolean>(true);

  xs = input<LinkInputs>();
  sm = input<LinkInputs>();
  md = input<LinkInputs>();
  lg = input<LinkInputs>();
  xl = input<LinkInputs>();
  xxl = input<LinkInputs>();

  private host = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngAfterContentInit(): void {
    const childNodes: ChildNode[] = Array.from(this.host.nativeElement.childNodes);
    
    for (const node of childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const span = this.renderer.createElement('span') as HTMLSpanElement;

        const textNode = this.renderer.createText(node.textContent.trim());
        this.renderer.appendChild(span, textNode);
        this.renderer.insertBefore(this.host.nativeElement, span, node);
        this.renderer.removeChild(this.host.nativeElement, node);
      }
    }
  }

  breakpointService = inject(BreakpointService);
  breakpointInputs = computed(() => {
    return this.breakpointService.getBreakpointInputs<LinkInputs>({
      variant: this.variant(),
      size: this.size(),
      underline: this.underline(),

      xs: this.xs(),
      sm: this.sm(),
      md: this.md(),
      lg: this.lg(),
      xl: this.xl(),
      xxl: this.xxl(),
    });
  });

  classes = computed(() => {
    const classList = ["tedi-link"];

    if (this.breakpointInputs().variant === "inverted") {
      classList.push("tedi-link--inverted");
    }

    if (this.breakpointInputs().size === "small") {
      classList.push("tedi-link--small");
    }

    if (!this.breakpointInputs().underline) {
      classList.push("tedi-link--no-underline");
    }

    return classList.join(" ");
  });
}
