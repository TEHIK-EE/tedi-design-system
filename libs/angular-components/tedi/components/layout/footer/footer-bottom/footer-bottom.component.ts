import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  ElementRef,
  inject,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { BreakpointService, LinkComponent } from "@tehik-ee/tedi-angular/tedi";

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "tedi-footer-bottom",
  templateUrl: "./footer-bottom.component.html",
  styleUrl: "./footer-bottom.component.scss",
  host: {
    class: "tedi-footer-bottom",
    "[class.tedi-footer-bottom--mobile]": "showEllipsis()",
  },
})
export class FooterBottomComponent {
  renderer = inject(Renderer2);
  breakpointService = inject(BreakpointService);

  showEllipsis = computed(() => {
    return this.breakpointService.isBelowBreakpoint("sm");
  });

  @ViewChild("ellipsis", { static: true }) ellipsis!: TemplateRef<any>;
  @ContentChildren(LinkComponent, { descendants: true, read: ElementRef })
  links!: QueryList<ElementRef>;

  AfterContentInit() {
    this.addEllipsElements();
  }

  addEllipsElements() {
    const linksArray = this.links.toArray();

    linksArray.forEach((link, index) => {
      const nativeElement = link.nativeElement;

      if (index < linksArray.length - 1) {
        const parent = nativeElement.parentNode;

        const embeddedView = this.ellipsis.createEmbeddedView({});
        const ellipsisElement = embeddedView.rootNodes[0];

        this.renderer.insertBefore(
          parent,
          ellipsisElement,
          nativeElement.nextSibling,
        );
      }
    });
  }
}
