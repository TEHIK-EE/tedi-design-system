import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
} from "@angular/core";
import { RowContextService } from "../row/row.component";

type ColElement = "div" | "li" | "span" | undefined;
type NumberAttr = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ColOrder = 1 | 2 | 3 | 4 | 5 | "first" | "last" | undefined;
type ColSize = "auto" | NumberAttr | undefined;
type ColAlign = "start" | "center" | "end" | undefined;

type ColProps = {
  /**
   * Base element.
   * @default div
   */
  element?: InputSignal<ColElement>;
  /**
   * Additional class.
   */
  class?: InputSignal<string>;
  /**
   * Number of column width.
   * Use `auto` to give columns their natural widths.
   */
  width?: InputSignal<ColSize>;
  /**
   * Move columns to the right 1-11 columns.
   * https://getbootstrap.com/docs/5.1/layout/columns/#offsetting-columns
   */
  offset?: InputSignal<NumberAttr | undefined>;
  /**
   * Use for controlling the visual order of your Cols.
   * https://getbootstrap.com/docs/5.1/layout/columns/#order-classes
   */
  order?: InputSignal<ColOrder>;
  /**
   * Use to vertically align columns individually.
   * https://getbootstrap.com/docs/5.1/layout/columns/#alignment
   */
  align?: InputSignal<ColAlign>;
  /**
   * Use to toggle a flex item’s ability to grow to fill available space.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#grow-and-shrink
   */
  grow?: InputSignal<0 | 1 | undefined>;
  /**
   * Use to toggle a flex item’s ability to shrink if necessary.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#grow-and-shrink
   */
  shrink?: InputSignal<0 | 1 | undefined>;
};

@Component({
  selector: "tedi-col",
  templateUrl: "./col.component.html",
  styleUrl: "./col.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColComponent implements ColProps {
  element = input<ColElement>();
  class = input<string>("");
  width = input<ColSize>();
  offset = input<NumberAttr | undefined>();
  order = input<ColOrder>();
  align = input<ColAlign>();
  grow = input<0 | 1 | undefined>();
  shrink = input<0 | 1 | undefined>();

  constructor(private rowContext: RowContextService) {}

  colElement = computed(() => {
    if (this.element() !== undefined) {
      return this.element();
    }

    const rowElement = this.rowContext.element();

    if (rowElement === "ul" || rowElement === "ol") {
      return "li";
    } else if (rowElement === "span") {
      return "span";
    } else {
      return "div";
    }
  });

  classes = computed(() => {
    const classList = ["col"];

    if (this.align()) {
      classList.push(`align-self-${this.align()}`);
    }

    if (this.offset()) {
      classList.push(`offset-${this.offset()}`);
    }

    if (this.order()) {
      classList.push(`offset-${this.offset()}`);
    }

    if (this.width()) {
      classList.push(`col-${this.width()}`);
    }

    if (this.grow() !== undefined) {
      classList.push(`flex-grow-${this.grow()}`);
    }

    if (this.shrink() !== undefined) {
      classList.push(`flex-shrink-${this.shrink()}`);
    }

    if (this.class()) {
      classList.push(this.class());
    }

    return classList.join(" ");
  });
}
