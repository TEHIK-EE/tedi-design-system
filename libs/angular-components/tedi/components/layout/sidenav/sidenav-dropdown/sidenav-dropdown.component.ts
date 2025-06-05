import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
} from "@angular/core";
import { CollapseComponent } from "../../../buttons/collapse/collapse.component";

@Component({
  selector: "tedi-sidenav-dropdown",
  standalone: true,
  templateUrl: "./sidenav-dropdown.component.html",
  styleUrl: "./sidenav-dropdown.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CollapseComponent],
  host: {
    "[class]": "classes()",
  },
})
export class SideNavDropdownComponent {
  classes = computed(() => {
    const classList = ["tedi-sidenav-dropdown"];

    return classList.join(" ");
  });
}
