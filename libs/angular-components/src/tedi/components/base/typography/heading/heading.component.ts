import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
} from "@angular/core";
import { TextColor, TextModifiers, TextProps } from "../text/text.component";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingModifiers = `h${HeadingLevel}`;

export type HeadingProps = Omit<TextProps, "element"> & {
  /**
   * Semantic heading tag
   * h1-h6 are allowed values
   * @default h1
   */
  element?: InputSignal<HeadingModifiers | undefined>;
};

export function isHeadingModifier(modifier: string): boolean {
  return /^h[1-6]$/.test(modifier);
}

@Component({
  selector: "tedi-heading",
  templateUrl: "./heading.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent implements HeadingProps {
  class = input<string | undefined>(undefined);
  id = input<string | undefined>(undefined);
  tabIndex = input<number | undefined>(undefined);
  element = input<HeadingModifiers | undefined>("h1");
  modifiers = input<TextModifiers[] | TextModifiers | undefined>(undefined);
  color = input<TextColor | undefined>("primary");

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
        isHeadingModifier(modifier)
          ? `tedi-text--${modifier}`
          : `text-${modifier}`,
      ),
      this.color() ? `tedi-text--${this.color()}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  });
}
