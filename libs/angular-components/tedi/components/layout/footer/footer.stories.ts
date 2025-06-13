import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { FooterComponent } from "./footer.component";
import { FooterBodyComponent } from "./footer-body/footer-body.component";
import { FooterLinksComponent } from "./footer-links/footer-links.component";
import { FooterSideComponent } from "./footer-side/footer-side.component";
import { FooterBottomComponent } from "./footer-bottom/footer-bottom.component";
import { TextComponent } from "@tehik-ee/tedi-angular/tedi";

export default {
  title: "TEDI-Ready Angular/Layout/Footer",
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FooterComponent,
        FooterBodyComponent,
        FooterLinksComponent,
        FooterSideComponent,
        FooterBottomComponent,
        TextComponent,
      ],
    }),
  ],
  parameters: {
    status: {
      type: ["devComponent", "breakpointSupport"],
    },
  },
} as Meta<FooterComponent>;

type Story = StoryObj<FooterComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <tedi-footer>
        <tedi-footer-side tedi-footer-start>
          <tedi-icon name="tehik_logo" color="white" />
        </tedi-footer-side>
        <tedi-footer-body>
          <tedi-footer-links heading="Category 1">
            <a tedi-text color="white" href="#">Text link 1</a>
            <a tedi-text color="white" href="#">Text link 2</a>
            <a tedi-text color="white" href="#">Text link 3</a>
          </tedi-footer-links>
          <tedi-footer-links heading="Category 2">
            <a tedi-text color="white" href="#">Text link 4</a>
            <a tedi-text color="white" href="#">Text link 5</a>
          </tedi-footer-links>
        </tedi-footer-body>
        <tedi-footer-side tedi-footer-end>
          <tedi-icon name="facebook" color="white" />
        </tedi-footer-side>
        <tedi-footer-bottom>
          <a tedi-text color="white" href="#">Privacy Policy</a>
          <a tedi-text color="white" href="#">Terms of Service</a>
        </tedi-footer-bottom>
      </tedi-footer>
    `,
  }),
};
