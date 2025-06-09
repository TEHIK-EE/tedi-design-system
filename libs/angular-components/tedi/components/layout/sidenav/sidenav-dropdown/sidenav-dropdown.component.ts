import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-sidenav-dropdown",
  standalone: true,
  templateUrl: "./sidenav-dropdown.component.html",
  styleUrl: "./sidenav-dropdown.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class SideNavDropdownComponent {
  open = signal(false);

  classes = computed(() => {
    const classList = ["tedi-sidenav-dropdown"];

    if (this.open()) {
      classList.push("tedi-sidenav-dropdown--open");
    }

    return classList.join(" ");
  });
}
