import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-sidenav-dropdown-item",
  standalone: true,
  templateUrl: "./sidenav-dropdown-item.component.html",
  styleUrl: "./sidenav-dropdown-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class SideNavDropdownItemComponent {
  classes = computed(() => {
    const classList = ["tedi-sidenav-dropdown-item"];

    return classList.join(" ");
  });
}
