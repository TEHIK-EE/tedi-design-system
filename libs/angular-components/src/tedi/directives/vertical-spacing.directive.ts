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
  selector: "[appVerticalSpacing]",
  standalone: true,
})
export class VerticalSpacingDirective implements AfterViewInit {
  appVerticalSpacing = input<VerticalSpacingSize>(0);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    const spacing = `${this.appVerticalSpacing()}em`;

    const children = this.el.nativeElement.children;
    const total = children.length;

    for (let i = 0; i < total - 1; i++) {
      const child = children[i];
      this.renderer.setStyle(child, "margin-bottom", spacing);
    }
  }
}
