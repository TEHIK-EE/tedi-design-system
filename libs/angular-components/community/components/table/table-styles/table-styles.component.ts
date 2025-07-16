import { CdkScrollable } from "@angular/cdk/scrolling";
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from "@angular/core";

export type TableSize = "default" | "small";

@Component({
  selector: "tedi-table-styles",
  imports: [CdkScrollable],
  templateUrl: "./table-styles.component.html",
  styleUrl: "./table-styles.component.scss",
  host: {
    "[class.tedi-table-styles]": "true",
    "[class.tedi-table-styles--striped]": "striped()",
    "[class.tedi-table-styles--vertical-borders]": "verticalBorders()",
    "[class.tedi-table-styles--clickable]": "clickable()",
    "[class.tedi-table-styles--sm]": "size() === 'small'",
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableStylesComponent {
  size = input<TableSize>("default");
  verticalBorders = input(false, { transform: booleanAttribute });
  striped = input(false, { transform: booleanAttribute });
  clickable = input(false, { transform: booleanAttribute });
}
