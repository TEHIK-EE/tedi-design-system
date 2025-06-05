import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-sidenav",
  standalone: true,
  templateUrl: "./sidenav.component.html",
  styleUrl: "./sidenav.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class SideNavComponent {
  /**
   * Show dividers between items
   * @default true
   */
  dividers = input<boolean>(true);

  classes = computed(() => {
    const classList = ["tedi-sidenav"];

    if (this.dividers()) {
      classList.push("tedi-sidenav--dividers");
    }

    return classList.join(" ");
  });
}
