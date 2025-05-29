import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToggleComponent, ToggleSize, ToggleVariant, ToggleType } from "./toggle.component";
import { IconComponent } from "../../base/icon/icon.component";
import { By } from "@angular/platform-browser";

describe("ToggleComponent", () => {
  let fixture: ComponentFixture<ToggleComponent>;
  let toggleElement: HTMLElement;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToggleComponent, IconComponent],
    });

    fixture = TestBed.createComponent(ToggleComponent);
    fixture.componentRef.setInput("id", "test-toggle-id");
    toggleElement = fixture.nativeElement;
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css("input")).nativeElement;
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should apply default classes", () => {
    const classes = toggleElement.classList;
    expect(classes).toContain("tedi-toggle");
    expect(classes).toContain("tedi-toggle--primary-filled");
    expect(classes).toContain("tedi-toggle--size-default");
  });

  it("should apply correct variant-type combinations", () => {
    const variants: ToggleVariant[] = ["primary", "colored"];
    const types: ToggleType[] = ["filled", "outlined"];

    for (const variant of variants) {
      for (const type of types) {
        fixture.componentRef.setInput("variant", variant);
        fixture.componentRef.setInput("type", type);
        fixture.detectChanges();

        expect(toggleElement.classList).toContain(`tedi-toggle--${variant}-${type}`);
      }
    }
  });

  it("should apply correct sizes", () => {
    const sizes: ToggleSize[] = ["default", "large"];

    for (const size of sizes) {
      fixture.componentRef.setInput("size", size);
      fixture.detectChanges();

      expect(toggleElement.classList).toContain(`tedi-toggle--size-${size}`);
    }
  });

  it("should not contain 'undefined' in class list", () => {
    expect(toggleElement.classList).not.toContain("undefined");
  });

  it("should render lock icon when icon=true and size=large", () => {
    fixture.componentRef.setInput("icon", true);
    fixture.componentRef.setInput("size", "large");
    fixture.detectChanges();

    const iconDebugEl = fixture.debugElement.query(By.directive(IconComponent));
    expect(iconDebugEl).toBeTruthy();
  });

  describe("ControlValueAccessor methods", () => {
    it("writeValue should update checked model and input checked", () => {
      expect(fixture.componentInstance.checked()).toBe(false);
      expect(inputEl.checked).toBe(false);

      fixture.componentInstance.writeValue(true);
      fixture.detectChanges();
      expect(fixture.componentInstance.checked()).toBe(true);
      expect(inputEl.checked).toBe(true);

      fixture.componentInstance.writeValue(false);
      fixture.detectChanges();
      expect(fixture.componentInstance.checked()).toBe(false);
      expect(inputEl.checked).toBe(false);
    });

    it("registerOnChange should register handler and handleChange should call it", () => {
      const changeSpy = jest.fn();
      fixture.componentInstance.registerOnChange(changeSpy);

      inputEl.checked = true;
      inputEl.dispatchEvent(new Event("change"));
      fixture.detectChanges();

      expect(changeSpy).toHaveBeenCalledWith(true);
      expect(fixture.componentInstance.checked()).toBe(true);
    });

    it("registerOnTouched and blur should call onTouched callback", () => {
      const touchSpy = jest.fn();
      fixture.componentInstance.registerOnTouched(touchSpy);

      const blurSpy = jest.spyOn(inputEl, "blur");
      fixture.componentInstance.blur();
      fixture.detectChanges();

      expect(blurSpy).toHaveBeenCalled();
      expect(touchSpy).toHaveBeenCalled();
    });

    it("focus() should call focus on the input element", () => {
      const focusSpy = jest.spyOn(inputEl, "focus");
      fixture.componentInstance.focus();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe("iconColor computed property", () => {
    it("should return white when type is outlined, regardless of variant or checked", () => {
      fixture.componentRef.setInput("type", "outlined");
      fixture.componentRef.setInput("variant", "primary");
      fixture.componentInstance.checked.set(true);
      expect(fixture.componentInstance.iconColor()).toBe("white");

      fixture.componentInstance.checked.set(false);
      expect(fixture.componentInstance.iconColor()).toBe("white");

      fixture.componentRef.setInput("variant", "colored");
      fixture.componentInstance.checked.set(true);
      expect(fixture.componentInstance.iconColor()).toBe("white");
    });

    it("should return tertiary when type=filled, variant=primary, checked=false", () => {
      fixture.componentRef.setInput("type", "filled");
      fixture.componentRef.setInput("variant", "primary");
      fixture.componentInstance.checked.set(false);
      expect(fixture.componentInstance.iconColor()).toBe("tertiary");
    });

    it("should return brand when type=filled, variant=primary, checked=true", () => {
      fixture.componentRef.setInput("type", "filled");
      fixture.componentRef.setInput("variant", "primary");
      fixture.componentInstance.checked.set(true);
      expect(fixture.componentInstance.iconColor()).toBe("brand");
    });

    it("should return danger when type=filled, variant=colored, checked=false", () => {
      fixture.componentRef.setInput("type", "filled");
      fixture.componentRef.setInput("variant", "colored");
      fixture.componentInstance.checked.set(false);
      expect(fixture.componentInstance.iconColor()).toBe("danger");
    });

    it("should return success when type=filled, variant=colored, checked=true", () => {
      fixture.componentRef.setInput("type", "filled");
      fixture.componentRef.setInput("variant", "colored");
      fixture.componentInstance.checked.set(true);
      expect(fixture.componentInstance.iconColor()).toBe("success");
    });
  });
});
