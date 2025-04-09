import { argsToTemplate, StoryFn } from "@storybook/angular";
import { CardColors } from "../card-colors.directive";
import { CardHeaderVariant } from "../card-header/card-header.component";
import {
  CardAccentBorder,
  CardComponent,
  CardSpacing,
} from "../card.component";

export const renderCardStory: StoryFn<CardComponent> = (args) => ({
  props: args,
  template: `
    <tedi-card ${argsToTemplate(args)}>
      <tedi-card-header variant="secondary">
        <h3 tedi-text color="secondary">Header</h3>
      </tedi-card-header>
      <tedi-card-content>
        Cabbage, comprising several cultivars of Brassica oleracea, is a leafy
        green, red (purple), or white (pale green) biennial plant grown as an
        annual vegetable crop for its dense-leaved heads.
      </tedi-card-content>
    </tedi-card>
  `,
});

export const renderCardHeaders = () => {
  const variants: CardHeaderVariant[] = [
    "primary",
    "secondary",
    "tertiary",
    "brand",
    "brand-dark",
  ];
  const getColor = (variant: CardHeaderVariant) => {
    return variant.startsWith("brand") ? "white" : "secondary";
  };
  return {
    template: `<div [style]="{ display: 'flex', 'flex-direction': 'column', gap: '10px' }">
    ${variants
      .map((variant) => {
        return `<tedi-card>
        <tedi-card-header variant="${variant}">
          <h3 tedi-text
            color="${getColor(variant)}"
            modifiers="capitalize-first"
          >
            ${variant} header
          </h3>
        </tedi-card-header>
      </tedi-card>`;
      })
      .join("")}
  </div> `,
  };
};

export const renderMultipleContentsStory = () => {
  return {
    template: `
      <tedi-card>
        <tedi-card-header variant="brand">
          <h3 tedi-text color="white">Header</h3>
        </tedi-card-header>
        <tedi-card-content [hasSeparator]="true">Content</tedi-card-content>
        <tedi-card-content [hasSeparator]="true" background="secondary">Content 2</tedi-card-content>
        <tedi-card-content [hasSeparator]="true">Content 3</tedi-card-content>
      </tedi-card>
    `,
  };
};

export const renderCardRowsStory = () => {
  return {
    template: `<tedi-card>
    <tedi-card-row [hasSeparator]="true"
      ><tedi-card-content [hasSeparator]="true">Content 1.1</tedi-card-content>
      <tedi-card-content [hasSeparator]="true"
        >Content 1.2</tedi-card-content
      ></tedi-card-row
    >
    <tedi-card-row
      ><tedi-card-content [hasSeparator]="true">Content 2.1</tedi-card-content>
      <tedi-card-content [hasSeparator]="true"
        >Content 2.2</tedi-card-content
      ></tedi-card-row
    >
    <tedi-card-row
      ><tedi-card-content [hasSeparator]="true">Content 3.1</tedi-card-content>
      <tedi-card-content [hasSeparator]="true"
        >Content 3.2</tedi-card-content
      ></tedi-card-row
    >
  </tedi-card>`,
  };
};

export const renderSplitCardStory = () => {
  return {
    template: `<tedi-card>
    <tedi-card-row
      ><tedi-card-content
        >Cabbage, comprising several cultivars of Brassica oleracea, is a leafy
        green, red (purple), or white (pale green) biennial plant grown as an
        annual vegetable crop for its dense-leaved heads.</tedi-card-content
      >
      <tedi-card-content background="secondary"
        >Cabbage, comprising several cultivars of Brassica oleracea, is a leafy
        green, red (purple), or white (pale green) biennial plant grown as an
        annual vegetable crop for its dense-leaved heads.</tedi-card-content
      ></tedi-card-row
    >
  </tedi-card>`,
  };
};

export const renderCardBackgroundsStory = () => {
  const colors: CardColors[] = [
    "primary",
    "secondary",
    "tertiary",
    "brand-tertiary",
    "brand-primary",
    "brand-secondary",
    "brand-quaternary",
    "success-primary",
    "accent",
  ];
  const getColor = (bg: CardColors) => {
    return ["brand-primary", "brand-secondary"].includes(bg)
      ? "white"
      : "secondary";
  };
  return {
    template: `<div class="story-grid">
    ${colors
      .map((bg) => {
        return `<div>
        <p tedi-text modifiers="bold">${bg}</p>
        <tedi-card background="${bg}">
          <tedi-card-content>
            <p tedi-text color="${getColor(bg)}">
              Cabbage, comprising several cultivars of Brassica oleracea, is a
              leafy green, red (purple), or white (pale green) biennial plant
              grown as an annual vegetable crop for its dense-leaved
              heads.
            </p>
          </tedi-card-content>
        </tedi-card>
      </div>`;
      })
      .join("")}
  </div>`,
  };
};

