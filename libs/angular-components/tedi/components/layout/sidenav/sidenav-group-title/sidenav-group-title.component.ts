import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-sidenav-group-title",
  standalone: true,
  template: "<ng-content />",
  styleUrl: "./sidenav-group-title.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SideNavGroupTitleComponent {}
