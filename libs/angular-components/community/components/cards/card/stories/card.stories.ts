import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { CommonModule } from "@angular/common";
import {
  renderCardAccentBordersStory,
  renderCardBackgroundsStory,
  renderCardHeaders,
  renderCardPaddingsStory,
  renderCardRowsStory,
  renderCardSpacingsStory,
  renderCardStory,
  renderIconCardStory,
  renderMultipleContentsStory,
  renderNestedCardsStory,
  renderSplitCardStory,
  renderTimelineCardStory,
} from "./card-story-templates";
import { CardRowComponent } from "../card-row/card-row.component";
import { CardHeaderComponent } from "../card-header/card-header.component";
import { CardContentComponent } from "../card-content/card-content.component";
import { CardComponent } from "../card.component";
import {
  HeadingComponent,
  IconComponent,
  TextComponent,
} from "@tehik-ee/tedi-angular/tedi";

export default {
  title: "Community Angular/Cards/Card",
  component: CardComponent,
  subcomponents: {
    CardRowComponent,
    CardHeaderComponent,
    CardContentComponent,
  },
  args: {
    spacing: "md",
  },
  argTypes: {
    borderless: {
      description: "Removes border from card.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean",
        },
      },
    },
    spacing: {
      control: "radio",
      options: ["xs", "sm", "md", "lg", "none"],
      description: " Adds padding to header and content.",
      table: {
        defaultValue: { summary: "md" },
        type: {
          summary: '"xs" | "sm" | "md" | "lg" | "none"',
          detail: "xs - 8px \nsm - 10px \nmd - 16px \nlg - 24px",
        },
      },
    },
    accentBorder: {
      control: "radio",
      options: ["info", "success", "warning", "danger"],
      description: "Adds thicker, colored left border.",
      table: {
        defaultValue: { summary: "-" },
        type: {
          summary: '"info" | "success" | "warning" | "danger"',
        },
      },
    },
    selected: {
      description: "Adds selected border to card.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean",
        },
      },
    },
    background: {
      description: "Changes background for card.",
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        CardComponent,
        CardRowComponent,
        CardHeaderComponent,
        CardContentComponent,
        HeadingComponent,
        TextComponent,
        IconComponent,
      ],
    }),
  ],
} as Meta<CardComponent>;

type CardStory = StoryObj<CardComponent>;

export const Default: CardStory = {
  render: renderCardStory,
};

export const CardHeaders: CardStory = {
  render: renderCardHeaders,
};

export const MultipleContents: CardStory = {
  render: renderMultipleContentsStory,
};

export const CardRows: CardStory = {
  render: renderCardRowsStory,
};

export const SplitCard: CardStory = {
  render: renderSplitCardStory,
};

export const CardBackgrounds: CardStory = {
  render: renderCardBackgroundsStory,
};

export const CardSpacings: CardStory = {
  render: renderCardSpacingsStory,
};

export const CardAccentBorders: CardStory = {
  render: renderCardAccentBordersStory,
};

export const TimelineCard: CardStory = {
  render: renderTimelineCardStory,
};

export const IconCard: CardStory = {
  render: renderIconCardStory,
};

export const NestedCards: CardStory = {
  render: renderNestedCardsStory,
};

export const CardPaddings: CardStory = {
  render: renderCardPaddingsStory,
};
