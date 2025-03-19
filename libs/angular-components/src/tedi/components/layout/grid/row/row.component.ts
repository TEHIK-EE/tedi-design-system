import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Injectable,
  input,
  InputSignal,
  signal,
} from "@angular/core";

type RowElement = "div" | "ul" | "ol" | "span";
type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
type Spacer = 0 | 1 | 2 | 3 | 4 | 5 | undefined;
type Gutter = 0 | 1 | 2 | 3 | 4 | 5 | undefined;
type JustifyContent =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly"
  | undefined;
type AlignItems =
  | "start"
  | "center"
  | "end"
  | "baseline"
  | "stretch"
  | undefined;
type Direction =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse"
  | undefined;
type Wrap = "wrap" | "nowrap" | "wrap-reverse" | undefined;

type RowProps = {
  /**
   * Base element.
   * @default div
   */
  element?: InputSignal<RowElement>;
  /**
   * Additional class.
   */
  class?: InputSignal<string>;
  /**
   * The number of columns that will fit next to each other.
   * Use `auto` to give columns their natural widths.
   * @default auto
   */
  cols?: InputSignal<Cols>;
  /**
   * Use justify-content utilities to change the alignment of items on the main axis.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#justify-content
   */
  justifyContent?: InputSignal<JustifyContent>;
  /**
   * Use align-items utilities to change the alignment of items on the cross axis.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#align-items
   */
  alignItems?: InputSignal<AlignItems>;
  /**
   * Add gap between items.
   * https://getbootstrap.com/docs/5.1/utilities/spacing/#gap
   */
  gap?: InputSignal<Spacer>;
  /**
   * Change gutter between items.
   * https://getbootstrap.com/docs/5.0/layout/gutters/
   */
  gutter?: InputSignal<Gutter>;
  gutterX?: InputSignal<Gutter>;
  gutterY?: InputSignal<Gutter>;
  /**
   * Set the direction of flex items in a flex container with direction utilities.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#direction
   */
  direction?: InputSignal<Direction>;
  /**
   * Change how flex items wrap in a flex container.
   * https://getbootstrap.com/docs/5.1/utilities/flex/#wrap
   */
  wrap?: InputSignal<Wrap>;
};

@Injectable()
export class RowContextService {
  element = signal<RowElement>("div");

  setElement(element: RowElement) {
    this.element.set(element);
  }
}

@Component({
  selector: "tedi-row",
  templateUrl: "./row.component.html",
  styleUrl: "./row.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RowContextService],
})
export class RowComponent implements RowProps {
  element = input<RowElement>("div");
  class = input<string>("");
  cols = input<Cols>("auto");
  justifyContent = input<JustifyContent>();
  alignItems = input<AlignItems>();
  gap = input<Spacer>();
  gutter = input<Gutter>();
  gutterX = input<Gutter>();
  gutterY = input<Gutter>();
  direction = input<Direction>();
  wrap = input<Wrap>();

  constructor(private rowContext: RowContextService) {
    effect(
      () => {
        this.rowContext.setElement(this.element());
      },
      { allowSignalWrites: true },
    );
  }

  classes = computed(() => {
    const classList = ["row", `row-cols-${this.cols()}`];

    if (this.justifyContent()) {
      classList.push(`justify-content-${this.justifyContent()}`);
    }

    if (this.alignItems()) {
      classList.push(`align-items-${this.alignItems()}`);
    }

    if (this.gap()) {
      classList.push(`gap-${this.gap()}`);
    }

    if (this.gutter()) {
      classList.push(`g-${this.gutter()}`);
    }

    if (this.gutterX()) {
      classList.push(`gx-${this.gutterX()}`);
    }

    if (this.gutterY()) {
      classList.push(`gy-${this.gutterY()}`);
    }

    if (this.direction()) {
      classList.push(`flex-${this.direction()}`);
    }

    if (this.wrap()) {
      classList.push(`flex-${this.wrap()}`);
    }

    if (this.class()) {
      classList.push(this.class());
    }

    return classList.join(" ");
  });
}
