import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

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
export class ListComponent {
  /**
   * Is list styled?
   * @default true
   */
  styled = input<boolean>(true);

  classes = computed(() => {
    const classList = ["tedi-list"];

    if (!this.styled()) {
      classList.push("tedi-list--unstyled");
    }

    return classList.join(" ");
  });
}
