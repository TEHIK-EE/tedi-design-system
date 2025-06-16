import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { provideAnimations } from "@angular/platform-browser/animations";
import { FooterComponent } from "./footer.component";
import { FooterBodyComponent } from "./footer-body/footer-body.component";
import { FooterLinksComponent } from "./footer-links/footer-links.component";
import { FooterSideComponent } from "./footer-side/footer-side.component";
import { FooterBottomComponent } from "./footer-bottom/footer-bottom.component";
import { TextComponent } from "@tehik-ee/tedi-angular/tedi";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.12.16--work-in-progress-?node-id=6459-181755&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/512563-footer" target="_BLANK">Zeroheight ↗</a>
 *
 * The footer component is used to display the footer of the page. It can contain links, logos, and other content. The footer is responsive and adapts to different screen sizes.
 * It can be customized with different headings, icons, and link colors.
 *
 * It consists of several sub-components:
 * - `FooterBodyComponent`: Contains the main content of the footer, including links and headings.
 * - `FooterLinksComponent`: Represents a section of links with a heading and an optional icon.
 * - `FooterSideComponent`: Used for displaying logos or additional content on the sides of the footer.
 * - `FooterBottomComponent`: Displays additional links or information at the bottom of the footer.
 *
 */
export default {
  title: "TEDI-Ready Angular/Layout/Footer",
  component: FooterComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
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
      type: ["breakpointSupport"],
    },
  },
} as Meta<FooterComponent>;

type Story = StoryObj<FooterComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <tedi-footer>
        <tedi-footer-body>
          <tedi-footer-links heading="Heading" icon="account_circle">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
          <tedi-footer-links heading="Heading" icon="account_circle">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
           <tedi-footer-links heading="Heading" icon="account_circle">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
        </tedi-footer-body>
        <tedi-footer-side position="center" tedi-footer-end>
          <picture>
            <source
              srcset="SF-horizontal.png"
              alt="Logo"
              media="(max-width: 576px)"
            />
            <img src="SF-vertical.png" alt="Logo" />
          </picture>
        </tedi-footer-side>
      </tedi-footer>
    `,
  }),
};

export const NoLogos: Story = {
  render: () => ({
    template: `
      <tedi-footer>
        <tedi-footer-body>
          <tedi-footer-links heading="Heading">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
          <tedi-footer-links heading="Heading">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
           <tedi-footer-links heading="Heading">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
        </tedi-footer-body>
      </tedi-footer>
    `,
  }),
};

export const FooterBottom: Story = {
  render: () => ({
    template: `
      <tedi-footer>
        <tedi-footer-body>
          <tedi-footer-links heading="Heading" icon="account_circle">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
          <tedi-footer-links heading="Heading" icon="account_circle">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
           <tedi-footer-links heading="Heading" icon="account_circle">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
        </tedi-footer-body>
        <tedi-footer-bottom>
          <a tedi-text color="white" href="#">Link</a>
          <a tedi-text color="white" href="#">Link</a>
          <a tedi-text color="white" href="#">Link</a>
          <a tedi-text color="white" href="#">Link</a>
          <a tedi-text color="white" href="#">Link</a>
        </tedi-footer-bottom>
      </tedi-footer>
    `,
  }),
};

export const MobileCollapse: Story = {
  render: () => ({
    template: `
      <tedi-footer>
        <tedi-footer-body>
          <tedi-footer-links heading="Heading" icon="account_circle" [collapse]="true">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
          <tedi-footer-links heading="Heading" icon="account_circle" [collapse]="true">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
           <tedi-footer-links heading="Heading" icon="account_circle" [collapse]="true">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
        </tedi-footer-body>
        <tedi-footer-bottom>
          <a tedi-text color="white" href="#">Link</a>
          <a tedi-text color="white" href="#">Link</a>
          <a tedi-text color="white" href="#">Link</a>
          <a tedi-text color="white" href="#">Link</a>
          <a tedi-text color="white" href="#">Link</a>
        </tedi-footer-bottom>
      </tedi-footer>
    `,
  }),
};

export const LogoPositions: Story = {
  render: () => ({
    props: {
      logoPositions: ["start", "center", "end"],
    },
    template: `
    <ng-template ngFor let-position [ngForOf]="logoPositions">
    <br>
    <h4>Logo position: {{ position }}</h4>
      <tedi-footer>
        <tedi-footer-side position="{{ position }}" tedi-footer-start>
          <picture>
            <source
              srcset="SF-horizontal.png"
              alt="Logo"
              media="(max-width: 576px)"
            />
            <img src="SF-vertical.png" alt="Logo" />
          </picture>
        </tedi-footer-side>
        <tedi-footer-body>
          <tedi-footer-links heading="Heading" icon="account_circle">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
          <tedi-footer-links heading="Heading" icon="account_circle">
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
            <a tedi-text color="white" href="#">Link</a>
          </tedi-footer-links>
        </tedi-footer-body>
        <tedi-footer-side position="{{ position }}" tedi-footer-end>
          <picture>
            <source
              srcset="SF-horizontal.png"
              alt="Logo"
              media="(max-width: 576px)"
            />
            <img src="SF-vertical.png" alt="Logo" />
          </picture>
        </tedi-footer-side>
      </tedi-footer>
      <ng-template>
    `,
  }),
};
