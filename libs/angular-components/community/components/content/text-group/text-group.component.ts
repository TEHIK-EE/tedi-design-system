import { Component, computed, input } from '@angular/core';

export type TextGroupType = 'vertical' | 'horizontal';

@Component({
  standalone: true,
  selector: 'tedi-text-group',
  templateUrl: './text-group.component.html',
  styleUrl: './text-group.component.scss',
})
export class TextGroupComponent {
  /**
   * Type of text group layout
   * @default horizontal
   */
  type = input<TextGroupType>('horizontal');
  /**
   * Width for the label (e.g., '200px', '30%', etc.)
   * @default auto
   */
  labelWidth = input<string>();

  classes = computed(() => {
    const classList = ['tedi-text-group'];
    if (this.type()) {
      classList.push(`tedi-text-group--${this.type()}`);
    }
    return classList.join(' ');
  });
}
