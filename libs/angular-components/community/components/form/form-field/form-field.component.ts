import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { LabelComponent } from "../label/label.component";
import { FeedbackTextComponent } from "../feedback-text/feedback-text.component";
import { InputComponent } from "../input/input.component";

@Component({
  selector: "tedi-form-field",
  standalone: true,
  imports: [LabelComponent, FeedbackTextComponent, InputComponent],
  templateUrl: "./form-field.component.html",
  styleUrl: "./form-field.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-form-field]": "true",
  },
})
export class FormFieldComponent {}
