import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { SeparatorComponent } from "./separator.component";
import { ColComponent } from "../grid/col/col.component";
import { RowComponent } from "../grid/row/row.component";

export default {
  title: "TEDI-Ready/Components/Helpers/Separator",
  component: SeparatorComponent,
  decorators: [
    moduleMetadata({
      imports: [SeparatorComponent, RowComponent, ColComponent],
    }),
  ],
  argTypes: {
    axis: {
      description: "Axis of separator.",
      control: {
        type: "radio",
      },
      options: ["horizontal", "vertical"],
      table: {
        category: "inputs",
        type: {
          summary: "SeparatorAxis",
          detail: "horizontal \nvertical",
        },
        defaultValue: { summary: "horizontal" },
      },
    },
    color: {
      description: "Color of separator.",
      control: {
        type: "radio",
      },
      options: ["primary", "secondary", "accent"],
      table: {
        category: "inputs",
        type: {
          summary: "SeparatorColor",
          detail: "primary \nsecondary \naccent",
        },
        defaultValue: { summary: "primary" },
      },
    },
    variant: {
      description: "Separator style variant.",
      control: {
        type: "radio",
      },
      options: ["dotted", "dotted-small", "dot-only"],
      table: {
        category: "inputs",
        type: {
          summary: "SeparatorVariant",
          detail: "dotted \ndotted-small \naccent",
        },
      },
    },
    dotSize: {
      description: "Dot size. Only used when variant is 'dot-only'",
      control: {
        type: "radio",
      },
      options: ["large", "medium", "small", "extra-small"],
      table: {
        category: "inputs",
        type: {
          summary: "SeparatorDotSize",
          detail: "large \nmedium \nsmall \nextra-small",
        },
      },
    },
    dotFilled: {
      description: "Is dot filled? Only used when variant is 'dot-only'.",
      control: {
        type: "boolean",
      },
      table: {
        category: "inputs",
        type: {
          summary: "boolean",
        },
      },
    },
    thickness: {
      description: "Thickness in pixels (ignored if variant is used).",
      control: {
        type: "radio",
      },
      options: [1, 2],
      table: {
        category: "inputs",
        type: {
          summary: "SeparatorThickness",
          detail: "1 \n2",
        },
        defaultValue: { summary: "1" },
      },
    },
    spacing: {
      description:
        "Spacing applied based on the axis:<br /> - For horizontal axis, spacing is applied to top and bottom of the separator.<br />- For vertical axis, spacing is applied to left and right of the separator.",
      control: {
        type: "number",
      },
      table: {
        category: "inputs",
        type: {
          summary: "SeparatorSpacingValue | SeparatorSpacing",
        },
      },
    },
    size: {
      description:
        "Size of separator based on the axis: <br />- For horizontal axis, size defines width.<br /> - For vertical axis, size defines height (when using percentages, then parent container must have height set).",
      control: {
        type: "text",
      },
      table: {
        category: "inputs",
        type: {
          summary: "string",
        },
        defaultValue: { summary: "100%" },
      },
    },
  },
} as Meta<SeparatorComponent>;

export const Default: StoryObj<SeparatorComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <p>Some content</p>
        <tedi-separator [spacing]="1" />
        <p>Other content</p>
    `,
  }),
};

export const HorizontalColors: StoryObj<SeparatorComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <tedi-row gap="5">
            <tedi-col>
                <h3>Full width</h3>
                <tedi-separator [spacing]="2" [thickness]="1" color="primary" />
                <tedi-separator [spacing]="2" [thickness]="2" color="primary" />

                <tedi-separator [spacing]="2" [thickness]="1" color="secondary" />
                <tedi-separator [spacing]="2" [thickness]="2" color="secondary" />

                <tedi-separator [spacing]="2" [thickness]="1" color="accent" />
                <tedi-separator [spacing]="2" [thickness]="2" color="accent" />
            </tedi-col>
            <tedi-col>
                <h3>Fixed width</h3>
                <tedi-separator [spacing]="2" [thickness]="1" color="primary" size="5rem" />
                <tedi-separator [spacing]="2" [thickness]="2" color="primary" size="5rem" />

                <tedi-separator [spacing]="2" [thickness]="1" color="secondary" size="5rem" />
                <tedi-separator [spacing]="2" [thickness]="2" color="secondary" size="5rem" />

                <tedi-separator [spacing]="2" [thickness]="1" color="accent" size="5rem" />
                <tedi-separator [spacing]="2" [thickness]="2" color="accent" size="5rem" />
            </tedi-col>
        </tedi-row>
    `,
  }),
};

export const VerticalColors: StoryObj<SeparatorComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <tedi-row gap="5">
            <tedi-col>
                <h3>Full height</h3>
                <div style="display: flex; height: 15rem;">
                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="1" color="primary" />
                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="2" color="primary" />

                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="1" color="secondary" />
                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="2" color="secondary" />

                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="1" color="accent" />
                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="2" color="accent" />
                </div>
            </tedi-col>
            <tedi-col>
                <h3>Fixed height</h3>
                <div style="display: flex;">
                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="1" color="primary" size="5rem" />
                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="2" color="primary" size="5rem" />

                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="1" color="secondary" size="5rem" />
                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="2" color="secondary" size="5rem" />

                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="1" color="accent" size="5rem" />
                    <tedi-separator axis="vertical" [spacing]="2" [thickness]="2" color="accent" size="5rem" />
                </div>
            </tedi-col>
        </tedi-row>
    `,
  }),
};

export const PaddedEven: StoryObj<SeparatorComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <tedi-row gap="5">
            <tedi-col>
                <p>Some content</p>
                <tedi-separator [spacing]="1" />
                <p>Other content</p>
            </tedi-col>
            <tedi-col style="display: flex; align-items:center; height: 5rem;">
                <p>Some content</p>
                <tedi-separator axis="vertical" [spacing]="1" />
                <p>Other content</p>
            </tedi-col>
        </tedi-row>
    `,
  }),
};

