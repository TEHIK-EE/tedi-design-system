import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberFieldComponent } from './number-field.component';
import { LabelComponent } from '../label/label.component';
import { ButtonComponent } from '../../buttons/button/button.component';
import { IconComponent } from '../../base/icon/icon.component';
import { TextComponent } from '../../base/text/text.component';
import { FeedbackTextComponent } from '../feedback-text/feedback-text.component';

describe('NumberFieldComponent', () => {
  let fixture: ComponentFixture<NumberFieldComponent>;
  let component: NumberFieldComponent;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NumberFieldComponent,
        LabelComponent,
        ButtonComponent,
        IconComponent,
        TextComponent,
        FeedbackTextComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberFieldComponent);
    fixture.componentRef.setInput("id", "test-id");
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default value (0)', () => {
    expect(component.value()).toBe(0);
  });

  it('should increment the value on increment button click', () => {
    const onChangeSpy = jest.fn<number, [number]>();
    const onTouchedSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    // find the increment button (assume it's the second button in the template)
    const buttons = nativeEl.querySelectorAll('button');
    const incrementBtn = buttons[1] as HTMLButtonElement;

    incrementBtn.click();
    fixture.detectChanges();

    expect(component.value()).toBe(1);
    expect(onChangeSpy).toHaveBeenCalledWith(1);
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should decrement the value on decrement button click', () => {
    // set initial value to 5
    component.writeValue(5);
    fixture.detectChanges();

    const onChangeSpy = jest.fn<number, [number]>();
    component.registerOnChange(onChangeSpy);

    // find the decrement button (assume it's the first button)
    const buttons = nativeEl.querySelectorAll('button');
    const decrementBtn = buttons[0] as HTMLButtonElement;

    decrementBtn.click();
    fixture.detectChanges();

    expect(component.value()).toBe(4);
    expect(onChangeSpy).toHaveBeenCalledWith(4);
  });

  it('should disable decrement button when value === min', () => {
    component.writeValue(3);
    fixture.componentRef.setInput('min', 3);
    fixture.detectChanges();

    const decrementBtn = nativeEl.querySelector('button') as HTMLButtonElement;
    expect(decrementBtn.disabled).toBeTruthy();
  });

  it('should disable increment button when value === max', () => {
    component.writeValue(2);
    fixture.componentRef.setInput('max', 2);
    fixture.detectChanges();

    const buttons = nativeEl.querySelectorAll('button');
    const incrementBtn = buttons[1] as HTMLButtonElement;
    expect(incrementBtn.disabled).toBeTruthy();
  });

  it('should call onChange when input is changed', () => {
    const onChangeSpy = jest.fn<number, [number]>();
    component.registerOnChange(onChangeSpy);

    const inputEl = nativeEl.querySelector('input') as HTMLInputElement;
    inputEl.value = '10';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value()).toBe(10);
    expect(onChangeSpy).toHaveBeenCalledWith(10);
  });

  it('should call onTouched when input is blurred', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);

    const inputEl = nativeEl.querySelector('input') as HTMLInputElement;
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should respect disabled input and disable all controls', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const inputEl = nativeEl.querySelector('input') as HTMLInputElement;
    const buttons = nativeEl.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

    expect(component.isDisabled()).toBeTruthy();
    expect(inputEl.disabled).toBeTruthy();
    buttons.forEach(btn => {
      expect(btn.disabled).toBeTruthy();
    });
  });
});
