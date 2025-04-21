import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
    "[class]": "modifierClasses()",
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

  modifierClasses = computed(() => {
    const modifiers = [];
    if (this.selected()) modifiers.push(`tedi-dropdown-item--active`);
    if (this.disabled()) modifiers.push(`tedi-dropdown-item--disabled`);
    return modifiers.join(" ");
  });
}
