import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";

import { TimelineComponent } from "./timeline.component";
import { TimelineItemComponent } from "./timeline-item/timeline-item.component";
import {
  CollapseComponent,
  TextComponent,
  RowComponent,
} from "@tehik-ee/tedi-angular/tedi";

export default {
  title: "Community/Cards/Timeline",
  component: TimelineComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TimelineComponent,
        TimelineItemComponent,
        CollapseComponent,
        TextComponent,
        RowComponent,
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
    title: {
      description: "Item title",
      control: "text",
      table: {
        category: "timeline-item",
        type: { summary: "string" },
      },
    },
    time: {
      description: "Item time",
      control: "text",
      table: {
        category: "timeline-item",
        type: { summary: "string" },
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
      <tedi-timeline [activeIndex]="activeIndex" style="max-width: 400px;">
        <tedi-timeline-item time="2022" title="Staaži kogumise algus (I sammas)">
          <p tedi-text color="tertiary">Praeguse seisuga on sul kogutud 2 aastat pensionistaaži</p>
          <tedi-collapse openText="Näita rohkem" closeText="Näita vähem">
            <tedi-row [cols]="1" [gap]="3">
              <p tedi-text color="tertiary">Pensioniarvestust mõjutab pensioniõiguslik staaž (PÕS) ja individuaalne sotsiaalmaks (ISM).</p>
              <p tedi-text color="tertiary"><b>PÕS</b> näitab, kui kaua oled töötanud ja kas sul on õigus vanaduspensionile.</p>
              <p tedi-text color="tertiary"><b>ISM</b> mõjutab pensioni suurust - mida rohkem on makstud sotsiaalmaksu, seda suurem on tulevane pension.</p>
            </tedi-row>
          </tedi-collapse>
        </tedi-timeline-item>
        <tedi-timeline-item time="2022" title="II sambaga liitumine">
          <p tedi-text color="tertiary">LHV S (loositud)</p>
          <tedi-collapse openText="Näita rohkem" closeText="Näita vähem">
            <p tedi-text color="tertiary">
              II sambaga liitudes hakkasid koguma raha oma tuleviku jaoks.
              Sinu sissemaksed ja riigi panus suunatakse pensionifondi, kus need ajas kasvavad.
              Mida varem alustad, seda rohkem koguneb. Võrdle <a href="#">II samba fondide tootlikkust.</a>
            </p>
          </tedi-collapse>
        </tedi-timeline-item>
        <tedi-timeline-item time="2025" title="Praegune hetk">
          <tedi-collapse openText="Näita rohkem" closeText="Näita vähem">
            <p tedi-text color="tertiary">
              Sinu pensionifondid koguvad väärtust ja iga otsus, mida täna teed, võib mõjutada sinu tulevast pensioni.
              Vaata <a href="#">erinevate sammaste tootlikkust,</a> et leida endale sobiv lahendus.
            </p>
          </tedi-collapse>
        </tedi-timeline-item>
        <tedi-timeline-item title="III sambaga liitumine">
          <tedi-collapse openText="Näita rohkem" closeText="Näita vähem">
            <p tedi-text color="tertiary">
              Sul on võimalus hakata pensioniks koguma ka III sambasse.
              See on vabatahtlik ja paindlik viis oma tulevikku kindlustada.
              Iga sissemakse toob kaasa tulumaksutagastuse ning aitab pensionipõlve sissetulekut suurendada.
              Võrdle <a href="#">III samba fondide tootlikkust.</a>
            </p>
          </tedi-collapse>
        </tedi-timeline-item>
        <tedi-timeline-item title="Minimaalse staaži täitumine (I sammas)">
          <tedi-collapse openText="Näita rohkem" closeText="Näita vähem">
            <p tedi-text color="tertiary">
              Vanaduspensioni saamiseks peab sul olema kogunenud vähemalt 15 aastat pensionistaaži.
            </p>
          </tedi-collapse>
        </tedi-timeline-item>
        <tedi-timeline-item title="Vanaduspensioniiga">
          <tedi-collapse openText="Näita rohkem" closeText="Näita vähem">
            <p tedi-text color="tertiary">
              Vanaduspension sõltub sissetulekutest ja valitud pensionisammastest.
              Pensioni saamiseks esita taotlus siin.
              Enne otsustamist tutvu ka võimalustega, nagu osaline või edasilükatud pension.
            </p>
          </tedi-collapse>
        </tedi-timeline-item>
      </tedi-timeline>
    `,
  }),
};
