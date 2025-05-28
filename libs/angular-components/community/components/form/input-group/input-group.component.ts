import { Component, input, ViewEncapsulation } from "@angular/core";
import { FeedbackTextComponent } from "../feedback-text/feedback-text.component";
import { ComponentInputs, LabelComponent } from "@tehik-ee/tedi-angular/tedi";

/**
 * InputGroupComponent is a component that allows you to group multiple input elements together.
 *
 *
 * Use prefix-slot, suffix-slot and unnamed slots to add input elements to the group.
 * @example
 * <tedi-input-group>
 *   <tedi-button prefix-slot>Prefix</tedi-button>
 *   <tedi-button suffix-slot>Suffix</tedi-button>
 *   <input></input>
 * </tedi-input-group>
 *
 */
@Component({
  selector: "tedi-input-group",
  standalone: true,
  templateUrl: "./input-group.component.html",
  styleUrls: ["./input-group.component.scss"],
  encapsulation: ViewEncapsulation.None,
  imports: [FeedbackTextComponent, LabelComponent],
})
export class InputGroupComponent {
  /**
   * User-visible label for the input group, visible above the input, should describe the purpose of the input group.
   */
  readonly label = input<string>();

  /**
   * ID of the input group's label, used to associate the label with the input group's custom input.
   */
  readonly labelID = input<string>();

  /**
   * Disabled state of the input group, causes the input group to be grayed out.
   * Does not affect children's disabled state.
   * @default false
   */
  readonly disabled = input<boolean>(false);

  /**
   * FeedbackText component inputs, displayed below the input group.
   */
  readonly feedback = input<ComponentInputs<FeedbackTextComponent>>();
}
