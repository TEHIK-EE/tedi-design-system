import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from "@angular/core";
import { ButtonComponent } from "community/components/buttons/button/button.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { FormsModule } from "@angular/forms";

export type SearchSize = "large" | "default" | "small";

@Component({
  selector: "tedi-search",
  standalone: true,
  imports: [FormsModule, ButtonComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.scss",
  host: {
    "[class.tedi-search]": "true",
    "[class]": "modifierClasses()",
  },
})
export class SearchComponent {
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

  value = model<string | undefined>(undefined);

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
