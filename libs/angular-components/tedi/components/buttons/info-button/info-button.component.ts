import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { IconComponent } from "../../base/icon/icon.component";

@Component({
  standalone: true,
  selector: "button[tedi-info-button]",
  imports: [IconComponent],
  template: `<tedi-icon name="info" [size]="18" />`,
  styleUrl: "./info-button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "class": "tedi-info-button",
  }
})
export class InfoButtonComponent {}
