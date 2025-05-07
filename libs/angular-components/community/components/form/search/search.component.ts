import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { ButtonComponent } from "community/components/buttons/button/button.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { FormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { CdkMenu, CdkMenuModule } from "@angular/cdk/menu";
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards/card";

export type SearchSize = "large" | "default" | "small";
export type SearchOption = {
  value: string;
  label: string;
  description?: string;
};

@Component({
  selector: "tedi-search",
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    IconComponent,
    OverlayModule,
    CdkMenuModule,
    CardComponent,
    CardContentComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss",
  host: {
    "[class.tedi-search]": "true",
    "[class]": "modifierClasses()",
  },
})
export class SearchComponent implements AfterContentInit {
  options = input<SearchOption[]>([]);

  /**
   * Size of the search component
   * @default "default"
   */
  size = input<SearchSize>("default");

  /**
   * Should the search button be shown
   * @default false
   */
  withButton = input<boolean>(false);

  /**
   * Add text to the search button
   * @default undefined
   */
  buttonText = input<string | undefined>(undefined);

  /**
   * Should the search input be clearable
   * @default true
   */
  clearable = input<boolean>(true);

  onSelect = output<SearchOption>();

  inputValue = model<string>();
  width = signal(0);
  elementRef = inject(ElementRef);

  ngAfterContentInit(): void {
    this.width.set(this.getWidth());
  }

  foundOptions = computed(() => {
    const inputValue = this.inputValue();
    if (!inputValue) return this.options();

    return this.options().filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.description?.toLowerCase().includes(inputValue.toLowerCase()),
    );
  });

  isOpen = signal(false);

  effect = effect(() => {
    const inputValue = this.inputValue();
    if (inputValue && inputValue.length >= 3) {
      this.isOpen.set(true);
    } else {
      this.isOpen.set(false);
    }
  });

  modifierClasses = computed(() => {
    const modifiers = [];
    if (this.size()) modifiers.push(`tedi-search--${this.size()}`);

    return modifiers.join(" ");
  });

  iconSize = computed(() => {
    switch (this.size()) {
      case "large":
        return 24;
      case "small":
        return 16;
      default:
        return 18;
    }
  });

  buttonSize = computed(() => {
    switch (this.size()) {
      case "large":
        return "medium";
      case "small":
        return "small";
      default:
        return "medium";
    }
  });

  selectResult(option: SearchOption) {
    this.inputValue.set(option.value);
    this.isOpen.set(false);
    this.onSelect.emit(option);
  }

  getWidth(): number {
    return this.elementRef?.nativeElement?.getBoundingClientRect()?.width || 0;
  }
}
