import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, signal, ViewEncapsulation } from '@angular/core';
import { IconComponent, TextComponent } from "@tehik-ee/tedi-angular/tedi";
import { PopoverComponent } from "../../../overlay/popover/popover.component";
import { PopoverTriggerComponent } from "../../../overlay/popover/popover-trigger.component";
import { PopoverContentComponent } from "../../../overlay/popover/popover-content.component";

export type HeaderLanguage = {
  name: string;
  label: string;
}

@Component({
  selector: 'tedi-header-language',
  standalone: true,
  imports: [NgFor, IconComponent, TextComponent, PopoverComponent, PopoverTriggerComponent, PopoverContentComponent],
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

  open = signal(false);

  handleOpen() {
    this.open.update(prev => !prev);
  }

  handleChangeLang(lang: HeaderLanguage) {
    this.currentLanguage.set(lang);
  }
}
