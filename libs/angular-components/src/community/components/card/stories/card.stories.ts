import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

import { CommonModule } from "@angular/common";
import {
  CardAccentBordersStoryComponent,
  CardColorsStoryComponent,
  CardHeadersStoryComponent,
  CardRowsStoryComponent,
  CardSpacingsStoryComponent,
  CardStoryComponent,
  IconCardStoryComponent,
  SplitCardStoryComponent,
  TimelineCardStoryComponent,
} from "./card-story-templates";

export default {
  title: "Community Angular/Card",
  component: CardStoryComponent,
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
