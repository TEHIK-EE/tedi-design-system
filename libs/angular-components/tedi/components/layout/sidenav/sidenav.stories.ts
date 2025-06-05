import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { SideNavComponent } from "./sidenav.component";
import { SideNavItemComponent } from "./sidenav-item/sidenav-item.component";
import { SideNavDropdownComponent } from "./sidenav-dropdown/sidenav-dropdown.component";

export default {
  title: "TEDI-Ready Angular/Layout/SideNav",
  component: SideNavComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SideNavComponent,
        SideNavItemComponent,
        SideNavDropdownComponent,
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
                  Text
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard">
                  Text
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard">
                  Text
                  <tedi-sidenav-dropdown>
                    Sub item
                  </tedi-sidenav-dropdown>
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard" href="/asd">
                  External link
                </tedi-sidenav-item>
                <tedi-sidenav-item icon="dashboard" routerLink="/test">
                  Router link
                </tedi-sidenav-item>
            </tedi-sidenav>
        </div>
    `,
  }),
};
