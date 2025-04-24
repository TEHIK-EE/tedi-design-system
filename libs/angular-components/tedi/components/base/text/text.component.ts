import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

export type TextModifiers =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "normal"
  | "small"
  | "bold"
  | "thin"
  | "italic"
  | "center"
  | "left"
  | "right"
  | "nowrap"
  | "break-all"
  | "break-word"
  | "break-spaces"
  | "uppercase"
  | "lowercase"
  | "capitalize"
  | "capitalize-first"
  | "inline-block"
  | "inline"
  | "line-normal"
  | "line-condensed"
  | "subtitle";

export type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "white"
  | "disabled"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

@Component({
  selector: "[tedi-text]",
  standalone: true,
  templateUrl: "./text.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "classes()"
  },
})
export class TextComponent {
  /**
   * Single or multiple modifiers to change the text behavior
   */
  modifiers = input<TextModifiers[] | TextModifiers>();
  /**
   * Color of the text
   * Use 'success', 'important' or 'warning' with caution, usually they should not be in application UI
   * @default primary
   */
  color = input<TextColor>("primary");

  private isHeadingModifier(modifier: string) {
    return /^h[1-6]$/.test(modifier);
  }

  classes = computed(() => {
    const classList = [`tedi-text--${this.color()}`];

    const modifiersValue = this.modifiers();
    const modifierClasses = Array.isArray(modifiersValue)
      ? modifiersValue
      : modifiersValue
        ? [modifiersValue]
        : [];
    

    modifierClasses.forEach((modifier) => {
      if (this.isHeadingModifier(modifier)) {
        classList.push(`tedi-text--${modifier}`);
      } else {
        classList.push(`text-${modifier}`);
      }
    });

    return classList.join(" ");
  });
}
