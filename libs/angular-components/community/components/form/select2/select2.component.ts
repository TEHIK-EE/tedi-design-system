import { OverlayModule } from "@angular/cdk/overlay";
import { CdkListbox, CdkListboxModule } from "@angular/cdk/listbox";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
} from "@angular/core";
import { InputComponent } from "../input/input.component";
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards";
import { DropdownItemComponent } from "community/components/overlay";

@Component({
  selector: "select2",
  imports: [
    OverlayModule,
    CdkListboxModule,
    InputComponent,
    CardComponent,
    CardContentComponent,
    DropdownItemComponent,
  ],
  templateUrl: "./select2.component.html",
  styleUrl: "./select2.component.css",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select2Component {
  options = input([
    "Hydrodynamic",
    "Port & Starboard Attachments",
    "Turbo Drive",
  ]);

  isOpen = signal(false);
  selectedOptions: readonly string[] = [];
  dropdown = viewChild(CdkListbox);

  toggleIsOpen(value?: boolean): void {
    return value === undefined
      ? this.isOpen.update((val) => !val)
      : this.isOpen.update(() => value);
  }

  handleValueChange(event: { value: readonly string[] }): void {
    this.selectedOptions = event.value;
    this.toggleIsOpen(false);
  }

  something = effect(() => {
    if (this.dropdown()) {
      this.dropdown()?.focus();
    }
  });

  // updateSelectedOption(option: string): void {
  //   this.starter.set(option);
  //   this.toggleIsOpen(false);
  // }
}
