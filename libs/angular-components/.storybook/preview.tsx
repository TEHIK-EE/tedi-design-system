import { Preview } from "@storybook/angular";
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/blocks";

const preview: Preview = {
  parameters: {
    viewMode: "docs",
    backgrounds: {
      values: [{ name: "brand", value: "var(--primary-600)" }],
    },
    docs: {
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
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
        existsInTediReady: {
          background: "#005aa3",
          color: "#fff",
          description: "This component has been migrated to TEDI-Ready",
        },
      },
    },
  },
};

export default preview;
