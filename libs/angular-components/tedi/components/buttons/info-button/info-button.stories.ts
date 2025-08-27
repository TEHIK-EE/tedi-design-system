import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from "@storybook/angular";
import { InfoButtonComponent } from "./info-button.component";
import { RowComponent } from "../../helpers/grid/row/row.component";
import { ColComponent } from "../../helpers/grid/col/col.component";

const PSEUDO_STATE = ["Default", "Hover", "Active", "Focus"];

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-72997&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/0341c9-info-button" target="_blank">Zeroheight ↗</a>
 *
 * This is a simple info button component that can be used to display additional information when hovered over. It's mosty used together wihh tooltips or popovers.
 * It can be used in various contexts, such as forms, dashboards, or any other UI where additional information is needed.
 */

export default {
  title: "TEDI-Ready/Components/Buttons/InfoButton",
  component: InfoButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [InfoButtonComponent, RowComponent, ColComponent],
    }),
  ],
} as Meta<InfoButtonComponent>;

export const Default: StoryObj<InfoButtonComponent> = {
  render: (args) => ({
    props: args,
    template: `
        <button tedi-info-button ${argsToTemplate(args)}></button>
      `,
  }),
};

export const States: StoryObj<InfoButtonComponent> = {
  parameters: {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus",
    },
  },
  render: (args) => ({
    props: { ...args, pseudoState: PSEUDO_STATE },
    template: `
      <tedi-row [cols]="1" [gapY]="5">
        <tedi-col *ngFor="let state of pseudoState;" style="max-width: 200px; display: grid; grid-template-columns: repeat(2, 1fr);">
          <b>{{ state }}</b>
          <button tedi-info-button ${argsToTemplate(args)} [id]="state"></button>
        </tedi-col>
      </tedi-row>
    `,
  }),
};
