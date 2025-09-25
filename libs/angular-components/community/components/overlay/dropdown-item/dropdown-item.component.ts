import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { FocusableOption } from "@angular/cdk/a11y";
import {} from "@angular/cdk/menu";

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
    "[class.tedi-dropdown-item--disabled]": "this.disabledInput()",
    "[attr.role]": "ariaAttributes().role",
    "[attr.aria-disabled]": "ariaAttributes().disabled",
    "[attr.aria-selected]": "ariaAttributes().selected",
    "[attr.tabindex]": "ariaAttributes().tabIndex",
    "(click)": "selectItem()",
    "(keydown)": "onKeyDown($event)",
  },
})
export class DropdownItemComponent implements FocusableOption {
  /**
   * Applies the selected style to the dropdown item.
   */
  selected = input<boolean>(false);
  /**
   * Applies the disabled style to the dropdown item.
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  disabledInput = input<boolean>(false, { alias: "disabled" });
  disabled?: boolean; // for cdk/a11y keymanager
  itemSelected = output<void>();

  private dropdownContext = inject(DropdownComponent, { optional: true });

  ariaAttributes = computed(() => {
    const dropdownRole = this.dropdownContext?.dropdownRole();
    if (!dropdownRole) return {};
    return {
      role: itemRole[dropdownRole],
      disabled: String(this.disabledInput()),
      selected:
        dropdownRole === "listbox" ? String(this.selected()) : undefined,
      tabIndex: 0,
    };
  });

  focus() {
    this.element.nativeElement.focus();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      if (this.element.nativeElement.nodeName === "BUTTON") {
        event.preventDefault();
      }
      if (
        this.element.nativeElement.nodeName === "A" &&
        event.key === "Enter"
      ) {
        event.preventDefault();
      }
      this.selectItem();
    }
  }

  selectItem() {
    this.dropdownContext?.close();
    this.itemSelected.emit();
  }

  constructor(private element: ElementRef<HTMLElement>) {
    effect(() => {
      this.disabled = this.disabledInput();
    });
  }
}
