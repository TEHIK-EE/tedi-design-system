import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "tedi-sidenav-dropdown-item",
  standalone: true,
  templateUrl: "./sidenav-dropdown-item.component.html",
  styleUrl: "./sidenav-dropdown-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, NgTemplateOutlet],
  host: {
    "[class]": "classes()",
  },
})
export class SideNavDropdownItemComponent {
  /**
   * Is navigation item selected
   * @default false
   */
  selected = input<boolean>(false);
  /**
   * External link
   */
  href = input<string>();
  /**
   * Router link
   */
  routerLink = input<string>();

  classes = computed(() => {
    const classList = ["tedi-sidenav-dropdown-item"];

    if (this.selected()) {
      classList.push("tedi-sidenav-dropdown-item--selected");
    }

    return classList.join(" ");
  });
}
