import { Component, input, InputSignal } from "@angular/core";

type TextGroupType = "vertical" | "horizontal";

export type TextGroup = {
  /**
   * Type of text group layout
   */
  type: InputSignal<TextGroupType | undefined>;
  /**
   * Width for the label (e.g., '200px', '30%', etc.)
   * @default 'auto'
   */
  labelWidth: InputSignal<string | undefined>;
  /**
   * Label for the text group
   */
  label: InputSignal<string | undefined>;
  /**
   * Value displayed alongside the label
   */
  value: InputSignal<string | undefined>;
};

@Component({
  standalone: true,
  selector: "tedi-text-group",
  imports: [],
  templateUrl: "./text-group.component.html",
  styleUrl: "./text-group.component.scss",
})
export class TextGroupComponent implements TextGroup {
  label = input<string>();
  value = input<string>();
  type = input<TextGroupType>();
  labelWidth = input<string>();
}
