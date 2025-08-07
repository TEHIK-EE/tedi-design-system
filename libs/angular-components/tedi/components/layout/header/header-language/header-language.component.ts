import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, output, ViewChild, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '../../../base/icon/icon.component';
import { TextComponent } from '../../../base/text/text.component';
import { PopoverComponent } from '../../../overlay/popover/popover.component';
import { PopoverTriggerComponent } from '../../../overlay/popover/popover-trigger/popover-trigger.component';
import { PopoverContentComponent } from '../../../overlay/popover/popover-content/popover-content.component';
import { TediTranslationService, Language } from '../../../../services/translation/translation.service';
import { TediTranslationPipe } from '../../../../services/translation/translation.pipe';

export type HeaderLanguage = {
  [L in Language]?: string;
}

@Component({
  selector: 'tedi-header-language',
  standalone: true,
  imports: [NgFor, IconComponent, TextComponent, PopoverComponent, PopoverTriggerComponent, PopoverContentComponent, TediTranslationPipe],
  templateUrl: './header-language.component.html',
  styleUrl: './header-language.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "tedi-header-language"
  }
})
export class HeaderLanguageComponent {
  /** 
   * Languages object.
   * Key is value in 'Language' type.
   * Value should be text shown in the UI.
  */
  languages = input.required<HeaderLanguage>();
  /**
   * This is event emitter for changing language
   */
  languageChange = output<Language>();

  @ViewChild(forwardRef(() => PopoverComponent)) popover?: PopoverComponent;

  translationService = inject(TediTranslationService);

  languageKeys = computed(() => Object.keys(this.languages()) as Language[]);

  handleChangeLang(lang: Language) {
    this.languageChange.emit(lang);
    this.translationService.setLanguage(lang);
    this.popover?.floatUiComponent.hide();
  }
}
