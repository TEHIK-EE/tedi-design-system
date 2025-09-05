import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import {
  ClosingButtonComponent,
  IconComponent,
  TediTranslationPipe,
} from "@tehik-ee/tedi-angular/tedi";
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards";
import { TabContentComponent } from "./tab-content/tab-content.component";
import { TabComponent } from "./tab/tab.component";

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
  },
})
export class TabsComponent {
  mobileTabsOpened = signal(false);
  private tabs = contentChildren(TabComponent);
  private tabContents = contentChildren(TabContentComponent);

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

  constructor() {
    effect(() => {
      const tabs = this.tabs();
      this.onActiveTabChanges(tabs);
    });
  }
}
