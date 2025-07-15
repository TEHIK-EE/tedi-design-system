import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { PopoverComponent } from '../../../overlay/popover/popover.component';
import { PopoverTriggerComponent } from '../../../overlay/popover/popover-trigger.component';
import { PopoverContentComponent } from '../../../overlay/popover/popover-content.component';
import { IconComponent, LinkComponent, TextComponent, ShowAtDirective } from "@tehik-ee/tedi-angular/tedi";

export type HeaderLanguage = {
  name: string;
  label: string;
}

@Component({
  selector: 'tedi-header-language',
  standalone: true,
  imports: [NgFor, PopoverComponent, PopoverTriggerComponent, PopoverContentComponent, IconComponent, LinkComponent, TextComponent, ShowAtDirective],
  templateUrl: './header-language.component.html',
  styleUrl: './header-language.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "tedi-header-language"
  }
})
export class HeaderLanguageComponent {
  /** List of languages */
  languages = input.required<HeaderLanguage[]>();
  /**
   * This is current selected language and event emitter (currentLanguageChange)
   */
  currentLanguage = model.required<HeaderLanguage>();
}
