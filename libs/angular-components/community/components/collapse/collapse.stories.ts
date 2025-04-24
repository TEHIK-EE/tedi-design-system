import type { Meta, StoryObj } from "@storybook/angular";

import { CollapseComponent } from "./collapse.component";

export default {
  title: "Community Angular/Components/Collapse",
  component: CollapseComponent,
  render: (args) => ({
    props: args,
    template: `
      <div id="collapse">
        <tedi-collapse
          title="Juhtumi üldandmed"
          openText="Näita rohkem"
          closeText="Näita vähem"
        >
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora rerum
            perspiciatis consectetur blanditiis maxime, optio minus amet similique!
            Et, saepe placeat. Omnis obcaecati corrupti repellat enim asperiores sunt
            quam laudantium voluptate optio deserunt distinctio harum dolores, iure
            unde nemo reprehenderit!
          </div>
        </tedi-collapse>
      </div>
    `,
  }),
} as Meta<CollapseComponent>;

type Story = StoryObj<CollapseComponent>;

export const Default: Story = {};
