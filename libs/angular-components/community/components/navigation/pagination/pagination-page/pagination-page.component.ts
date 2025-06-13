import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import {
  TediTranslationPipe,
  TextComponent,
} from "@tehik-ee/tedi-angular/tedi";

@Component({
  selector: "tedi-pagination-page",
  imports: [TextComponent, TediTranslationPipe],
  templateUrl: "./pagination-page.component.html",
  styleUrl: "./pagination-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationPageComponent {
  page = input.required<number>();
  active = input<boolean>();
  pageSelected = output<void>();

  selectPage() {
    this.pageSelected.emit();
  }
}
