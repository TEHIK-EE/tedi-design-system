import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToggleComponent, ToggleVariant, ToggleType, ToggleSize } from "./toggle.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";
import { By } from "@angular/platform-browser";

describe("ToggleComponent", () => {
  let fixture: ComponentFixture<ToggleComponent>;
  let component: ToggleComponent;
  let el: HTMLElement;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent, IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    // set required id input before initial detectChanges
    fixture.componentRef.setInput("id", "test-toggle");
    fixture.detectChanges();

    component = fixture.componentInstance;
    el = fixture.nativeElement;
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default unchecked state", () => {
    expect(component.checked()).toBe(false);
    expect(inputEl.checked).toBe(false);
  });

  it("should apply default classes", () => {
    const hostClasses = el.className;
    expect(hostClasses).toContain('tedi-toggle');
    expect(hostClasses).toContain('tedi-toggle--primary-filled');
    expect(hostClasses).toContain('tedi-toggle--size-default');
  });

  it("should update classes when variant, type, and size inputs change", () => {
    fixture.componentRef.setInput("variant", 'colored' as ToggleVariant);
    fixture.componentRef.setInput("type", 'outlined' as ToggleType);
    fixture.componentRef.setInput("size", 'large' as ToggleSize);
    fixture.detectChanges();

    const classes = el.className;
    expect(classes).toContain('tedi-toggle--colored-outlined');
    expect(classes).toContain('tedi-toggle--size-large');
  });

  describe("iconColor computed property", () => {
    it("returns white when type is outlined, regardless of checked", () => {
      fixture.componentRef.setInput("type", 'outlined');
      fixture.detectChanges();
      expect(component.iconColor()).toBe('white');

      component.checked.set(true);
      expect(component.iconColor()).toBe('white');
    });

    it("returns tertiary when filled primary and unchecked", () => {
      fixture.componentRef.setInput("type", 'filled');
      fixture.componentRef.setInput("variant", 'primary');
      component.checked.set(false);
      expect(component.iconColor()).toBe('tertiary');
    });

    it("returns brand when filled primary and checked", () => {
      fixture.componentRef.setInput("type", 'filled');
      fixture.componentRef.setInput("variant", 'primary');
      component.checked.set(true);
      expect(component.iconColor()).toBe('brand');
    });

    it("returns danger when filled colored and unchecked", () => {
      fixture.componentRef.setInput("variant", 'colored');
      fixture.componentRef.setInput("type", 'filled');
      component.checked.set(false);
      expect(component.iconColor()).toBe('danger');
    });

    it("returns success when filled colored and checked", () => {
      fixture.componentRef.setInput("variant", 'colored');
      fixture.componentRef.setInput("type", 'filled');
      component.checked.set(true);
      expect(component.iconColor()).toBe('success');
    });
  });

  describe("ControlValueAccessor implementation", () => {
    it("writeValue should update checked state and input checked property", () => {
      component.writeValue(true);
      fixture.detectChanges();
      expect(component.checked()).toBe(true);
      expect(inputEl.checked).toBe(true);

      component.writeValue(false);
      fixture.detectChanges();
      expect(component.checked()).toBe(false);
      expect(inputEl.checked).toBe(false);
    });

    it("should call onChange when handleChange is triggered by user", () => {
      const onChange = jest.fn<boolean, [boolean]>();
      component.registerOnChange(onChange);

      inputEl.checked = true;
      inputEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalledWith(true);
      expect(component.checked()).toBe(true);
    });
  });

  describe("focus and blur methods", () => {
    it("focus() should focus the input element", () => {
      const focusSpy = jest.spyOn(inputEl, 'focus');
      component.focus();
      expect(focusSpy).toHaveBeenCalled();
    });

    it("blur() should blur the input element and mark touched", () => {
      const blurSpy = jest.spyOn(inputEl, 'blur');
      const onTouched = jest.fn();
      component.registerOnTouched(onTouched);

      component.blur();
      expect(blurSpy).toHaveBeenCalled();
      expect(onTouched).toHaveBeenCalled();
    });
  });

  it("should disable input when disabled input is true", () => {
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();
    expect(inputEl.disabled).toBe(true);
  });

  it("should set required attribute when required input is true", () => {
    fixture.componentRef.setInput("required", true);
    fixture.detectChanges();
    expect(inputEl.required).toBe(true);
  });

  it("should render lock IconComponent when icon=true and size=large", () => {
    fixture.componentRef.setInput("size", 'large' as ToggleSize);
    fixture.componentRef.setInput("icon", true);
    fixture.detectChanges();

    const iconDebug = fixture.debugElement.query(By.directive(IconComponent));
    expect(iconDebug).toBeTruthy();
  });
});
