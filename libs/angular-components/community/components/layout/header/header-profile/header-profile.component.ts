import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, Renderer2, signal, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent, ButtonComponent, ShowAtDirective, HideAtDirective, Breakpoint, PopoverComponent, PopoverTriggerComponent, PopoverContentComponent } from "@tehik-ee/tedi-angular/tedi";

@Component({
  selector: 'tedi-header-profile',
  standalone: true,
  imports: [
    PopoverComponent, 
    PopoverTriggerComponent, 
    PopoverContentComponent, 
    IconComponent, 
    ButtonComponent, 
    ShowAtDirective, 
    HideAtDirective, 
    NgTemplateOutlet
  ],
  templateUrl: './header-profile.component.html',
  styleUrl: './header-profile.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderProfileComponent implements AfterContentInit {
  /** Name of representative */
  name = input("");
  /** Breakpoint at which we show dropdown instead of modal */
  showDropdown = input<Breakpoint>();

  private readonly host = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly eventListeners: (() => void)[] = [];
  
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
    this.modalOpen.update(prev => !prev);
  }
}
