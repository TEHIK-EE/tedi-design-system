import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, model, signal, ViewEncapsulation } from '@angular/core';
import { PopoverComponent } from '../../../overlay/popover/popover.component';
import { PopoverTriggerComponent } from '../../../overlay/popover/popover-trigger.component';
import { PopoverContentComponent } from '../../../overlay/popover/popover-content.component';
import { IconComponent } from "../../../base/icon/icon.component";
import { LinkComponent } from "../../../navigation/link/link.component";
import { TextComponent } from '../../../base/text/text.component';

export type Representative = {
  name: string;
  icon?: string;
  description?: string;
}

@Component({
  selector: 'tedi-header-role',
  standalone: true,
  imports: [NgFor, NgIf, PopoverComponent, PopoverTriggerComponent, PopoverContentComponent, IconComponent, LinkComponent, TextComponent],
  templateUrl: './header-role.component.html',
  styleUrl: './header-role.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "tedi-header-role"
  },
})
export class HeaderRoleComponent {
  role = input("");
  description = input("");
  showTag = input(false);
  showInput = input(false);
  representatives = input.required<Representative[]>();
  currentRepresentative = model.required<Representative>();

  inputValue = signal("");

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

  handleSelectRepresentative(r: Representative) {
    this.currentRepresentative.set(r);
  }

  handleInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue.set(value);
  }
}
