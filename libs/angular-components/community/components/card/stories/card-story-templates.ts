import { Component } from "@angular/core";

import { IconComponent } from "../../../../tedi/components/base/icon/icon.component";
import { CardColors } from "../card-colors.directive";
import { CardContentComponent } from "../card-content/card-content.component";
import {
  CardHeaderComponent,
  CardHeaderVariant,
} from "../card-header/card-header.component";
import { CardRowComponent } from "../card-row/card-row.component";
import {
  CardAccentBorder,
  CardComponent,
  CardSpacing,
} from "../card.component";
import {
  HeadingComponent,
  TextComponent,
} from "libs/angular-components/tedi/public-api";

@Component({
  selector: "card-story",
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    HeadingComponent,
  ],
  template: `<tedi-card
    [borderless]="borderless()"
    [spacing]="spacing()"
    [accentBorder]="accentBorder()"
    [selected]="selected()"
  >
    <tedi-card-header variant="secondary"
      ><tedi-heading color="secondary" element="h3"
        >Header</tedi-heading
      ></tedi-card-header
    >
    <tedi-card-content
      >Cabbage, comprising several cultivars of Brassica oleracea, is a leafy
      green, red (purple), or white (pale green) biennial plant grown as an
      annual vegetable crop for its dense-leaved heads.</tedi-card-content
    >
  </tedi-card>`,
})
export class CardStoryComponent extends CardComponent {}

@Component({
  selector: "card-headers-story",
  standalone: true,
  styleUrls: ["./card-stories.styles.scss"],
  imports: [CardComponent, CardHeaderComponent, HeadingComponent],
  template: `<div class="variants-container">
    @for (variant of variants; track variant) {
      @let color = variant.startsWith("brand") ? "white" : "secondary";
      <tedi-card>
        <tedi-card-header [variant]="variant"
          ><tedi-heading
            element="h3"
            [color]="color"
            modifiers="capitalize-first"
            >{{ variant }} header</tedi-heading
          >
        </tedi-card-header>
      </tedi-card>
    }
  </div> `,
})
export class CardHeadersStoryComponent {
  variants: CardHeaderVariant[] = [
    "primary",
    "secondary",
    "tertiary",
    "brand",
    "brand-dark",
  ];
}

@Component({
  selector: "card-multiple-contents-story",
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    HeadingComponent,
  ],
  template: `<tedi-card>
    <tedi-card-header variant="brand"
      ><tedi-heading color="white" element="h3"
        >Header</tedi-heading
      ></tedi-card-header
    >
    <tedi-card-content [hasSeparator]="true">Content</tedi-card-content>
    <tedi-card-content [hasSeparator]="true" background="secondary"
      >Content 2</tedi-card-content
    >
    <tedi-card-content [hasSeparator]="true">Content 3</tedi-card-content>
  </tedi-card>`,
})
export class CardMultipleContentsStoryComponent {}

@Component({
  selector: "card-rows-story",
  standalone: true,
  imports: [CardComponent, CardRowComponent, CardContentComponent],
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
})
export class CardRowsStoryComponent {}

@Component({
  selector: "split-card-story",
  standalone: true,
  imports: [CardComponent, CardRowComponent, CardContentComponent],
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
})
export class SplitCardStoryComponent {}