export const renderCardSpacingsStory = () => {
  const spacings: CardSpacing[] = ["xs", "sm", "md", "lg", "none"];
  return {
    template: `<div class="story-grid">
    ${spacings
      .map((spacing) => {
        return `<div>
        <p tedi-text modifiers="bold">${spacing}</p>
        <tedi-card spacing="${spacing}">
          <tedi-card-content>
            <p tedi-text color="secondary">
              Cabbage, comprising several cultivars of Brassica oleracea, is a
              leafy green, red (purple), or white (pale green) biennial plant
              grown as an annual vegetable crop for its dense-leaved
              heads.
            </p>
          </tedi-card-content>
        </tedi-card>
      </div>`;
      })
      .join("")}
  </div>`,
  };
};

export const renderCardAccentBordersStory = () => {
  const accentBorders: CardAccentBorder[] = [
    "info",
    "success",
    "warning",
    "danger",
  ];
  return {
    template: `<div [style]="{ display: 'flex', 'flex-direction': 'column', gap: '10px' }">
    ${accentBorders
      .map((accentBorder) => {
        return `<div>
        <p tedi-text modifiers="bold">${accentBorder}</p>
        <tedi-card accentBorder="${accentBorder}">
          <tedi-card-content>
            <p tedi-text color="secondary">
              Cabbage, comprising several cultivars of Brassica oleracea, is a
              leafy green, red (purple), or white (pale green) biennial plant
              grown as an annual vegetable crop for its dense-leaved
              heads.
            </p>
          </tedi-card-content>
        </tedi-card>
      </div>`;
      })
      .join("")}
  </div>`,
  };
};

export const renderTimelineCardStory = () => {
  return {
    template: `<tedi-card>
    <tedi-card-row
      ><tedi-card-content [timeline]="true" [autoWidth]="true"
        >08.12.2024</tedi-card-content
      >
      <tedi-card-content>Covid-19</tedi-card-content></tedi-card-row
    >
  </tedi-card>`,
  };
};

export const renderIconCardStory = () => {
  return {
    template: `<tedi-card>
    <tedi-card-row>
      <tedi-card-content
        [hasSeparator]="true"
        [autoWidth]="true"
        background="secondary"
      >
        <tedi-icon name="monitor_heart" color="secondary" />
      </tedi-card-content>
      <tedi-card-content>
        <p tedi-text color="secondary">
          Kodeiin + Paratsemool, 30mg + 500mg
        </p>
      </tedi-card-content>
    </tedi-card-row>
  </tedi-card>`,
  };
};

export const renderNestedCardsStory = () => {
  return {
    template: `
      <tedi-card>
        <tedi-card-header variant="brand">
          <h3 tedi-text color="white">Title</h3>
        </tedi-card-header>
        <tedi-card-content [hasSeparator]="true">
          <div [style]="{ display: 'flex', 'flex-direction': 'column', gap: '10px' }">
            <p tedi-text modifiers="h2" color="brand">Permanent treatment</p>
            <p tedi-text>
              Your permanent medications and medical devices dispensed in the last
              6 months.
            </p>
            <p tedi-text modifiers="h3">Medications</p>

            <tedi-card background="brand-tertiary">
              <tedi-card-content>
                Cabbage, comprising several cultivars of Brassica oleracea, is a
                leafy green, red (purple), or white (pale green) biennial plant
                grown as an annual vegetable crop for its dense-leaved
                heads.
              </tedi-card-content>
            </tedi-card>

            <tedi-card background="brand-tertiary">
              <tedi-card-content>
                Cabbage, comprising several cultivars of Brassica oleracea, is a
                leafy green, red (purple), or white (pale green) biennial plant
                grown as an annual vegetable crop for its dense-leaved
                heads.
              </tedi-card-content>
            </tedi-card>
          </div>
        </tedi-card-content>

        <tedi-card-content>
          <div [style]="{ display: 'flex', 'flex-direction': 'column', gap: '10px' }">
            <p tedi-text modifiers="h2" color="brand">Temporary treatment</p>
            <p tedi-text>
              Your medications and medical devices used if needed or during a
              certain period of time.
            </p>
            <p tedi-text modifiers="h3">Medications</p>

            <tedi-card background="brand-tertiary">
              <tedi-card-content>
                Cabbage, comprising several cultivars of Brassica oleracea, is a
                leafy green, red (purple), or white (pale green) biennial plant
                grown as an annual vegetable crop for its dense-leaved
                heads.
              </tedi-card-content>
            </tedi-card>

            <tedi-card background="brand-tertiary">
              <tedi-card-content>
                Cabbage, comprising several cultivars of Brassica oleracea, is a
                leafy green, red (purple), or white (pale green) biennial plant
                grown as an annual vegetable crop for its dense-leaved
                heads.
              </tedi-card-content>
            </tedi-card>
          </div>
        </tedi-card-content>
      </tedi-card>
    `,
  };
};

export const renderCardPaddingsStory = () => {
  return {
    template: `<tedi-card padding="lg"
    ><tedi-card-content background="secondary" [padding]="{ left: 'xs' }"
      >Card has lg padding. Card content has xs left padding.</tedi-card-content
    ></tedi-card
  >`,
  };
};
