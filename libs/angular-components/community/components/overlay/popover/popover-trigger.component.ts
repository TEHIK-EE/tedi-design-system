import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: "tedi-popover-trigger",
  standalone: true,
  template: "<ng-content />",
})
export class PopoverTriggerComponent {
  host = inject(ElementRef);
}