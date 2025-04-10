import { Component, computed, input } from "@angular/core";
import { InputsWithSignals } from "tedi/types/inputs.type";

type TextGroupType = "vertical" | "horizontal";

export type TextGroup = {
  /**
   * Type of text group layout
   * @default 'horizontal'
   */
  type: TextGroupType;
  /**
   * Width for the label (e.g., '200px', '30%', etc.)
   * @default 'auto'
   */
  labelWidth: string;
  /**
   * Label for the text group
   */
  label?: string;
  /**
   * Value displayed alongside the label
   */
  value?: string;
};

@Component({
  standalone: true,
  selector: "tedi-text-group",
  imports: [],
  templateUrl: "./text-group.component.html",
  styleUrl: "./text-group.component.scss",
})
export class TextGroupComponent implements InputsWithSignals<TextGroup> {
  label = input<string>();
  value = input<string>();
  type = input<TextGroupType>("horizontal");
  labelWidth = input<string>("auto");

  classes = computed(() => {
    const classList = ["tedi-text-group"];
    if (this.type()) {
      classList.push(`tedi-text-group--${this.type()}`);
    }
    return classList.join(" ");
  });

  labelWidthStyle = computed(() => {
    if (this.labelWidth()) {
      return {
        "--label-width": this.labelWidth() ? this.labelWidth() : "auto",
      };
    } else return {};
  });
}
