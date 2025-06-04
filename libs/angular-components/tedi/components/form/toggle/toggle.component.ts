import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  model,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { IconColor, IconComponent } from "../../base/icon/icon.component";

export type ToggleVariant = "primary" | "colored";
export type ToggleType = "filled" | "outlined";
export type ToggleSize = "default" | "large";

@Component({
  selector: "tedi-toggle",
  standalone: true,
  templateUrl: "./toggle.component.html",
  styleUrl: "./toggle.component.scss",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ],
  host: {
    "[class]": "classes()"
  }
})
export class ToggleComponent implements ControlValueAccessor {
  /**
   * The unique identifier for the input element that is associated with label.
   */
  id = input.required<string>();
  /**
   * Is toggle checked? Supports two-way binding, use with form controls.
   */
  checked = model<boolean>(false);
  /**
   * Is input disabled?
   * @default false
   */
  disabled = input<boolean>(false);
  /**
   * Indicates whether the input field is required.
   * @default false
   */
  required = input<boolean>(false);
  /**
   * Color variant of the toggle
   * @default primary
   */
  variant = input<ToggleVariant>("primary");
  /**
   * Type of the toggle
   * @default filled
   */
  type = input<ToggleType>("filled");
  /**
   * Size of the toggle
   * @default default
   */
  size = input<ToggleSize>("default");
  /**
   * Should the toggle show lock icon. Works only with large toggle.
   * @default false
   */
  icon = input<boolean>(false);

  @ViewChild('inputElement') inputRef!: ElementRef<HTMLInputElement>;
  private onChange: (checked: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(checked: boolean): void {
    this.checked.set(checked);
  }

  registerOnChange(fn: (checked: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  focus(): void {
    this.inputRef.nativeElement.focus();
  }

  blur(): void {
    this.inputRef.nativeElement.blur();
    this.onTouched();
  }

  handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
    this.onChange(target.checked);
  }

  classes = computed(() => {
    return [
      "tedi-toggle",
      `tedi-toggle--${this.variant()}-${this.type()}`,
      `tedi-toggle--size-${this.size()}`,
    ].join(" ");
  });

  iconColor = computed<IconColor>(() => {
    if (this.type() === "outlined") {
      return 'white';
    }

    switch (this.variant()) {
      case "primary":
        return this.checked() ? "brand": "tertiary";
      case "colored":
        return this.checked() ? "success" : "danger";
    }
  });
}
