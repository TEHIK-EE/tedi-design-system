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
    private readonly el: ElementRef, // eslint-disable-line no-unused-vars
    private readonly renderer: Renderer2, // eslint-disable-line no-unused-vars
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
