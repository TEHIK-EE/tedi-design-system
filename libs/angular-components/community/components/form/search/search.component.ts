import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  OnInit,
  signal,
  viewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ButtonComponent } from "community/components/buttons/button/button.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { FormsModule } from "@angular/forms";
import { CdkMenu, CdkMenuModule, CdkMenuTrigger } from "@angular/cdk/menu";

export type SearchSize = "large" | "default" | "small";
export type SearchOption = {
  value: string;
  label: string;
  description?: string;
};

@Component({
  selector: "tedi-search",
  standalone: true,
  imports: [FormsModule, ButtonComponent, IconComponent, CdkMenuModule],
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

  value = model<string>();

  menu = viewChild("searchPanel", { read: CdkMenu });
  trigger = viewChild(CdkMenuTrigger);

  ngAfterContentInit(): void {}

  foundOptions = computed(() => {
    if (!this.value()) return this.options();

    return this.options().filter((option) =>
      option.value.toLowerCase().includes(this.value()!.toLowerCase()),
    );
  });

  effect = effect(() => {
    if (this.value() && this.value()!.length >= 3) {
      this.trigger()?.open();
    } else {
      this.trigger()?.close();
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
}
