import { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: [
    "../docs/welcome.mdx",
    "../docs/get-started.mdx",
    "../docs/changelog.mdx",
    "../docs/badges.mdx",
    "../docs/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../tedi/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../community/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@etchteam/storybook-addon-status",
    "storybook-addon-pseudo-states",
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
