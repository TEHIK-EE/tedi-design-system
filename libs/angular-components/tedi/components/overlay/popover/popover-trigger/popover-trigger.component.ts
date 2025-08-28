import {
  AfterContentChecked,
  Component,
  ElementRef,
  inject,
  Renderer2,
} from "@angular/core";

@Component({
  selector: "tedi-popover-trigger",
  standalone: true,
  template: "<ng-content />",
  styleUrl: "../popover.component.scss",
})
export class PopoverTriggerComponent implements AfterContentChecked {
  private host = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngAfterContentChecked(): void {
    const childNodes: ChildNode[] = Array.from(
      this.host.nativeElement.childNodes,
    );

    for (const node of childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        if (node.parentNode !== this.host.nativeElement) {
          continue;
        }

        const span = this.renderer.createElement("span") as HTMLSpanElement;
        this.renderer.addClass(span, "tedi-popover-trigger__text");
        this.renderer.insertBefore(this.host.nativeElement, span, node);
        this.renderer.appendChild(span, node);
      }
    }
  }
}
