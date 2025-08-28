import { Meta, StoryObj } from "@storybook/angular";
import { ColorStoryComponent } from "./colors.component";
import baseColorData from "./base-color-variables.json";
import semanticColorData from "./brand-color-variables.json";

const meta: Meta<ColorStoryComponent> = {
  title: "TEDI-Ready/Base/Colors",
  component: ColorStoryComponent,
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
  tags: ["!dev"],
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
  tags: ["!dev"],
};
