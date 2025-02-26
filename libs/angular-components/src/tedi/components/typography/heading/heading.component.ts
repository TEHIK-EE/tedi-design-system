import { Component, Input } from "@angular/core";
import { TextColor, TextModifiers, TextProps } from "../text/text.component";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingModifiers = `h${HeadingLevel}`;

export type HeadingProps = Omit<TextProps, "element"> & {
  /**
   * Semantic heading tag
   * h1-h6 are allowed values
   * @default h1
   */
  element?: HeadingModifiers;
};

@Component({
  selector: "tedi-heading",
  templateUrl: "./heading.component.html",
})
export class HeadingComponent implements HeadingProps {
  @Input() class?: string;
  @Input() id?: string;
  @Input() tabIndex?: number;
  @Input() element?: HeadingModifiers = "h1";
  @Input() modifiers?: TextModifiers[] | TextModifiers;
  @Input() color?: TextColor = "primary";

  get classes(): string {
    const modifierClasses = Array.isArray(this.modifiers)
      ? this.modifiers
      : this.modifiers
        ? [this.modifiers]
        : [];
    return [this.class, ...modifierClasses, this.color]
      .filter(Boolean)
      .join(" ");
  }
}
