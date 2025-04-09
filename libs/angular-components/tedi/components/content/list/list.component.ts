import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { InputsWithSignals } from "../../../types/inputs.type";

export type ListInputs = {
  /**
   * Is list styled?
   * @default true
   */
  styled: boolean;
};

@Component({
  selector: "ul[tedi-list], ol[tedi-list]",
  standalone: true,
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  }
})
export class ListComponent implements InputsWithSignals<ListInputs> {
  styled = input<boolean>(true);

  classes = computed(() => {
    const classList = ["tedi-list"];

    if (!this.styled()) {
      classList.push("tedi-list--unstyled");
    }

    return classList.join(" ");
  });
}
