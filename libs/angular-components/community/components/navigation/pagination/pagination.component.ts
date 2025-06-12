import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent, TextComponent } from "tedi/components";
import { TediTranslationPipe } from "tedi/services/translation/translation.pipe";
import { IconComponent } from "../../../../tedi/components/base/icon/icon.component";
import { PaginationPageComponent } from "./pagination-page/pagination-page.component";
import { getPagesToDisplay } from "./pagination.utils";

@Component({
  selector: "tedi-pagination",
  imports: [
    ButtonComponent,
    IconComponent,
    TextComponent,
    TediTranslationPipe,
    PaginationPageComponent,
    FormsModule,
  ],
  templateUrl: "./pagination.component.html",
  styleUrl: "./pagination.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
  page = model<number>(1);
  pageSize = model<number>(50);
  pageSizeOptions = input<number[]>([10, 50, 100]);
  length = input<number>(0);
  hideResults = input(false, { transform: booleanAttribute });
  hidePageSize = input(false, { transform: booleanAttribute });

  private lastPage = computed(() => {
    return Math.ceil(this.length() / this.pageSize());
  });

  dropdownId = crypto.randomUUID();

  pages = computed(() => {
    return getPagesToDisplay(this.page(), this.lastPage());
  });

  hasPreviousButton = computed(() => this.page() > 1);

  hasNextButton = computed(() => this.page() < this.lastPage());

  changePage(step: 1 | -1) {
    this.page.update((currentPage) => currentPage + step);
  }

  selectPage(page: number) {
    this.page.set(page);
  }

  pageSizeChanged() {
    this.page.set(1);
  }
}
