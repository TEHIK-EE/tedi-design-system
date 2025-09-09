import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-card-row",
  standalone: true,
  imports: [],
  templateUrl: "./card-row.component.html",
  styleUrl: "./card-row.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.tedi-card-row]": "true",
    "[class.tedi-card-row--has-separator]": "hasSeparator()",
  },
})
export class CardRowComponent {
  /**
   * Whether row should have separator under it.
   * @default false
   */
  hasSeparator = input(false, { transform: booleanAttribute });
}
