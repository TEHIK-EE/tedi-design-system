import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type SeparatorAxis = "horizontal" | "vertical";
export type SeparatorColor = "primary" | "secondary" | "accent";
export type SeparatorVariant = "dotted" | "dotted-small" | "dot-only";
export type SeparatorDotSize = "large" | "medium" | "small" | "extra-small";
export type SeparatorThickness = 1 | 2;
export type SeparatorSpacingValue =
  | 0
  | 0.25
  | 0.5
  | 0.75
  | 1
  | 1.25
  | 1.5
  | 1.75
  | 2
  | 2.5
  | 5;
export type SeparatorSpacing = {
  top?: SeparatorSpacingValue;
  bottom?: SeparatorSpacingValue;
  left?: SeparatorSpacingValue;
  right?: SeparatorSpacingValue;
};

@Component({
  selector: "tedi-separator",
  template: "",
  styleUrl: "./separator.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "classes()",
    "[style.width]":
      "variant() === 'dot-only' ? null : axis() === 'horizontal' ? size() : '0px'",
    "[style.height]":
      "variant() === 'dot-only' ? null : axis() === 'vertical' ? size() : '0px'",
  },
})
export class SeparatorComponent {
  /**
   * Axis of separator.
   */
  axis = input<SeparatorAxis>("horizontal");
  /**
   * Color of separator
   */
  color = input<SeparatorColor>("primary");
  /**
   * Separator style variant.
   */
  variant = input<SeparatorVariant>();
  /**
   * Dot size. Only used when variant is "dot-only".
   */
  dotSize = input<SeparatorDotSize>();
  /**
   * Is dot filled? Only used when variant is "dot-only".
   */
  dotFilled = input(true);
  /**
   * Thickness in pixels (ignored if variant is used).
   * @default 1
   */
  thickness = input<SeparatorThickness>(1);
  /**
   * Spacing applied based on the axis:
   * - For horizontal axis, spacing is applied to top and bottom of the separator.
   * - For vertical axis, spacing is applied to left and right of the separator.
   */
  spacing = input<SeparatorSpacingValue | SeparatorSpacing>();
  /**
   * Size of separator based on the axis:
   * - For horizontal axis, size defines width.
   * - For vertical axis, size defines height (when using percentages, then parent container must have height set).
   * @default 100%
   */
  size = input("100%");

  // eslint-disable-next-line complexity
  classes = computed(() => {
    const classList = [
      "tedi-separator",
      `tedi-separator--${this.color()}`,
      `tedi-separator--${this.axis()}`,
    ];

    if (this.variant()) {
      classList.push(`tedi-separator--${this.variant()}`);
    }

    if (this.variant() && this.dotSize()) {
      classList.push(`tedi-separator--${this.variant()}-${this.dotSize()}`);
    }

    if (this.variant() === "dot-only" && this.dotFilled()) {
      classList.push(`tedi-separator--${this.variant()}-filled`);
    } else {
      classList.push(`tedi-separator--${this.variant()}-outlined`);
    }

    if (this.thickness()) {
      classList.push(`tedi-separator--thickness-${this.thickness()}`);
    }

    const spacing = this.spacing();

    if (spacing && typeof spacing === "number") {
      classList.push(`tedi-separator--spacing-${spacing}`.replace(".", "-"));
    } else if (spacing) {
      if (this.axis() === "horizontal") {
        if (spacing.top) {
          classList.push(
            `tedi-separator--top-${spacing.top}`.replace(".", "-"),
          );
        }

        if (spacing.bottom) {
          classList.push(
            `tedi-separator--bottom-${spacing.bottom}`.replace(".", "-"),
          );
        }
      } else {
        if (spacing.left) {
          classList.push(
            `tedi-separator--left-${spacing.left}`.replace(".", "-"),
          );
        }

        if (spacing.right) {
          classList.push(
            `tedi-separator--right-${spacing.right}`.replace(".", "-"),
          );
        }
      }
    }

    return classList.join(" ");
  });
}
