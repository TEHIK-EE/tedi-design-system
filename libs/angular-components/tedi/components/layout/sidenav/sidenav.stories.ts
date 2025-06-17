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
            <nav tedi-sidenav>
                <tedi-sidenav-item icon="home" href="#">
                  Home
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="account_box" href="#">
                  Clients
                </tedi-sidenav-item>
                <tedi-sidenav-group-title>Group title</tedi-sidenav-group-title>
                <tedi-sidenav-item icon="child_care">
                  Children
                  <tedi-sidenav-dropdown>
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
                <tedi-sidenav-item icon="assignment" href="#">
                  This item is a link, but also has a dropdown
                  <tedi-sidenav-dropdown>
                    <tedi-sidenav-dropdown-group>
                      <tedi-sidenav-dropdown-item href="#">
                        First item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item href="#">
                        Second item
                      </tedi-sidenav-dropdown-item>
                    </tedi-sidenav-dropdown-group>
                    <tedi-sidenav-dropdown-group>
                      <tedi-sidenav-dropdown-item href="#">
                        Third item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item href="#">
                        Fourth item
                      </tedi-sidenav-dropdown-item>
                      <tedi-sidenav-dropdown-item href="#">
                        Fifth item
                      </tedi-sidenav-dropdown-item>
                    </tedi-sidenav-dropdown-group>
                  </tedi-sidenav-dropdown>
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="payments" routerLink="#" [selected]="true">
                  This is a router link
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="inventory">
                  This item has dropdown with group titles
                  <tedi-sidenav-dropdown>
                    <tedi-sidenav-group-title>First title</tedi-sidenav-group-title>
                    <tedi-sidenav-dropdown-item>
                      First item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Second item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Third item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-group-title>Second title</tedi-sidenav-group-title>
                    <tedi-sidenav-dropdown-item>
                      Fourth item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Fifth item
                    </tedi-sidenav-dropdown-item>
                  </tedi-sidenav-dropdown>
                </tedi-sidenav-item>
            </nav>
        </div>
    `,
  }),
};
