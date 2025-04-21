import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "[tedi-dropdown-item]",
  template: "<ng-content />",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./dropdown-item.component.scss",
  host: {
    class: "tedi-dropdown-item",
  },
})
export class DropdownItemComponent {}
