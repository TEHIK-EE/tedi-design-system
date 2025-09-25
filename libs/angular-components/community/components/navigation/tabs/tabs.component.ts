import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  Injector,
  OnInit,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import {
  ClosingButtonComponent,
  IconComponent,
  TediTranslationPipe,
} from "@tehik-ee/tedi-angular/tedi";

import { TabContentComponent } from "./tab-content/tab-content.component";
import { TabComponent } from "./tab/tab.component";
import { FocusKeyManager } from "@angular/cdk/a11y";
import { CardComponent, CardContentComponent } from "../../cards";

@Component({
  selector: "tedi-tabs",
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    ClosingButtonComponent,
    IconComponent,
    TediTranslationPipe,
  ],
  templateUrl: "./tabs.component.html",
  styleUrl: "./tabs.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-tabs]": "true",
    "(keydown)": "onKeyDown($event)",
  },
})
export class TabsComponent implements OnInit {
  private injector = inject(Injector);
  mobileTabsOpened = signal(false);
  private tabs = contentChildren(TabComponent);
  private tabContents = contentChildren(TabContentComponent);
  private keyManager?: FocusKeyManager<TabComponent>;

  activeTabId = computed(() =>
    this.tabs()
      .find((tab) => tab.isTabActive())
      ?.tabId(),
  );
  activeTabContent = computed(() =>
    this.tabContents()
      .find((content) => content.tabId() === this.activeTabId())
      ?.content(),
  );

  onActiveTabChanges(tabs: readonly TabComponent[]) {
    tabs.forEach((tab) => {
      tab.tabSelected.subscribe(() => {
        this.mobileTabsOpened.set(false);
        tabs.forEach((otherTab) => {
          if (otherTab !== tab) {
            otherTab.selected.set(false);
          }
        });
      });
    });
  }

  onKeyDown(event: KeyboardEvent) {
    this.keyManager?.onKeydown(event);
  }

  constructor() {
    effect(() => {
      const tabs = this.tabs();
      this.onActiveTabChanges(tabs);
    });
  }

  ngOnInit() {
    this.keyManager = new FocusKeyManager(this.tabs, this.injector)
      .withWrap()
      .withHorizontalOrientation("ltr");
  }
}
