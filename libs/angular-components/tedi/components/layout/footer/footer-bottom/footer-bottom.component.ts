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
  AfterContentInit,
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
    "[class.tedi-footer-bottom--mobile]": "showEllipsis()",
  },
})
export class FooterBottomComponent implements AfterContentInit {
  private renderer = inject(Renderer2);
  private breakpointService = inject(BreakpointService);

  showEllipsis = computed(() => {
    return this.breakpointService.isBelowBreakpoint("sm");
  });

  @ViewChild("ellipsis", { static: true }) ellipsis!: TemplateRef<void>;
  @ContentChildren(LinkComponent, { descendants: true, read: ElementRef })
  links!: QueryList<ElementRef>;

  ngAfterContentInit() {
    this.addEllipsElements();
  }

  private addEllipsElements() {
    const linksArray = this.links.toArray();

    const existingEllipsis = document.querySelectorAll(
      ".tedi-footer-bottom__ellipsis",
    );
    existingEllipsis.forEach((ellipsis) => ellipsis.remove());

    linksArray.forEach((link, index) => {
      const nativeElement = link.nativeElement;

      if (index < linksArray.length - 1) {
        const parent = nativeElement.parentNode;
        if (!parent) return;

        const embeddedView = this.ellipsis.createEmbeddedView();
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
