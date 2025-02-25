/** @type { import('@storybook/angular').Preview } */
const preview = {
  parameters: {
    viewMode: "docs",
    backgrounds: {
      default: "default",
      values: [
        { name: "default", value: "var(--color-bg-default)" },
        { name: "muted", value: "var(--color-bg-muted)" },
        { name: "subtle", value: "var(--color-bg-subtle)" },
        { name: "disabled", value: "var(--color-bg-disabled)" },
        { name: "black", value: "var(--color-black)" },
        { name: "inverted", value: "var(--color-bg-inverted)" },
        {
          name: "inverted-contrast",
          value: "var(--color-bg-inverted-contrast)",
        },
        { name: "brand", value: "var(--primary-600)" },
      ],
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
