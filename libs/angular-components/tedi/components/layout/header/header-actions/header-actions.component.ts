import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-header-actions",
  standalone: true,
  template: "<ng-content />",
  styleUrl: "./header-actions.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "class": "tedi-header-actions"
  }
})
export class HeaderActionsComponent {}