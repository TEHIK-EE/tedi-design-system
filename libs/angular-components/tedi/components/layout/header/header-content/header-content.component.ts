import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tedi-header-content',
  standalone: true,
  imports: [],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContentComponent {

}
