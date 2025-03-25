import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { CardColorsDirective } from "../card-colors.directive";

@Component({
  selector: "tedi-card-content",
  standalone: true,
  imports: [],
  templateUrl: "./card-content.component.html",
  styleUrl: "./card-content.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-card-content]": "true",
    "[class.tedi-card-content--has-separator]": "hasSeparator() || timeline()",
    "[class.tedi-card-content--auto-width]": "autoWidth()",
    "[class.tedi-card-content--timeline]": "timeline()",
  },
  hostDirectives: [
    {
      directive: CardColorsDirective,
      inputs: ["background", "border"],
    },
  ],
})
export class CardContentComponent {
  hasSeparator = input<boolean>();
  autoWidth = input<boolean>();
  timeline = input<boolean>();
}
