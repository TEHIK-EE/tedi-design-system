import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { SideNavComponent } from "./sidenav.component";
import { SideNavItemComponent } from "./sidenav-item/sidenav-item.component";
import { SideNavDropdownComponent } from "./sidenav-dropdown/sidenav-dropdown.component";
import { SideNavDropdownItemComponent } from "./sidenav-dropdown-item/sidenav-dropdown-item.component";
import { SideNavDropdownGroupComponent } from "./sidenav-dropdown-group/sidenav-dropdown-group.component";
import { SideNavGroupTitleComponent } from "./sidenav-group-title/sidenav-group-title.component";

export default {
  title: "TEDI-Ready Angular/Layout/SideNav",
  component: SideNavComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SideNavComponent,
        SideNavItemComponent,
        SideNavDropdownComponent,
        SideNavDropdownItemComponent,
        SideNavDropdownGroupComponent,
        SideNavGroupTitleComponent,
      ],
    }),
  ],
} as Meta<SideNavComponent>;

export const Default: StoryObj<SideNavComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="height: 1024px;">
            <nav tedi-sidenav size="large">
                <tedi-sidenav-item icon="dashboard" [selected]="true">
                  Selected text
                  <tedi-sidenav-dropdown>
                    <tedi-sidenav-dropdown-item>
                      First item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item [selected]="true">
                      Second item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Third item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Fourth item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Fifth item
                    </tedi-sidenav-dropdown-item>
                  </tedi-sidenav-dropdown>
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard">
                  Normal text
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard" [selected]="true">
                  Nested dropdown
                  <tedi-sidenav-dropdown>
                    <tedi-sidenav-group-title>Items</tedi-sidenav-group-title>
                    <tedi-sidenav-dropdown-item>
                      First item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Second item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-group>
                      <tedi-sidenav-dropdown-item>
                        First item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item>
                        Second item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item>
                        Third item
                      </tedi-sidenav-dropdown-item>
                    </tedi-sidenav-dropdown-group>
                    <tedi-sidenav-dropdown-group>
                      <tedi-sidenav-dropdown-item>
                        First item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item>
                        Second item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item>
                        Third item
                      </tedi-sidenav-dropdown-item>
                    </tedi-sidenav-dropdown-group>
                  </tedi-sidenav-dropdown>
                </tedi-sidenav-item>
                <tedi-sidenav-group-title>Links</tedi-sidenav-group-title>
                <tedi-sidenav-item icon="dashboard" href="/asd">
                  External link
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard" href="/asd">
                  External link dropdown
                  <tedi-sidenav-dropdown>
                    <tedi-sidenav-dropdown-group>
                      <tedi-sidenav-dropdown-item>
                        Sub item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item>
                        Sub item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item>
                        Sub item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item>
                        Sub item
                      </tedi-sidenav-dropdown-item>
                    </tedi-sidenav-dropdown-group>
                  </tedi-sidenav-dropdown>
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard" routerLink="/test">
                  Router link
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard" routerLink="/test">
                  Router link dropdown
                  <tedi-sidenav-dropdown>
                    <tedi-sidenav-dropdown-item>
                      Sub item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Sub item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Sub item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Sub item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Sub item
                    </tedi-sidenav-dropdown-item>
                  </tedi-sidenav-dropdown>
                </tedi-sidenav-item>
            </nav>
        </div>
    `,
  }),
};
