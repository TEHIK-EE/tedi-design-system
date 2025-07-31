import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: "tedi-popover-trigger",
  standalone: true,
  template: "<ng-content />",
  host: {
    "aria-haspopup": "dialog",
  }
})
export class PopoverTriggerComponent {
  host = inject(ElementRef);
}