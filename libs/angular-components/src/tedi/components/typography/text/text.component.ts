import { Component, Input } from "@angular/core";
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
  class?: string;
  /**
   * ID attribute
   */
  id?: string;
  /**
   * Allows to focus the element
   */
  tabIndex?: number;
  /**
   * Base element
   * @default p
   */
  element?: TextElement;
  /**
   * Single or multiple modifiers to change the text behavior
   */
  modifiers?: TextModifiers[] | TextModifiers;
  /**
   * Color of the text
   * Use 'success', 'important' or 'warning' with caution, usually they should not be in application UI
   * @default primary
   */
  color?: TextColor;
};

@Component({
  selector: "tedi-text",
  templateUrl: "./text.component.html",
})
export class TextComponent implements TextProps {
  @Input() class?: string;
  @Input() id?: string;
  @Input() tabIndex?: number;
  @Input() element?: TextElement = "p";
  @Input() modifiers?: TextModifiers[] | TextModifiers;
  @Input() color?: TextColor = "primary";

  private isHeadingModifier(modifier: string): boolean {
    return /^h[1-6]$/.test(modifier);
  }

  get classes(): string {
    const modifierClasses = Array.isArray(this.modifiers)
      ? this.modifiers
      : this.modifiers
        ? [this.modifiers]
        : [];

    return [
      this.class,
      ...modifierClasses.map((modifier) =>
        this.isHeadingModifier(modifier)
          ? `tedi-text--${modifier}`
          : `text-${modifier}`,
      ),
      this.color ? `tedi-text--${this.color}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
}
