import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, model, signal, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '../../../base/icon/icon.component';
import { TextComponent } from '../../../base/text/text.component';
import { ShowAtDirective } from '../../../../directives/show-at/show-at.directive';
import { HideAtDirective } from '../../../../directives/hide-at/hide-at.directive';
import { ButtonComponent } from '../../../buttons/button/button.component';
import { TediTranslationService } from '../../../../services/translation/translation.service';
import { PopoverComponent } from '../../../overlay/popover/popover.component';
import { PopoverTriggerComponent } from '../../../overlay/popover/popover-trigger/popover-trigger.component';
import { PopoverContentComponent } from '../../../overlay/popover/popover-content/popover-content.component';

export type Representative = {
  name: string;
  icon?: string;
  description?: string;
}

@Component({
  selector: 'tedi-header-role',
  standalone: true,
  imports: [
    NgFor, 
    NgIf, 
    NgTemplateOutlet, 
    PopoverComponent, 
    PopoverTriggerComponent, 
    PopoverContentComponent, 
    IconComponent, 
    ButtonComponent, 
    TextComponent, 
    ShowAtDirective, 
    HideAtDirective
  ],
  templateUrl: './header-role.component.html',
  styleUrl: './header-role.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "tedi-header-role"
  },
})
export class HeaderRoleComponent {
  /**
   * Role text
   */
  role = input("");
  /**
   * Description text
   */
  description = input("");
  /** Should show input in representative list?
   * @default false
   */
  showInput = input(false);
  /** List of representatives */
  representatives = input.required<Representative[]>();
  /** Current representative */
  currentRepresentative = model.required<Representative>();

  mobileOpen = signal(false);
  inputValue = signal("");

  translationService = inject(TediTranslationService);
  switchRoleText = this.translationService.track("header.role-switch");
  closeText = this.translationService.track("close");
  searchText = this.translationService.track("header.role-search");
  noResultsText = this.translationService.track("header.role-no-representatives");
  collapseText = computed(() => this.mobileOpen() ? this.closeText() : this.switchRoleText());

  filteredRepresentatives = computed(() => {
    return this.representatives().filter(r => {
      if (!this.inputValue()) {
        return true;
      }

      const nameMatches = r.name.toLowerCase().includes(this.inputValue().toLowerCase());
      const descriptionMatches = r.description?.toLowerCase().includes(this.inputValue().toLowerCase()) ?? false;

      return nameMatches || descriptionMatches;
    })
  })

  handleMobileOpen() {
    this.mobileOpen.update(prev => !prev);
  }

  handleSelectRepresentative(r: Representative) {
    this.currentRepresentative.set(r);
  }

  handleInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue.set(value);
  }
}
