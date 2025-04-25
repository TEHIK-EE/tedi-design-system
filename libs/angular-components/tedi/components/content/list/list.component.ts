import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type BulletColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "brand"
  | "brand-dark"
  | "success"
  | "warning"
  | "warning-dark"
  | "danger"
  | "white";

@Component({
  selector: "ul[tedi-list], ol[tedi-list]",
  standalone: true,
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class ListComponent {
  /**
   * Is list styled?
   * @default true
   */
  styled = input<boolean>(true);
  /**
   * Color of the list bullet.
   * @default primary
   */
  color = input<BulletColor>("primary");

  classes = computed(() => {
    const classList = ["tedi-list"];

    if (!this.styled()) {
      classList.push("tedi-list--unstyled");
    }

    if (this.color()) {
      classList.push(`tedi-list--bullet-color-${this.color()}`);
    }

    return classList.join(" ");
  });
}
