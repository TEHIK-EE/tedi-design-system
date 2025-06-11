import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-sidenav-dropdown-item",
  standalone: true,
  template: "<ng-content />",
  styleUrl: "./sidenav-dropdown-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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

  classes = computed(() => {
    const classList = ["tedi-sidenav-dropdown-item"];

    if (this.selected()) {
      classList.push("tedi-sidenav-dropdown-item--selected");
    }

    return classList.join(" ");
  });
}
