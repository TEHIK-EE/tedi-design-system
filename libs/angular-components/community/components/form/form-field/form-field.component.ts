import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-form-field",
  standalone: true,
  imports: [],
  template: "<ng-content />",
  styleUrl: "./form-field.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-form-field]": "true",
  },
})
export class FormFieldComponent {}
