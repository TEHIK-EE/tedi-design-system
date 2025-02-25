import { Meta, StoryObj } from "@storybook/angular";
import { ColorStoryComponent } from "./colors.component";
import baseColorData from "./base-color-variables.json";
import semanticColorData from "./brand-color-variables.json";

const meta: Meta<ColorStoryComponent> = {
  title: "TEDI-Ready Angular/Base/Colors",
  component: ColorStoryComponent,
  parameters: {
    backgrounds: {
      default: "black",
    },
  },
};

export default meta;

export const BaseColors: StoryObj<ColorStoryComponent> = {
  render: (args) => ({
    template: `<app-color-story [data]="data"></app-color-story>`,
    props: args,
  }),
  args: {
    data: baseColorData,
  },
  name: "Base Colors",
};

export const BrandColors: StoryObj<ColorStoryComponent> = {
  render: (args) => ({
    template: `<app-color-story [data]="data"></app-color-story>`,
    props: args,
  }),
  args: {
    data: semanticColorData,
  },
  name: "Brand Colors",
};
