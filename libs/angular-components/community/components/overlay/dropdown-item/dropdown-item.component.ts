import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "[tedi-dropdown-item]",
  template: "<ng-content />",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./dropdown-item.component.scss",
  host: {
    "[class.tedi-dropdown-item]": "true",
    "[class.tedi-dropdown-item--active]": "this.selected()",
    "[class.tedi-dropdown-item--disabled]": "this.disabled()",
  },
})
export class DropdownItemComponent {
  /**
   * Applies the selected style to the dropdown item.
   */
  selected = input<boolean>(false);
  /**
   * Applies the disabled style to the dropdown item.
   */
  disabled = input<boolean>(false);
}
