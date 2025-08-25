import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-text-group-value",
  template: `<ng-content />`,
  styleUrl: "./text-group.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TextGroupValueComponent {}
