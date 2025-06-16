import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-sidenav-dropdown-group",
  standalone: true,
  templateUrl: "./sidenav-dropdown-group.component.html",
  styleUrl: "../sidenav.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class SideNavDropdownGroupComponent {
  classes = computed(() => {
    const classList = ["tedi-sidenav-dropdown-group"];

    return classList.join(" ");
  });
}
