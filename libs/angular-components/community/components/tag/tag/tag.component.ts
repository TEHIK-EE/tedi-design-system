import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent, SpinnerComponent } from "tedi/components";

export type TagType = "primary" | "secondary" | "danger";

@Component({
  selector: "tedi-tag",
  imports: [SpinnerComponent, IconComponent],
  templateUrl: "./tag.component.html",
  styleUrl: "./tag.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-tag]": "true",
    "[class.tedi-tag--loading]": "loading()",
    "[class.tedi-tag--closable]": "closable()",
    "[class]": "classes()",
  },
})
export class TagComponent {
  loading = input(false);
  closable = input(false);
  type = input<TagType>("primary");

  closed = output();

  classes = computed(() => {
    const classList = [];
    if (this.type()) {
      classList.push(`tedi-tag--${this.type()}`);
    }
    return classList.join(" ");
  });

  handleClose() {
    this.closed.emit();
  }
}