@Component({
  selector: "card-colors-story",
  standalone: true,
  styleUrls: ["./card-stories.styles.scss"],
  imports: [CardComponent, CardContentComponent, TextComponent],
  template: `<div class="backgrounds-grid">
    @for (bg of colors; track bg) {
      @let color =
        ["brand-primary", "brand-secondary"].includes(bg)
          ? "white"
          : "secondary";
      <div>
        <tedi-text modifiers="bold">{{ bg }}</tedi-text>
        <tedi-card [background]="bg">
          <tedi-card-content
            ><tedi-text [color]="color"
              >Cabbage, comprising several cultivars of Brassica oleracea, is a
              leafy green, red (purple), or white (pale green) biennial plant
              grown as an annual vegetable crop for its dense-leaved
              heads.</tedi-text
            ></tedi-card-content
          >
        </tedi-card>
      </div>
    }
  </div>`,
})
export class CardColorsStoryComponent {
  colors: CardColors[] = [
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
}

@Component({
  selector: "card-spacings-story",
  standalone: true,
  styleUrls: ["./card-stories.styles.scss"],
  imports: [CardComponent, CardContentComponent, TextComponent],
  template: `<div class="backgrounds-grid">
    @for (spacing of spacings; track spacing) {
      <div>
        <tedi-text modifiers="bold">{{ spacing }}</tedi-text>
        <tedi-card [spacing]="spacing">
          <tedi-card-content
            ><tedi-text color="secondary"
              >Cabbage, comprising several cultivars of Brassica oleracea, is a
              leafy green, red (purple), or white (pale green) biennial plant
              grown as an annual vegetable crop for its dense-leaved
              heads.</tedi-text
            ></tedi-card-content
          >
        </tedi-card>
      </div>
    }
  </div>`,
})
export class CardSpacingsStoryComponent {
  spacings: CardSpacing[] = ["xs", "sm", "md", "lg", "none"];
}

@Component({
  selector: "card-accent-borders-story",
  standalone: true,
  styleUrls: ["./card-stories.styles.scss"],
  imports: [CardComponent, CardContentComponent, TextComponent],
  template: `<div class="variants-container">
    @for (accentBorder of accentBorders; track accentBorder) {
      <div>
        <tedi-text modifiers="bold">{{ accentBorder }}</tedi-text>
        <tedi-card [accentBorder]="accentBorder">
          <tedi-card-content
            ><tedi-text color="secondary"
              >Cabbage, comprising several cultivars of Brassica oleracea, is a
              leafy green, red (purple), or white (pale green) biennial plant
              grown as an annual vegetable crop for its dense-leaved
              heads.</tedi-text
            ></tedi-card-content
          >
        </tedi-card>
      </div>
    }
  </div>`,
})
export class CardAccentBordersStoryComponent {
  accentBorders: CardAccentBorder[] = ["info", "success", "warning", "danger"];
}

@Component({
  selector: "timeline-card-story",
  standalone: true,
  imports: [CardComponent, CardRowComponent, CardContentComponent],
  template: `<tedi-card>
    <tedi-card-row
      ><tedi-card-content [timeline]="true" [autoWidth]="true"
        >08.12.2024</tedi-card-content
      >
      <tedi-card-content>Covid-19</tedi-card-content></tedi-card-row
    >
  </tedi-card>`,
})
export class TimelineCardStoryComponent {}

@Component({
  selector: "icon-card-story",
  standalone: true,
  imports: [
    CardComponent,
    CardRowComponent,
    CardContentComponent,
    IconComponent,
    TextComponent,
  ],
  template: `<tedi-card>
    <tedi-card-row
      ><tedi-card-content
        [hasSeparator]="true"
        [autoWidth]="true"
        background="secondary"
        ><tedi-icon name="monitor_heart" color="secondary"
      /></tedi-card-content>
      <tedi-card-content
        ><tedi-text color="secondary"
          >Kodeiin + Paratsemool, 30mg + 500mg</tedi-text
        ></tedi-card-content
      ></tedi-card-row
    >
  </tedi-card>`,
})
export class IconCardStoryComponent {}

@Component({
  selector: "nested-cards-story",
  standalone: true,
  styleUrls: ["./card-stories.styles.scss"],
  imports: [
    CardComponent,
    CardContentComponent,
    TextComponent,
    CardHeaderComponent,
    HeadingComponent,
  ],
  template: `<tedi-card>
    <tedi-card-header variant="brand"
      ><tedi-heading element="h3" color="white"
        >Title</tedi-heading
      ></tedi-card-header
    >
    <tedi-card-content [hasSeparator]="true">
      <div class="variants-container">
        <tedi-text modifiers="h2" color="brand">Permanent treatment</tedi-text>
        <tedi-text
          >Your permanent medications and medical devices dispensed in the last
          6 months.</tedi-text
        >
        <tedi-text modifiers="h3">Medications</tedi-text>

        <tedi-card background="brand-tertiary"
          ><tedi-card-content
            >Cabbage, comprising several cultivars of Brassica oleracea, is a
            leafy green, red (purple), or white (pale green) biennial plant
            grown as an annual vegetable crop for its dense-leaved
            heads.</tedi-card-content
          ></tedi-card
        >

        <tedi-card background="brand-tertiary"
          ><tedi-card-content
            >Cabbage, comprising several cultivars of Brassica oleracea, is a
            leafy green, red (purple), or white (pale green) biennial plant
            grown as an annual vegetable crop for its dense-leaved
            heads.</tedi-card-content
          ></tedi-card
        >
      </div>
    </tedi-card-content>

    <tedi-card-content>
      <div class="variants-container">
        <tedi-text modifiers="h2" color="brand">Temporary treatment</tedi-text>
        <tedi-text
          >Your medications and medical devices used if needed or during a
          certain period of time.</tedi-text
        >
        <tedi-text modifiers="h3">Medications</tedi-text>

        <tedi-card background="brand-tertiary"
          ><tedi-card-content
            >Cabbage, comprising several cultivars of Brassica oleracea, is a
            leafy green, red (purple), or white (pale green) biennial plant
            grown as an annual vegetable crop for its dense-leaved
            heads.</tedi-card-content
          ></tedi-card
        >

        <tedi-card background="brand-tertiary"
          ><tedi-card-content
            >Cabbage, comprising several cultivars of Brassica oleracea, is a
            leafy green, red (purple), or white (pale green) biennial plant
            grown as an annual vegetable crop for its dense-leaved
            heads.</tedi-card-content
          ></tedi-card
        >
      </div>
    </tedi-card-content>
  </tedi-card>`,
})
export class NestedCardsStoryComponent {}

@Component({
  selector: "card-paddings-story",
  standalone: true,
  imports: [CardComponent, CardContentComponent],
  template: `<tedi-card padding="lg"
    ><tedi-card-content background="secondary" [padding]="{ left: 'xs' }"
      >Card has lg padding. Card content has xs left padding.</tedi-card-content
    ></tedi-card
  >`,
})
export class CardPaddingsStoryComponent {}
