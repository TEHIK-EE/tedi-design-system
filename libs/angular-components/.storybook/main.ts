import { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: [
    "../docs/**/*.mdx",
    "../docs/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../tedi/**/*.mdx",
    "../tedi/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../community/**/*.mdx",
    "../community/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@etchteam/storybook-addon-status",
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
