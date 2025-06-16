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
