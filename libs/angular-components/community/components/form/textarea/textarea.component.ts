import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { InputComponent } from "../input/input.component";

@Component({
  selector: "[tedi-textarea]",
  standalone: true,
  template: "<ng-content />",
  styleUrls: ["../input/input.component.scss", "./textarea.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-textarea]": "true",
    "[class.tedi-textarea--resizeX]": "this.resizeX()",
    "[class.tedi-textarea--resizeY]": "this.resizeY()",
  },
})
export class TextareaComponent extends InputComponent {
  /**
   * Whether the textarea should be resizable in the X direction.
   * @default false
   */
  resizeX = input(false);
  /**
   * Whether the textarea should be resizable in the Y direction.
   * @default true
   */
  resizeY = input(true);
}
