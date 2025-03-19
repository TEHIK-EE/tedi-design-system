import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
} from "@angular/core";

type ListElement = "ul" | "ol";
type ListStyle = "styled" | "none";

type ListProps = {
  /**
   * Additional class
   */
  class?: InputSignal<string>;
  /**
   * Base element
   * @default ul
   */
  element?: InputSignal<ListElement>;
  /**
   * List style
   * @default styled
   */
  style?: InputSignal<ListStyle>;
};

@Component({
  selector: "tedi-list",
  standalone: true,
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class ListComponent implements ListProps {
  class = input<string>("");
  element = input<ListElement>("ul");
  style = input<ListStyle>("styled");

  classes = computed(() => {
    const element = this.element();
    const style = this.style();
    const className = this.class();

    const classList = [
      "tedi-list",
      `tedi-list--${element === "ul" ? "unordered" : "ordered"}`,
      `tedi-list--style-${style}`,
    ];

    if (className) {
      classList.push(className);
    }

    return classList.join(" ");
  });
}