export const PaddedUneven: StoryObj<SeparatorComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <tedi-row gap="5">
            <tedi-col>
                <p>Some content</p>
                <tedi-separator [spacing]="{ top: 2.5, bottom: 0.5 }" />
                <p>Other content</p>
            </tedi-col>
            <tedi-col style="display: flex; align-items:center; height: 5rem;">
                <p>Some content</p>
                <tedi-separator axis="vertical" [spacing]="{ left: 2.5, right: 0.5 }" />
                <p>Other content</p>
            </tedi-col>
        </tedi-row>
    `,
  }),
};

export const VerticalThick: StoryObj<SeparatorComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="display: flex; height: 7rem;">
            <div style="padding: 1rem;">12.12.2012</div>
            <tedi-separator axis="vertical" [spacing]="2" [thickness]="2" />
            <div style="padding: 1rem;">
                <h6>Title</h6>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Exercitationem rem nisi quae? Rem, amet! Veritatis laboriosam consectetur ipsum quae.
                    Amet voluptatibus quod eaque at nostrum id provident? Cum, maiores libero!
                </p>
            </div>
        </div>
    `,
  }),
};

export const VerticalDotted: StoryObj<SeparatorComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="display: flex; height: 7rem;">
            <div style="padding: 1rem;">12.12.2012</div>
            <tedi-separator axis="vertical" [spacing]="2" color="accent" variant="dotted" />
            <div style="padding: 1rem;">
                <h6>Title</h6>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Exercitationem rem nisi quae? Rem, amet! Veritatis laboriosam consectetur ipsum quae.
                    Amet voluptatibus quod eaque at nostrum id provident? Cum, maiores libero!
                </p>
            </div>
        </div>
    `,
  }),
};

export const VerticalDottedSmall: StoryObj<SeparatorComponent> = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="display: flex; height: 7rem;">
            <div style="padding: 1rem;">12.12.2012</div>
            <tedi-separator axis="vertical" [spacing]="2" color="accent" variant="dotted-small" />
            <div style="padding: 1rem;">
                <h6>Title</h6>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Exercitationem rem nisi quae? Rem, amet! Veritatis laboriosam consectetur ipsum quae.
                    Amet voluptatibus quod eaque at nostrum id provident? Cum, maiores libero!
                </p>
            </div>
        </div>
    `,
  }),
};

export const HorizontalDottedSeparator: StoryObj<SeparatorComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div class="w-50">
        <tedi-separator [spacing]="2" color="accent" variant="dotted" />
        <tedi-separator [spacing]="2" color="accent" variant="dotted-small" />
      </div>
    `,
  }),
};

export const DotOnly: StoryObj<SeparatorComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [gap]="3">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <tedi-separator color="secondary" variant="dot-only" dotSize="extra-small" />
          <tedi-separator color="secondary" variant="dot-only" dotSize="small" />
          <tedi-separator color="secondary" variant="dot-only" dotSize="medium" />
          <tedi-separator color="secondary" variant="dot-only" dotSize="large" />
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <tedi-separator color="secondary" variant="dot-only" dotSize="extra-small" [dotFilled]="false" [thickness]="1" />
          <tedi-separator color="secondary" variant="dot-only" dotSize="small" [dotFilled]="false" [thickness]="1" />
          <tedi-separator color="secondary" variant="dot-only" dotSize="medium" [dotFilled]="false" [thickness]="1" />
          <tedi-separator color="secondary" variant="dot-only" dotSize="large" [dotFilled]="false" [thickness]="1" />
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <tedi-separator color="secondary" variant="dot-only" dotSize="extra-small" [dotFilled]="false" [thickness]="2" />
          <tedi-separator color="secondary" variant="dot-only" dotSize="small" [dotFilled]="false" [thickness]="2" />
          <tedi-separator color="secondary" variant="dot-only" dotSize="medium" [dotFilled]="false" [thickness]="2" />
          <tedi-separator color="secondary" variant="dot-only" dotSize="large" [dotFilled]="false" [thickness]="2" />
        </div>
      </tedi-row>
    `,
  }),
};

export const InlineSeparatorUsedInText: StoryObj<SeparatorComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <tedi-row [cols]="1" [gap]="3">
        <tedi-col>
          Lorem ipsum dolor sit, amet
          <tedi-separator axis="vertical" color="primary" [spacing]="0.5" style="display: inline;" />
          consectetur adipisicing elit.
        </tedi-col>
        <tedi-col>
          Lorem ipsum dolor sit, amet
          <tedi-separator axis="vertical" color="secondary" [spacing]="1" style="display: inline;" />
          consectetur adipisicing elit.
        </tedi-col>
        <tedi-col>
          Lorem ipsum dolor sit, amet
          <tedi-separator axis="vertical" color="accent" [spacing]="1.5" style="display: inline;" />
          consectetur adipisicing elit.
        </tedi-col>
        <tedi-col>
          Lorem ipsum dolor sit, amet
          <tedi-separator axis="vertical" color="secondary" variant="dot-only" dotSize="small" [spacing]="0.5" />
          consectetur adipisicing elit.
        </tedi-col>
      </tedi-row>
    `,
  }),
};
