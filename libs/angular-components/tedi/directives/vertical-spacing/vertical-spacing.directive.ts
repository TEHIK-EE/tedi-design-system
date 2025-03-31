import {
  AfterViewInit,
  Directive,
  ElementRef,
  input,
  Renderer2,
} from "@angular/core";

export type VerticalSpacingSize =
  | 0
  | 0.25
  | 0.5
  | 0.75
  | 1
  | 1.25
  | 1.5
  | 1.75
  | 2
  | 2.5
  | 3
  | 4
  | 5;

@Directive({
  selector: "[tediVerticalSpacing]",
  standalone: true,
})
export class VerticalSpacingDirective implements AfterViewInit {
  tediVerticalSpacing = input<VerticalSpacingSize>(0);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    this.renderer.addClass(this.el.nativeElement, "tedi-vertical-spacing");
    const spacingValue = `${this.tediVerticalSpacing()}em`;
    this.renderer.setAttribute(
      this.el.nativeElement,
      "style",
      `--vertical-spacing-internal: ${spacingValue}`,
    );
  }
}
