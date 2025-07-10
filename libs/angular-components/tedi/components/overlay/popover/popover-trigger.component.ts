import { AfterContentInit, Component, ElementRef, inject, Renderer2, signal } from '@angular/core';

@Component({
  selector: "tedi-popover-trigger",
  standalone: true,
  template: "<ng-content />",
})
export class PopoverTriggerComponent implements AfterContentInit {
  private readonly host = inject(ElementRef);
  private renderer = inject(Renderer2);
  element = signal<HTMLElement | null>(null);

  ngAfterContentInit(): void {
    const element = this.host.nativeElement as HTMLElement;
    const firstChild = element.firstChild;
    this.element.set(element);

    if (!firstChild) {
      return;
    }
    
    if (firstChild.nodeType === Node.TEXT_NODE && firstChild.textContent?.trim()) {
      const span = this.renderer.createElement('span') as HTMLSpanElement;
      const textNode = this.renderer.createText(firstChild.textContent.trim());

      this.renderer.appendChild(span, textNode);
      this.renderer.addClass(span, "tedi-popover-trigger__text");
      this.renderer.setAttribute(span, "tabindex", "0");
      this.renderer.insertBefore(this.host.nativeElement, span, firstChild);
      this.renderer.removeChild(this.host.nativeElement, firstChild);
    } else {
      const element = firstChild as HTMLElement;
      this.renderer.setAttribute(element, "tabindex", element.getAttribute("tabindex") ?? "0");
    }
  }
}