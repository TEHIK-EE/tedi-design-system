import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { CheckboxSize } from "../checkbox/checkbox.component";
import {
  ComponentInputs,
  LabelComponent,
  FeedbackTextComponent,
} from "@tehik-ee/tedi-angular/tedi";
import { generateUUID } from "../../../../../tedi/helpers/generateUUID";

@Component({
  standalone: true,
  selector: "tedi-checkbox-group",
  imports: [FeedbackTextComponent, LabelComponent],
  templateUrl: "./checkbox-group.component.html",
  styleUrl: "./checkbox-group.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-checkbox-group]": "true",
    "[attr.role]": "'group'",
    "[attr.aria-labelledby]": "labelId()",
  },
})
export class CheckboxGroupComponent {
  /**
   * Checkbox group label.
   */
  label = input<string>();
  /*
   * Whether checkbox group is disabled
   */
  disabled = input<boolean>();
  /*
   * Whether checkbox group has error.
   */
  hasError = input<boolean>();
  /*
   * Size of the checkboxes in group.
   */
  size = input<CheckboxSize>();
  /*
   * Direction in which checkboxes flow.
   */
  direction = input<"row" | "column">("column");
  /*
   * Spacing between checkboxes. unit: px.
   * @default 4
   */
  spacing = input<number>(4);
  /**
   * FeedbackText component inputs.
   */
  feedbackText = input<ComponentInputs<FeedbackTextComponent>>();

  labelId = computed(() => {
    if (this.label()) {
      return generateUUID();
    }
    return;
  });

  groupDisabled = computed(() => this.disabled());
}
