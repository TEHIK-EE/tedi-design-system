import {
  Component,
  signal,
  WritableSignal,
  forwardRef,
  input,
  ContentChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  HostListener,
  inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkMenuModule, MenuStack, MENU_STACK } from "@angular/cdk/menu";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SelectOptionComponent } from "./select-option.component";
import { InputComponent } from "../input/input.component";
import {
  CardComponent,
  CardContentComponent,
} from "community/components/cards/card";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

@Component({
  selector: "tedi-select",
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuModule,
    InputComponent,
    CardComponent,
    CardContentComponent,
    IconComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    { provide: MENU_STACK, useClass: MenuStack },
  ],
  host: {
    "[class.tedi-select]": "true",
  },
})
export class SelectComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  /**
   * The placeholder text to display when no option is selected.
   * @default ""
   */
  placeholder = input<string>("");

  /**
   * Is the select disabled?
   * @default false
   */
  isDisabled = input<boolean>(false);

  @ContentChildren(SelectOptionComponent)
  options!: QueryList<SelectOptionComponent>;

  // Internal state
  selectedValue: WritableSignal<any> = signal(null);
  selectedLabel: WritableSignal<string | null> = signal(null);
  disabled: WritableSignal<boolean> = signal(false);
  width: WritableSignal<number> = signal(0);

  private elementRef = inject(ElementRef);
  private resizeObserver: ResizeObserver | null = null;

  // ControlValueAccessor methods
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue.set(value);

    // Update the label if we have options and the value matches one of them
    if (this.options) {
      const option = this.options.find((opt) => opt.value === value);
      if (option) {
        // Access the extracted content text from the option component
        const optionElement = option["elementRef"].nativeElement;
        const optionText = optionElement.textContent.trim();
        this.selectedLabel.set(optionText);
      } else {
        this.selectedLabel.set(null);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  select(value: any, label: string) {
    this.selectedValue.set(value);
    this.selectedLabel.set(label);
    this.onChange(value);
    this.onTouched();
  }

  ngAfterViewInit() {
    // Calculate initial width
    this.calculateWidth();

    // Set up ResizeObserver for more accurate element resizing
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => {
        this.calculateWidth();
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);
    }
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.calculateWidth();
  }

  private calculateWidth() {
    if (this.elementRef && this.elementRef.nativeElement) {
      const element = this.elementRef.nativeElement;
      const computedWidth = element.getBoundingClientRect().width;
      this.width.set(computedWidth);
    }
  }

  ngOnDestroy() {
    // Cleanup ResizeObserver if it exists
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
}
