import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent } from "../../../base/icon/icon.component";
import { RouterLink } from "@angular/router";
import { NgTemplateOutlet } from "@angular/common";

export type SideNavItemSize = "small" | "medium" | "large";

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
export class SideNavItemComponent {
  /**
   * Size of navigation item
   * @default large
   */
  size = input<SideNavItemSize>("large");
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

  classes = computed(() => {
    const classList = [
      "tedi-sidenav-item",
      `tedi-sidenav-item--${this.size()}`,
    ];

    if (this.selected()) {
      classList.push("tedi-sidenav-item--selected");
    }

    return classList.join(" ");
  });
}
