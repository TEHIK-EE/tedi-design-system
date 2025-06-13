import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { BreakpointService } from '@tehik-ee/tedi-angular/tedi';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'tedi-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  breakpointService = inject(BreakpointService);

  mobileLayout = computed(() => {
    return this.breakpointService.isBelowBreakpoint('sm');
  });
}
