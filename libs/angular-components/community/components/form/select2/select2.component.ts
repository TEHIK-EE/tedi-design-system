import { CdkOverlayOrigin, OverlayModule } from "@angular/cdk/overlay";
import { CdkListbox, CdkListboxModule } from "@angular/cdk/listbox";
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
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
import { ClosingButtonComponent } from "tedi/components";
import { Select2OptionComponent } from "./select2option.component";

@Component({
  selector: "select2",
  imports: [
    OverlayModule,
    CdkListboxModule,
    InputComponent,
    CardComponent,
    CardContentComponent,
    DropdownItemComponent,
    ClosingButtonComponent,
  ],
  templateUrl: "./select2.component.html",
  styleUrl: "./select2.component.scss",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select2Component {
  isOpen = signal(false);
  selectedOptions: readonly string[] = [];
  listbox = viewChild(CdkListbox, { read: ElementRef });
  trigger = viewChild(CdkOverlayOrigin, { read: ElementRef });
  options = contentChildren(Select2OptionComponent);

  toggleIsOpen(value?: boolean): void {
    if (value === undefined) {
      this.isOpen.update((val) => !val);
    } else if (value === false) {
      this.isOpen.update(() => value);
      this.focusTrigger();
    }
  }

  handleValueChange(event: { value: readonly string[] }): void {
    this.selectedOptions = event.value;
    this.toggleIsOpen(false);
  }

  clear(): void {
    this.selectedOptions = [];
  }

  focusListboxWhenVisible = effect(() => {
    if (this.listbox()) this.listbox()?.nativeElement.focus();
  });

  focusTrigger(): void {
    this.trigger()?.nativeElement.focus();
  }

  isOptionSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }
}
