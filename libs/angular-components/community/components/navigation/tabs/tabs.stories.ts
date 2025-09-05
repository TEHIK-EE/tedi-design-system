import { Meta, moduleMetadata, StoryFn, StoryObj } from "@storybook/angular";

import { CommonModule } from "@angular/common";
import { TabsComponent } from "./tabs.component";
import { TabComponent } from "./tab/tab.component";
import { TabContentComponent } from "./tab-content/tab-content.component";

/**
 * <p>Tabs allow to group content into separate chunks to be displayed one at the time.</p>
 * <p>TEDI tabs can be used as:</p>
 * - buttons - to separate content on one page. Use `tedi-tab-content` component to display the content.
 * - links - to separate content between sub-routes. Use `router-outlet` to display the content.
 */
export default {
  title: "Community/Navigation/Tabs",
  component: TabComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, TabsComponent, TabComponent, TabContentComponent],
    }),
  ],
  argTypes: {
    tabId: {
      description: "Tab unique id",
      table: {
        category: "tab",
        type: { summary: "string" },
      },
    },
    selected: {
      description:
        "Whether tab is initially selected. Should be used only for non routed tabs",
      table: {
        category: "tab",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "Whether tab is disabled",
      table: {
        category: "tab",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    contentTabId: {
      name: "tabId",
      description: "Id that matches `tabId` given to the `tedi-tab` component",
      table: {
        category: "tab-content",
        type: { summary: "string" },
      },
    },
  },
} as Meta<TabComponent>;

const TabsTemplate: StoryFn<TabComponent> = ({ ...args }) => ({
  props: { ...args },
  template: `
    <tedi-tabs>
      <button tedi-tab [selected]="true" tabId="tab-1">Tab 1</button>
      <button tedi-tab disabled tabId="tab-2">Tab 2 (disabled)</button>
      <button tedi-tab tabId="tab-3">Tab 3</button>
      <tedi-tab-content tabId="tab-1">
        Tab 1 content
      </tedi-tab-content>
      <tedi-tab-content tabId="tab-2">
        Tab 2 content
      </tedi-tab-content>
      <tedi-tab-content tabId="tab-3">
        Tab 3 content
      </tedi-tab-content>
    </tedi-tabs>
  `,
});

const RoutedTabTemplate: StoryFn<TabComponent> = ({ ...args }) => ({
  props: { ...args },
  template: `
    <tedi-tabs>
      <a tedi-tab routerLink="1" tabId="tab-1">Tab 1</a>
      <a tedi-tab routerLink="2" tabId="tab-2">Tab 2</a>
      <a tedi-tab routerLink="3">Tab 3</a>
      
      router-outlet goes here
    </tedi-tabs>
  `,
});

type TableStylesStory = StoryObj<TabComponent>;

export const Default: TableStylesStory = {
  render: TabsTemplate,
};

export const RoutedTabs: TableStylesStory = {
  render: RoutedTabTemplate,
};
