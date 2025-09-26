import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";

import { TimelineComponent } from "./timeline.component";
import { TimelineItemComponent } from "./timeline-item/timeline-item.component";
import { TimelineTitleComponent } from "./timeline-title/timeline-title.component";
import { TimelineDescriptionComponent } from "./timeline-description/timeline-description.component";
import { CollapseComponent } from "../../buttons/collapse/collapse.component";
import { TextComponent } from "../../base/text/text.component";
import { ButtonComponent } from "../../buttons/button/button.component";
import { InfoButtonComponent } from "../../buttons/info-button/info-button.component";
import { IconComponent } from "../../base/icon/icon.component";

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.17.25?node-id=136-14995&m=dev&focus-id=25945-119670" target="_BLANK">Figma ↗</a><br/>
 * <a href="" target="_BLANK">Zeroheight ↗</a>
 * <hr />
 * This component is responsive and adapts to mobile layout when below LG (992px) breakpoint.<br />
 * Timeline consists of several sub-components:
 * - `TimelineItemComponent`: Used for showing single item in timeline. Item timings are not required. First timing is showed with 16px, rest 14px.
 * - `TimelineTitleComponent`: Used for showing title in timeline item. If you want to use heading element for title, put it inside title component, wrapping your text.
 * - `TimelineDescriptionComponent`: Used for showing description in timeline item.
 *
 * TimelineItemComponent can also contain any other content, it will be rendered under description.
 */

export default {
  title: "TEDI-Ready/Components/Helpers/Timeline",
  component: TimelineComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TimelineComponent,
        TimelineItemComponent,
        TimelineTitleComponent,
        TimelineDescriptionComponent,
        CollapseComponent,
        TextComponent,
        ButtonComponent,
        InfoButtonComponent,
        IconComponent,
      ],
    }),
  ],
  argTypes: {
    activeIndex: {
      description: "Index of active item",
      control: "number",
      table: {
        category: "timeline",
        type: { summary: "number" },
      },
    },
    timings: {
      description: "Item timings",
      control: "object",
      table: {
        category: "timeline-item",
        type: { summary: "string[]" },
      },
    },
  },
} as Meta<TimelineComponent>;

type Story = StoryObj<TimelineComponent>;

export const Default: Story = {
  args: {
    activeIndex: 2,
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-timeline [activeIndex]="activeIndex">
        <tedi-timeline-item [timings]="['1990', '14. detsember']">
          <tedi-timeline-title>Staaži kogumise algus (I sammas)</tedi-timeline-title>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['2002', '04. oktoober']">
          <tedi-timeline-title>II sambaga liitumine</tedi-timeline-title>
          <tedi-timeline-description>Aktiivne fond: LHV XL (loositud)</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['2007', '07. aprill']">
          <tedi-timeline-title>Minimaalse staaži täitumine (I sammas)</tedi-timeline-title>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['2021', '13. mai']">
          <tedi-timeline-title>III sambaga liitumine</tedi-timeline-title>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['2022', '14. juuni']">
          <tedi-timeline-title>II sambast lahkumine</tedi-timeline-title>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['2024', '16. detsember']">
          <tedi-timeline-title>Taotluse esitamine</tedi-timeline-title>
          <tedi-timeline-description>Menetlemine võib võtta kuni 30 p</tedi-timeline-description>
          <button tedi-button size="small" style="width: fit-content;">Alusta taotlust</button>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['2032']">
          <tedi-timeline-title>II sambaga uuesti liitumise võimalus</tedi-timeline-title>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['2035']">
          <tedi-timeline-title>Vanaduspensioniiga</tedi-timeline-title>
        </tedi-timeline-item>
      </tedi-timeline>
    `,
  }),
};

export const TitleOnly: Story = {
  args: {
    activeIndex: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-timeline [activeIndex]="activeIndex">
        <tedi-timeline-item>
          <tedi-timeline-title>Taotluse esitamine</tedi-timeline-title>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-title>Menetlemine</tedi-timeline-title>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-title>Otsus</tedi-timeline-title>
        </tedi-timeline-item>
      </tedi-timeline>
    `,
  }),
};

