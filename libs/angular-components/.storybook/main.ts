import { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: [
    "../src/*/*.mdx",
    "../src/docs/colors/colors.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/angular",
    options: {
      builder: "angular",
    },
  },
  staticDirs: ["../../tedi-core/public"],
  docs: {
    autodocs: true,
  },
  core: {
    disableTelemetry: true,
  },
};
export default config;
