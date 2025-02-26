import { Preview } from "@storybook/angular";

const preview: Preview = {
  parameters: {
    viewMode: "docs",
    backgrounds: {
      default: "default",
      values: [{ name: "brand", value: "var(--primary-600)" }],
    },
    docs: {
      toc: true,
    },
    status: {
      statuses: {
        devComponent: {
          background: "#ff8000",
          color: "#ffffff",
          description: "This component is dev only and not found in Figma",
        },
        breakpointSupport: {
          background: "#308653",
          color: "#ffffff",
          description: "This component has breakpoint support",
        },
        internalComponent: {
          background: "#fff",
          color: "#000",
          description:
            "This component is only used to build other components and not being exported from library",
        },
        ExistsInTediReady: {
          background: "#005aa3",
          color: "#fff",
          description: "This component has been migrated to TEDI-Ready",
        },
      },
    },
  },
};

export default preview;
