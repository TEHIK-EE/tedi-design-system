import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  forwardRef,
  inject,
  input,
  model,
  ViewEncapsulation,
} from "@angular/core";
import { DropdownTriggerDirective } from "./dropdown-trigger/dropdown-trigger.directive";
import { OverlayModule } from "@angular/cdk/overlay";
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards";
import { DropdownItemComponent } from "../dropdown-item/dropdown-item.component";
import { ClosingButtonComponent } from "tedi/components";
import { BreakpointService } from "@tehik-ee/tedi-angular/tedi";

@Component({
  selector: "tedi-dropdown",
  imports: [
    OverlayModule,
    CardComponent,
    CardContentComponent,
    ClosingButtonComponent,
  ],
  templateUrl: "./dropdown.component.html",
  styleUrl: "./dropdown.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  dropdownId = input.required<string>();
  dropdownRole = input<"menu" | "listbox">();
  opened = model<boolean>(false);

  private triggerDirective = contentChild.required(DropdownTriggerDirective);
  private dropdownItems = contentChildren<DropdownItemComponent>(
    forwardRef(() => DropdownItemComponent),
  );

  isMobile = inject(BreakpointService).isBelowBreakpoint("sm");

  overlayOrigin = computed(() => {
    return this.triggerDirective().overlayOrigin;
  });

  toggle() {
    this.opened.update((wasOpened) => !wasOpened);
  }

  close() {
    this.opened.set(false);
  }

  onKeyDown(event: KeyboardEvent) {
    console.log(event); // TODO: add keyboard support
  }
}
