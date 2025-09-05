import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { DropdownComponent } from "../dropdown/dropdown.component";

const itemRole = {
  menu: "menuitem",
  listbox: "option",
};

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
    "[attr.role]": "ariaAttributes().role",
    "[attr.aria-disabled]": "ariaAttributes().disabled",
    "[attr.aria-selected]": "ariaAttributes().selected",
    "[attr.tab-index]": "ariaAttributes().tabIndex",
    "(click)": "dropdownContext?.close()",
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

  private dropdownContext = inject(DropdownComponent, { optional: true });

  ariaAttributes = computed(() => {
    const dropdownRole = this.dropdownContext?.dropdownRole();
    if (!dropdownRole) return {};
    return {
      role: itemRole[dropdownRole],
      disabled: String(this.disabled()),
      selected:
        dropdownRole === "listbox" ? String(this.selected()) : undefined,
      tabIndex: 0,
    };
  });
}
