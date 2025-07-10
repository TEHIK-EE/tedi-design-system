import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '../../../base/icon/icon.component';
import { PopoverComponent } from '../../../overlay/popover/popover.component';
import { PopoverTriggerComponent } from '../../../overlay/popover/popover-trigger.component';
import { PopoverContentComponent } from '../../../overlay/popover/popover-content.component';
import { ButtonComponent } from '../../../buttons/button/button.component';
import { ShowAtDirective } from '../../../../directives/show-at/show-at.directive';
import { HideAtDirective } from '../../../../directives/hide-at/hide-at.directive';

@Component({
  selector: 'tedi-header-profile',
  standalone: true,
  imports: [PopoverComponent,  PopoverTriggerComponent, PopoverContentComponent, IconComponent, ButtonComponent, ShowAtDirective, HideAtDirective],
  templateUrl: './header-profile.component.html',
  styleUrl: './header-profile.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderProfileComponent {
  name = input("");
}
