import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { DOCUMENT, NgTemplateOutlet } from "@angular/common";
import { IconComponent } from "../../../base/icon/icon.component";
import { ShowAtDirective } from "../../../../directives/show-at/show-at.directive";
import { HideAtDirective } from "../../../../directives/hide-at/hide-at.directive";
import { ButtonComponent } from "../../../buttons/button/button.component";
import { PopoverComponent } from "../../../overlay/popover/popover.component";
import { PopoverTriggerComponent } from "../../../overlay/popover/popover-trigger/popover-trigger.component";
import { PopoverContentComponent } from "../../../overlay/popover/popover-content/popover-content.component";
import {
  Breakpoint,
  BreakpointService,
} from "../../../../services/breakpoint/breakpoint.service";
import { TediTranslationPipe } from "../../../../services/translation/translation.pipe";

@Component({
  selector: "tedi-header-profile",
  standalone: true,
  imports: [
    PopoverComponent,
    PopoverTriggerComponent,
    PopoverContentComponent,
    IconComponent,
    ButtonComponent,
    ShowAtDirective,
    HideAtDirective,
    NgTemplateOutlet,
    TediTranslationPipe,
  ],
  templateUrl: "./header-profile.component.html",
  styleUrl: "./header-profile.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderProfileComponent implements AfterContentInit {
  /** Name of representative */
  name = input("");
  /** Breakpoint at which we show dropdown instead of modal */
  showDropdown = input<Breakpoint>();

  private breakpointService = inject(BreakpointService);
  private readonly document = inject(DOCUMENT);
  private readonly host = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly eventListeners: (() => void)[] = [];

  constructor() {
    effect(() => {
      if (this.modalOpen()) {
        this.renderer.setStyle(this.document.body, "overflow", "hidden");
      } else {
        this.renderer.removeStyle(this.document.body, "overflow");
      }
    });
  }

  modalOpen = signal(false);

  ngAfterContentInit(): void {
    const element = this.host.nativeElement as HTMLElement;

    this.eventListeners.push(
      this.renderer.listen("document", "click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const clickedInside = element.contains(target);

        if (this.modalOpen() && !clickedInside) {
          this.modalOpen.set(false);
        }
      }),
    );
  }

  handleModalOpen() {
    const dropdownBreakpoint = this.showDropdown();

    if (
      !(
        dropdownBreakpoint &&
        this.breakpointService.isAboveBreakpoint(dropdownBreakpoint)()
      )
    ) {
      this.modalOpen.update((prev) => !prev);
    }
  }
}
