import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { CommonModule } from "@angular/common";
import {
  CardAccentBordersStoryComponent,
  CardColorsStoryComponent,
  CardHeadersStoryComponent,
  CardMultipleContentsStoryComponent,
  CardPaddingsStoryComponent,
  CardRowsStoryComponent,
  CardSpacingsStoryComponent,
  CardStoryComponent,
  IconCardStoryComponent,
  NestedCardsStoryComponent,
  SplitCardStoryComponent,
  TimelineCardStoryComponent,
} from "./card-story-templates";
import { CardRowComponent } from "../card-row/card-row.component";
import { CardHeaderComponent } from "../card-header/card-header.component";
import { CardContentComponent } from "../card-content/card-content.component";

export default {
  title: "Community Angular/Card",
  component: CardStoryComponent,
  subcomponents: {
    CardRowComponent,
    CardHeaderComponent,
    CardContentComponent,
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
        CardHeadersStoryComponent,
        CardRowsStoryComponent,
        SplitCardStoryComponent,
        CardColorsStoryComponent,
        CardSpacingsStoryComponent,
        CardAccentBordersStoryComponent,
        TimelineCardStoryComponent,
        IconCardStoryComponent,
        CardMultipleContentsStoryComponent,
        NestedCardsStoryComponent,
        CardPaddingsStoryComponent,
      ],
    }),
  ],
} as Meta<CardStoryComponent>;

type CardStory = StoryObj<CardStoryComponent>;

export const Default: CardStory = {};

export const CardHeaders: CardStory = {
  render: () => {
    return {
      template: "<card-headers-story />",
    };
  },
};

export const MultipleContents: CardStory = {
  render: () => {
    return {
      template: "<card-multiple-contents-story />",
    };
  },
};

export const CardRows: CardStory = {
  render: () => {
    return {
      template: "<card-rows-story />",
    };
  },
};

export const SplitCard: CardStory = {
  render: () => {
    return {
      template: "<split-card-story />",
    };
  },
};

export const CardBackgrounds: CardStory = {
  render: () => {
    return {
      template: "<card-colors-story />",
    };
  },
};

export const CardSpacings: CardStory = {
  render: () => {
    return {
      template: "<card-spacings-story />",
    };
  },
};

export const CardAccentBorders: CardStory = {
  render: () => {
    return {
      template: "<card-accent-borders-story />",
    };
  },
};

export const TimelineCard: CardStory = {
  render: () => {
    return {
      template: "<timeline-card-story />",
    };
  },
};

export const IconCard: CardStory = {
  render: () => {
    return {
      template: "<icon-card-story />",
    };
  },
};

export const NestedCards: CardStory = {
  render: () => {
    return {
      template: "<nested-cards-story />",
    };
  },
};

export const CardPaddings: CardStory = {
  render: () => {
    return {
      template: "<card-paddings-story />",
    };
  },
};
