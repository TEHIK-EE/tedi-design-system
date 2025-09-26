import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import {
  SeparatorComponent,
  SeparatorColor,
} from "../../separator/separator.component";
import { TextComponent } from "../../../base/text/text.component";
import { TimelineComponent } from "../timeline.component";
import { NgClass } from "@angular/common";

type TimelineItemState = "current" | "past" | "future";

@Component({
  standalone: true,
  selector: "tedi-timeline-item",
  imports: [SeparatorComponent, TextComponent, NgClass],
  templateUrl: "./timeline-item.component.html",
  styleUrl: "./timeline-item.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemComponent implements OnInit, OnDestroy {
  /** Item timings */
  timings = input<string[]>([]);

  timeline = inject(TimelineComponent, { optional: true });

  ngOnInit() {
    if (!this.timeline) {
      return;
    }

    this.timeline.registerItem(this);
  }

  ngOnDestroy() {
    if (!this.timeline) {
      return;
    }

    this.timeline.unregisterItem(this);
  }

  isLast = computed(() => {
    const timeline = this.timeline;

    if (!timeline) {
      return false;
    }

    const currentIndex = timeline.items().findIndex((t) => t === this);

    if (currentIndex === timeline.items().length - 1) {
      return true;
    } else {
      return false;
    }
  });

  state = computed<TimelineItemState>(() => {
    const timeline = this.timeline;
    const activeItemIndex = timeline?.activeIndex();

    if (!timeline || activeItemIndex === undefined) {
      return "future";
    }

    const currentIndex = timeline.items().findIndex((t) => t === this);

    if (activeItemIndex === currentIndex) {
      return "current";
    } else if (activeItemIndex > currentIndex) {
      return "past";
    } else {
      return "future";
    }
  });

  color = computed<SeparatorColor>(() => {
    if (this.state() === "current" || this.state() === "past") {
      return "accent";
    }

    return "secondary";
  });
}
