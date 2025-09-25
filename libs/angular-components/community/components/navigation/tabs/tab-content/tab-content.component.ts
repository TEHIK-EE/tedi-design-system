import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "tedi-tab-content",
  imports: [],
  templateUrl: "./tab-content.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContentComponent {
  tabId = input.required<string>();
  content = viewChild.required<TemplateRef<unknown>>("content");
}
