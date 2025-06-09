import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { SideNavComponent } from "./sidenav.component";
import { SideNavItemComponent } from "./sidenav-item/sidenav-item.component";
import { SideNavDropdownComponent } from "./sidenav-dropdown/sidenav-dropdown.component";
import { SideNavDropdownItemComponent } from "./sidenav-dropdown-item/sidenav-dropdown-item.component";
import { SideNavDropdownGroupComponent } from "./sidenav-dropdown-group/sidenav-dropdown-group.component";

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
            <tedi-sidenav>
                <tedi-sidenav-item [selected]="true" icon="dashboard">
                  Normal text selected
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard">
                  Normal very long text in multiple lines
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard">
                  Normal text
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard">
                  Normal text dropdown
                  <tedi-sidenav-dropdown>
                    <tedi-sidenav-dropdown-item>
                      Sub item
                    </tedi-sidenav-dropdown-item>
                    <tedi-sidenav-dropdown-item>
                      Sub item
                    </tedi-sidenav-dropdown-item>
                  </tedi-sidenav-dropdown>
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard">
                  Nested dropdown
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
                <tedi-sidenav-item icon="dashboard" href="/asd">
                  External link
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard" href="/asd">
                  External link dropdown
                  <tedi-sidenav-dropdown>
                    <tedi-sidenav-dropdown-item>
                      Sub item
                    </tedi-sidenav-dropdown-item>
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
                  </tedi-sidenav-dropdown>
                </tedi-sidenav-item>
            </tedi-sidenav>
        </div>
    `,
  }),
};
