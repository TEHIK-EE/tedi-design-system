import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-sidenav-dropdown-group",
  standalone: true,
  template: "<ng-content />",
  styleUrl: "./sidenav-dropdown-group.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "class": "tedi-sidenav-dropdown-group",
  },
})
export class SideNavDropdownGroupComponent {}
