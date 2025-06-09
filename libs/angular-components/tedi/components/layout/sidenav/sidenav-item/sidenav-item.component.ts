import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent } from "../../../base/icon/icon.component";
import { RouterLink } from "@angular/router";
import { NgTemplateOutlet } from "@angular/common";
import { SideNavDropdownComponent } from "../sidenav-dropdown/sidenav-dropdown.component";

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
  icon = input<string>("");
  /**
   * External link
   */
  href = input<string>("");
  /**
   * Router link
   */
  routerLink = input<string>("");

  @ContentChild(SideNavDropdownComponent) dropdown?: SideNavDropdownComponent;

  hasDropdown = signal(false);

  ngAfterContentInit(): void {
    const dropdown = this.dropdown;

    if (!dropdown) {
      return;
    }

    this.hasDropdown.set(true);
  }

  classes = computed(() => {
    const classList = ["tedi-sidenav-item"];

    if (this.selected()) {
      classList.push("tedi-sidenav-item--selected");
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
