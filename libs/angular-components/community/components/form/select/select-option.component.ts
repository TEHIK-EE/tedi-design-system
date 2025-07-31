import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-select-option",
  imports: [],
  template: "<ng-template><ng-content /></ng-template>",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent {
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

  templateRef = viewChild(TemplateRef);
}
