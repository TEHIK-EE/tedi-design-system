import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-sidenav-group-title",
  standalone: true,
  templateUrl: "./sidenav-group-title.component.html",
  styleUrl: "./sidenav-group-title.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SideNavGroupTitleComponent {}
