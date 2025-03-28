import {
  AfterViewInit,
  Directive,
  ElementRef,
  input,
  Renderer2,
} from "@angular/core";
import type { VerticalSpacingSize } from "./vertical-spacing.directive";

@Directive({
  selector: "[tediVerticalSpacingItem]",
  standalone: true,
})
export class VerticalSpacingItemDirective implements AfterViewInit {
  tediVerticalSpacingItem = input<VerticalSpacingSize>(0);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    this.renderer.addClass(
      this.el.nativeElement,
      "tedi-vertical-spacing__item",
    );
    this.renderer.setAttribute(
      this.el.nativeElement,
      "data-name",
      "vertical-spacing-item",
    );

    const spacingValue = `${this.tediVerticalSpacingItem()}rem`;

    this.renderer.setAttribute(
      this.el.nativeElement,
      "style",
      `--vertical-spacing-internal: ${spacingValue}`,
    );
  }
}
