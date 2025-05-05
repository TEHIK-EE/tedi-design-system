import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  forwardRef,
  input,
  model,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ChoiceGroupDirective } from "../../choicegroup/choicegroup.directive";
import { FeedbackTextComponent } from "../../feedback-text/feedback-text.component";
import { LabelComponent } from "../../label/label.component";
import { CheckboxGroupComponent } from "../checkbox-group/checkbox-group.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";

@Component({
  standalone: true,
  selector: "tedi-checkbox-card-group",
  imports: [FeedbackTextComponent, LabelComponent],
  templateUrl: "./../checkbox-group/checkbox-group.component.html",
  styleUrls: [
    "./../../choicegroup/choicegroup.styles.scss",
    "./../checkbox-group/checkbox-group.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxCardGroupComponent),
      multi: true,
    },
    {
      provide: CheckboxGroupComponent,
      useExisting: CheckboxCardGroupComponent,
    },
  ],
  hostDirectives: [
    {
      directive: ChoiceGroupDirective,
      inputs: ["variant", "hasIndicator", "spacing"],
    },
  ],
})
export class CheckboxCardGroupComponent
  extends CheckboxGroupComponent
  implements ControlValueAccessor
{
  /*
   * Direction in which checkboxes flow.
   */
  override direction = input<"row" | "column">("row");
  /*
   * Value of card group. Do not use with controlled card group.
   */
  value = model<string[]>([]);

  checkboxes = contentChildren(
    forwardRef(() => CheckboxComponent),
    {
      descendants: true,
    },
  );
  private _controlDisabled = signal<boolean>(false);

  private _onChange: (val: string[]) => void = () => {};
  private _onTouched: (val: boolean) => void = () => {};

  override groupDisabled = computed(() => {
    return this.disabled() || this._controlDisabled();
  });

  writeValue(value: string[]): void {
    this.value.set(value);
    this.updateCheckboxesState();
  }
  registerOnChange(fn: (val: string[]) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: (val: boolean) => void): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._controlDisabled.set(isDisabled);
  }

  private updateCheckboxesState() {
    const value = this.value();
    this.checkboxes().forEach((checkbox) => {
      const checked = value?.includes(checkbox.value() as string);
      checkbox.checked.set(checked);
    });
  }

  onCheckboxChange(checked: boolean, value: string) {
    this.value.update((checkedItems) => {
      if (checked) {
        return [...checkedItems, value];
      } else {
        return checkedItems.filter((item) => item !== value);
      }
    });
    this._onChange(this.value());
  }
}
