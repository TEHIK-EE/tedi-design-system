import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "select2-option",
  imports: [],
  template: "<ng-content />",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select2OptionComponent {
  /**
   * Value of the option
   */
  value = input.required<string>();
  /**
   * Label of the option
   */
  label = input.required<string>();
  /**
   * Whether the option is disabled
   */
  disabled = input(false);
  /**
   * Group the option belongs to
   * This is used for grouping options in the dropdown.
   * If not provided, the option will not be grouped.
   */
  group = input<string | null>(null);
}
