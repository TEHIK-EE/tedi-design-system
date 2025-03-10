import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
} from "@angular/core";
import { HeadingModifiers } from "../heading/heading.component";

export type TextModifiers =
  | HeadingModifiers
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

export type TextElement =
  | "div"
  | "p"
  | "span"
  | "li"
  | "label"
  | HeadingModifiers;

export type TextProps = {
  /**
   * Additional class
   */
  class: InputSignal<string | undefined>;
  /**
   * ID attribute
   */
  id: InputSignal<string | undefined>;
  /**
   * Allows to focus the element
   */
  tabIndex: InputSignal<number | undefined>;
  /**
   * Base element
   * @default p
   */
  element: InputSignal<TextElement | undefined>;
  /**
   * Single or multiple modifiers to change the text behavior
   */
  modifiers: InputSignal<TextModifiers[] | TextModifiers | undefined>;
  /**
   * Color of the text
   * Use 'success', 'important' or 'warning' with caution, usually they should not be in application UI
   * @default primary
   */
  color: InputSignal<TextColor | undefined>;
};

@Component({
  selector: "tedi-text",
  templateUrl: "./text.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements TextProps {
  class = input<string | undefined>(undefined);
  id = input<string | undefined>(undefined);
  tabIndex = input<number | undefined>(undefined);
  element = input<TextElement | undefined>("p");
  modifiers = input<TextModifiers[] | TextModifiers | undefined>(undefined);
  color = input<TextColor | undefined>("primary");

  private isHeadingModifier(modifier: string): boolean {
    return /^h[1-6]$/.test(modifier);
  }

  classes = computed(() => {
    const modifiersValue = this.modifiers();
    const modifierClasses = Array.isArray(modifiersValue)
      ? modifiersValue
      : modifiersValue
        ? [modifiersValue]
        : [];

    return [
      this.class(),
      ...modifierClasses.map((modifier) =>
        this.isHeadingModifier(modifier)
          ? `tedi-text--${modifier}`
          : `text-${modifier}`,
      ),
      this.color() ? `tedi-text--${this.color()}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  });
}
