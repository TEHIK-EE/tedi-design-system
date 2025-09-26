import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { TimelineItemComponent } from "./timeline-item/timeline-item.component";

@Component({
  standalone: true,
  selector: "tedi-timeline",
  template: "<ng-content />",
  styleUrl: "./timeline.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  /** Index of active item */
  activeIndex = input<number>();

  items = signal<TimelineItemComponent[]>([]);

  registerItem(item: TimelineItemComponent) {
    this.items.update((list) => [...list, item]);
  }

  unregisterItem(item: TimelineItemComponent) {
    this.items.update((list) => list.filter((i) => i !== item));
  }
}
