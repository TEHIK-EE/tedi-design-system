import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { CardColorsDirective } from "../../card/card-colors.directive";

@Component({
  standalone: true,
  selector: "tedi-accordion-icon",
  templateUrl: "./accordion-icon.component.html",
  styleUrl: "./accordion-icon.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-accordion-icon]": "true",
  },
  hostDirectives: [
    {
      directive: CardColorsDirective,
      inputs: ["background"],
    },
  ],
})
export class AccordionIconComponent {}
