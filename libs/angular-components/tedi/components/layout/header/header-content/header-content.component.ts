import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tedi-header-content',
  standalone: true,
  template: "<ng-content />",
  styleUrl: './header-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContentComponent {}
