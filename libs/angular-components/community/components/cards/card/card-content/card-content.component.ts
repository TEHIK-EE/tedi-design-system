import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { CardColorsDirective } from "../card-colors.directive";
import { CardPaddingDirective } from "../card-padding.directive";

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
    {
      directive: CardPaddingDirective,
      inputs: ["padding"],
    },
  ],
})
export class CardContentComponent {
  /**
   * Whether content block should have separator.
   * Inside card the separator is created under the content, inside card row the separator is created to the right of content.
   * @default false
   */
  hasSeparator = input(false, { transform: booleanAttribute });
  /**
   * Whether content block should take minimal space inside of row.
   * Sets flex-grow to 0.
   * @default false
   */
  autoWidth = input(false, { transform: booleanAttribute });
  /**
   * Creates a timeline line next to the content block.
   * @default false
   */
  timeline = input(false, { transform: booleanAttribute });
}
