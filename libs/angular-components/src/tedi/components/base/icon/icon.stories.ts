import { argsToTemplate, Meta, StoryObj } from "@storybook/angular";
import { IconComponent } from "./icon.component";

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/28835d-icon" target="_BLANK">Zeroheight ↗</a><hr/>
 * <a href="https://fonts.google.com/icons?icon.set=Material+Icons" target="_BLANK">Official Google Material Icons homepage icons ↗</a><br/>
 * <a href="https://www.figma.com/community/file/1014241558898418245/material-design-icons?searchSessionId=lvxhc4l5-a6 target="_BLANK">Material Icons Figma ↗</a><br/>
 * <a href="https://www.figma.com/community/plugin/740272380439725040/material-design-icons" target="_BLANK">Figma Material Symbols plugin ↗</a>
 */

export default {
  title: "TEDI-Ready Angular/Base/Icon",
  component: IconComponent,
  argTypes: {
    name: {
      description:
        "Name of the Material Icon <br /> https://fonts.google.com/icons",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      description: "Size of the icon in pixels.",
      control: "select",
      options: [8, 12, 16, 18, 24, 36, 48],
      table: {
        type: {
          summary: "IconSize",
          detail:
            "Without background: 8 | 12 | 16 | 18 | 24 | 36 | 48 \nWith background: 16 | 24",
        },
        defaultValue: { summary: "24" },
      },
    },
    color: {
      description: "Color of the icon.",
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "brand",
        "brand-dark",
        "success",
        "warning",
        "warning-dark",
        "danger",
        "white",
      ],
      table: {
        type: {
          summary: "IconColor",
          detail:
            "primary \nsecondary \ntertiary \nbrand \nbrand-dark \nsuccess \nwarning \nwarning-dark \ndanger \nwhite",
        },
        defaultValue: { summary: "primary" },
      },
    },
    background: {
      description:
        "Background color for the icon (adds a circular background).",
      control: "select",
      options: ["primary", "secondary", "brand-primary", "brand-secondary"],
      table: {
        type: {
          summary: "IconBackground",
          detail: "primary \nsecondary \nbrand-primary \nbrand-secondary",
        },
      },
    },
    type: {
      description:
        "Type of Material Symbols icon style. <br /> It is recommended to only use one type throughout your app.",
      control: "radio",
      options: ["outlined", "sharp", "rounded"],
      table: {
        type: { summary: "IconType", detail: "outlined \nsharp \nrounded" },
        defaultValue: { summary: "outlined" },
      },
    },
    variant: {
      description: "Whether the icon should be filled or outlined.",
      control: "radio",
      options: ["filled", "outlined"],
      table: {
        type: { summary: "IconVariant", detail: "filled \noutlined" },
        defaultValue: { summary: "outlined" },
      },
    },
    class: {
      description: "Additional CSS classes to apply to the icon.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    label: {
      description:
        "Accessible label for screen readers. <br /> If omitted then the icon is hidden for screen-readers.",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
} as Meta<IconComponent>;

export const Default: StoryObj<IconComponent> = {
  args: {
    name: "account_circle",
    type: "outlined",
    variant: "outlined",
  },
  render: (args) => ({
    props: args,
    template: `<tedi-icon ${argsToTemplate(args)} />`,
  }),
};
