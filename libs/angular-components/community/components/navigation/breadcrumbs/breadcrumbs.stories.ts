import { argsToTemplate, type Meta, type StoryObj } from "@storybook/angular";

import { BreadcrumbsComponent } from "./breadcrumbs.component";
import { type Breakpoint } from "tedi/services";

const BREAKPOINTS: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl"];

/**
<a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.8.9--work-in-progress-?node-id=2370-14804&m=dev" target="_BLANK">Figma ↗</a><br/>
* Breadcrumbs provide users with a clear path of where they are within the application.
* - Each item includes a **label** (display text) and a **href** (navigation link).
* - The **final breadcrumb** indicates the current page and is displayed as **plain text**, without a link.
* - Breadcrumbs are rendered **in the order they are passed**, representing the page hierarchy. 
* <br>
*/
export default {
  title: "Community Angular/Navigation/Breadcrumbs",
  component: BreadcrumbsComponent,
  render: (args) => ({
    props: args,
    template: `
        <tedi-breadcrumbs ${argsToTemplate(args)} />
      `,
  }),
  args: {
    crumbs: [
      { label: "Kodu", href: "/" },
      { label: "Tooted", href: "/products" },
      { label: "Elektroonika", href: "/products/electronics" },
      { label: "Mobiiltelefonid", href: "/products/electronics/mobile-phones" },
      {
        label: "Nutitelefonid",
        href: "/products/electronics/mobile-phones/smartphones",
      },
    ],
    shortCrumbs: false,
    breakCrumbs: "md",
  },
  argTypes: {
    crumbs: {
      control: {
        type: "object",
      },
      description: "Array of breadcrumb objects to display.",
      table: {
        type: {
          summary: "Breadcrumb[]",
          detail: `type Breadcrumb = { \n  label: string; \n  href: string; \n}`,
        },
      },
    },
    breakCrumbs: {
      control: "select",
      options: BREAKPOINTS,
      description: "Breakpoint to be used for displaying single crumb.",
      table: {
        type: { summary: "Breakpoint", detail: "xs \nsm \nmd \nlg \nxl \nxxl" },
        defaultValue: { summary: "md" },
      },
    },
    shortCrumbs: {
      control: "boolean",
      description:
        "Used to override the breakCrumbs value and force short crumbs.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
} as Meta<BreadcrumbsComponent>;

type Story = StoryObj<BreadcrumbsComponent>;

export const Default: Story = {};

export const ShortCrumbs: Story = {
  render: (props) => ({
    props,
    template: `
        <tedi-breadcrumbs ${argsToTemplate(props)} />
      `,
  }),
  args: {
    shortCrumbs: true,
  },
};
