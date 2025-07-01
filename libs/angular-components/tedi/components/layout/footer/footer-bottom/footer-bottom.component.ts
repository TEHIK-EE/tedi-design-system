import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  inject,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  AfterContentInit,
  effect,
  Injector,
  runInInjectionContext,
  ViewContainerRef,
  EmbeddedViewRef,
} from "@angular/core";
import { LinkComponent } from "../../../navigation/link/link.component";
import { BreakpointService } from "../../../../services/breakpoint/breakpoint.service";

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "tedi-footer-bottom",
  templateUrl: "./footer-bottom.component.html",
  styleUrl: "./footer-bottom.component.scss",
  host: {
    class: "tedi-footer-bottom",
    "[class.tedi-footer-bottom--mobile]": "mobileLayout()",
  },
})
export class FooterBottomComponent implements AfterContentInit {
  private injector = inject(Injector);
  private renderer = inject(Renderer2);
  private breakpointService = inject(BreakpointService);
  private hostRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);
  private ellipsisViews: Array<EmbeddedViewRef<void>> = [];

  @ViewChild("ellipsis", { static: true }) ellipsis!: TemplateRef<void>;
  @ContentChildren(LinkComponent, { descendants: true, read: ElementRef })
  links!: QueryList<ElementRef>;

  mobileLayout = this.breakpointService.isBelowBreakpoint("sm");

  ngAfterContentInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.mobileLayout()) {
          this.addEllipsisElements();
        } else {
          this.removeEllipsisElements();
        }
      });
    });
  }

  private addEllipsisElements() {
    if (!this.links || this.links.length === 0) return;
    const linksArray = this.links.toArray();
    this.removeEllipsisElements();

    linksArray.forEach((link, index) => {
      const nativeElement = link.nativeElement;

      if (index < linksArray.length - 1) {
        const parent = nativeElement.parentNode;
        if (!parent) return;

        const embeddedView = this.viewContainerRef.createEmbeddedView(
          this.ellipsis,
        );
        embeddedView.detectChanges();
        this.ellipsisViews.push(embeddedView);
        const ellipsisElement = embeddedView.rootNodes[0];
        this.renderer.addClass(ellipsisElement, "tedi-footer-bottom__ellipsis");

        this.renderer.insertBefore(
          parent,
          ellipsisElement,
          nativeElement.nextSibling,
        );
      }
    });
  }

  private removeEllipsisElements(): void {
    const ellipsisEls = this.hostRef.nativeElement.querySelectorAll(
      ".tedi-footer-bottom__ellipsis",
    );

    ellipsisEls.forEach((el: HTMLElement) => {
      const parent = el.parentNode;
      if (parent) {
        this.renderer.removeChild(parent, el);
      }
    });
    this.ellipsisViews.forEach((view) => view.destroy());
    this.ellipsisViews = [];
  }
}
