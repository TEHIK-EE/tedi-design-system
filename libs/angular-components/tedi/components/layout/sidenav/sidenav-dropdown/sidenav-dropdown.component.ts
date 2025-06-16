import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { SideNavDropdownItemComponent } from "../sidenav-dropdown-item/sidenav-dropdown-item.component";
import { SideNavItemComponent } from "../sidenav-item/sidenav-item.component";
import { SideNavComponent } from "../sidenav.component";

@Component({
  selector: "tedi-sidenav-dropdown",
  standalone: true,
  templateUrl: "./sidenav-dropdown.component.html",
  styleUrl: "../sidenav.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [SideNavDropdownItemComponent],
  host: {
    "[class]": "classes()",
  },
})
export class SideNavDropdownComponent implements AfterContentInit {
  private readonly host = inject(ElementRef);

  open = signal(false);
  element = signal<HTMLElement | null>(null);
  sidenav = inject(SideNavComponent, { host: true });
  sidenavItem = inject(SideNavItemComponent, { host: true });

  ngAfterContentInit(): void {
    if (this.host.nativeElement) {
      this.element.set(this.host.nativeElement);
    }
  }

  classes = computed(() => {
    const classList = ["tedi-sidenav-dropdown"];

    if (this.open()) {
      classList.push("tedi-sidenav-dropdown--open");
    }

    return classList.join(" ");
  });
}
