import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  ViewEncapsulation,
} from "@angular/core";

type ListItemProps = {
  /**
   * Additional class
   */
  class?: InputSignal<string>;
};

@Component({
  selector: "tedi-list-item",
  standalone: true,
  templateUrl: "./list-item.component.html",
  styleUrl: "./list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ListItemComponent implements ListItemProps {
  class = input<string>("");

  classes = computed(() => {
    const classList = ["tedi-list__item"];

    if (this.class()) {
      classList.push(this.class());
    }

    return classList.join(" ");
  });
}