export const WithDescription: Story = {
  args: {
    activeIndex: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-timeline [activeIndex]="activeIndex">
        <tedi-timeline-item>
          <tedi-timeline-title>Taotluse esitamine</tedi-timeline-title>
          <tedi-timeline-description>Pärast taotluse esitamist võetakse see menetlusse.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-title>Menetlemine</tedi-timeline-title>
          <tedi-timeline-description>Menetlemine võib võtta kuni 30 päeva.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-title>Otsus</tedi-timeline-title>
          <tedi-timeline-description>Otsus tehakse teatavaks.</tedi-timeline-description>
        </tedi-timeline-item>
      </tedi-timeline>
    `,
  }),
};

export const WithInfoButton: Story = {
  args: {
    activeIndex: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-timeline [activeIndex]="activeIndex">
        <tedi-timeline-item>
          <tedi-timeline-title>
            Taotluse esitamine
            <button tedi-info-button></button>
          </tedi-timeline-title>
          <tedi-timeline-description>Pärast taotluse esitamist võetakse see menetlusse.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-title>
            Menetlemine
            <button tedi-info-button></button>
          </tedi-timeline-title>
          <tedi-timeline-description>Menetlemine võib võtta kuni 30 päeva.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-title>
            Otsus
            <button tedi-info-button></button>
          </tedi-timeline-title>
          <tedi-timeline-description>Otsus tehakse teatavaks.</tedi-timeline-description>
        </tedi-timeline-item>
      </tedi-timeline>
    `,
  }),
};

export const WithoutTitle: Story = {
  args: {
    activeIndex: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-timeline [activeIndex]="activeIndex">
        <tedi-timeline-item>
          <tedi-timeline-description>Pärast taotluse esitamist võetakse see menetlusse.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-description>Menetlemine võib võtta kuni 30 päeva.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-description>Otsus tehakse teatavaks.</tedi-timeline-description>
        </tedi-timeline-item>
      </tedi-timeline>
    `,
  }),
};

export const WithAction: Story = {
  args: {
    activeIndex: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-timeline [activeIndex]="activeIndex">
        <tedi-timeline-item>
          <tedi-timeline-title>Taotluse esitamine</tedi-timeline-title>
          <tedi-timeline-description>Pärast taotluse esitamist võetakse see menetlusse.</tedi-timeline-description>
          <button tedi-button size="small" variant="secondary" style="width: fit-content;">
            <tedi-icon name="add" />
            Lisa kaastaotleja
          </button>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-title>Menetlemine</tedi-timeline-title>
          <tedi-timeline-description>Menetlemine võib võtta kuni 30 päeva.</tedi-timeline-description>
          <button tedi-button size="small" style="width: fit-content;">Vaata menetlust</button>
        </tedi-timeline-item>
        <tedi-timeline-item>
          <tedi-timeline-title>Otsus</tedi-timeline-title>
          <tedi-timeline-description>Otsus tehakse teatavaks.</tedi-timeline-description>
          <tedi-collapse openText="Näita rohkem" closeText="Näita vähem">
            <small tedi-text color="tertiary">Pärast otsuse teatavaks tegemist saab seda vajadusel vaidlustada.</small>
          </tedi-collapse>
        </tedi-timeline-item>
      </tedi-timeline>
    `,
  }),
};

export const WithSingleDate: Story = {
  args: {
    activeIndex: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-timeline [activeIndex]="activeIndex">
        <tedi-timeline-item [timings]="['1990']">
          <tedi-timeline-title>Taotluse esitamine</tedi-timeline-title>
          <tedi-timeline-description>Pärast taotluse esitamist võetakse see menetlusse.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['1990']">
          <tedi-timeline-title>Menetlemine</tedi-timeline-title>
          <tedi-timeline-description>Menetlemine võib võtta kuni 30 päeva.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['1991']">
          <tedi-timeline-title>Otsus</tedi-timeline-title>
          <tedi-timeline-description>Otsus tehakse teatavaks.</tedi-timeline-description>
        </tedi-timeline-item>
      </tedi-timeline>
    `,
  }),
};

export const WithMultipleDates: Story = {
  args: {
    activeIndex: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <tedi-timeline [activeIndex]="activeIndex">
        <tedi-timeline-item [timings]="['1990', '14. detsember']">
          <tedi-timeline-title>Taotluse esitamine</tedi-timeline-title>
          <tedi-timeline-description>Pärast taotluse esitamist võetakse see menetlusse.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['1990', '15. detsember']">
          <tedi-timeline-title>Menetlemine</tedi-timeline-title>
          <tedi-timeline-description>Menetlemine võib võtta kuni 30 päeva.</tedi-timeline-description>
        </tedi-timeline-item>
        <tedi-timeline-item [timings]="['1991', '15. jaanuar']">
          <tedi-timeline-title>Otsus</tedi-timeline-title>
          <tedi-timeline-description>Otsus tehakse teatavaks.</tedi-timeline-description>
        </tedi-timeline-item>
      </tedi-timeline>
    `,
  }),
};
