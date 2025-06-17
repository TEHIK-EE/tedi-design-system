import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-sidenav-group-title",
  standalone: true,
  templateUrl: "./sidenav-group-title.component.html",
  styleUrl: "./sidenav-group-title.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class SideNavGroupTitleComponent {
  classes = computed(() => {
    const classList = ["tedi-sidenav-group-title"];
    return classList.join(" ");
  });
}
