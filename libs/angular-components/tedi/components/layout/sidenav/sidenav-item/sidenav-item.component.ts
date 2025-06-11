import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  Renderer2,
  runInInjectionContext,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent } from "../../../base/icon/icon.component";
import { RouterLink } from "@angular/router";
import { NgTemplateOutlet } from "@angular/common";
import { SideNavDropdownComponent } from "../sidenav-dropdown/sidenav-dropdown.component";
import { SideNavItemSize } from "../sidenav.component";

@Component({
  selector: "tedi-sidenav-item",
  standalone: true,
  templateUrl: "./sidenav-item.component.html",
  styleUrl: "./sidenav-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconComponent, RouterLink, NgTemplateOutlet],
  host: {
    "[class]": "classes()",
  },
})
export class SideNavItemComponent implements AfterContentInit {
  /**
   * Is navigation item selected
   * @default false
   */
  selected = input<boolean>(false);
  /**
   * Name of the item icon
   */
  icon = input<string>();
  /**
   * External link
   */
  href = input<string>();
  /**
   * Router link
   */
  routerLink = input<string>();

  @ContentChild(SideNavDropdownComponent) dropdown?: SideNavDropdownComponent;

  readonly injector = inject(Injector);
  size = signal<SideNavItemSize>("large");
  isCollapsed = signal(false);
  hasDropdown = signal(false);
  element = signal<Element | null>(null);

  private readonly host = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly eventListeners: (() => void)[] = [];

  ngAfterContentInit(): void {
    const dropdown = this.dropdown;

    if (this.host.nativeElement) {
      const hostEl = this.host.nativeElement as Element;
      const trigger = hostEl
        .getElementsByClassName("tedi-sidenav-item__title")
        .item(0);

      if (trigger) {
        this.element.set(trigger);
      }
    }

    if (!dropdown) {
      return;
    }

    runInInjectionContext(this.injector, () => {
      effect(() => {
        dropdown.showParentInDropdown.set(
          this.isCollapsed() && (!!this.href() || !!this.routerLink()),
        );
      });
    });

    this.hasDropdown.set(true);
    this.eventListeners.push(
      this.renderer.listen("document", "click", (event: MouseEvent) => {
        if (this.isCollapsed()) {
          const target = event.target as HTMLElement;
          const clickedInsideDropdown = dropdown.element()?.contains(target);
          const clickedInsideTrigger = this.host.nativeElement.contains(target);

          if (!clickedInsideTrigger && !clickedInsideDropdown) {
            dropdown.open.set(false);
          }
        }
      }),
    );
  }

  classes = computed(() => {
    const classList = [
      "tedi-sidenav-item",
      `tedi-sidenav-item--${this.size()}`,
    ];

    if (this.selected()) {
      classList.push("tedi-sidenav-item--selected");
    }

    if (this.isCollapsed()) {
      classList.push("tedi-sidenav-item--collapsed");
    }

    return classList.join(" ");
  });

  toggleDropdown() {
    if (!this.dropdown) {
      return;
    }

    this.dropdown.open.set(!this.dropdown.open());
  }
}
