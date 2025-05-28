import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { IconComponent, SpinnerComponent } from "@tehik-ee/tedi-angular/tedi";

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
  /**
   * Whether the tag is in loading state.
   * When true, a spinner will be displayed inside the tag.
   * @default false
   */
  loading = input(false);

  /**
   * Whether the tag can be closed.
   * When true, a close button will be displayed that emits the 'closed' event when clicked.
   * @default false
   */
  closable = input(false);

  /**
   * The visual style of the tag.
   * Possible values: 'primary', 'secondary', 'danger'
   * @default "primary"
   */
  type = input<TagType>("primary");

  /**
   * Event emitted when the close button is clicked.
   * Only relevant when closable is true.
   */
  closed = output<Event>();

  classes = computed(() => {
    const classList = [];
    if (this.type()) {
      classList.push(`tedi-tag--${this.type()}`);
    }
    return classList.join(" ");
  });

  handleClose(event: Event) {
    this.closed.emit(event);
  }
}
