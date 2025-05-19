import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TextGroupComponent } from "./text-group.component";

describe("TextGroupComponent", () => {
  let component: TextGroupComponent;
  let fixture: ComponentFixture<TextGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextGroupComponent],
    });

    fixture = TestBed.createComponent(TextGroupComponent);
    fixture.componentRef.setInput("label", "Label");
    fixture.componentRef.setInput("value", "Value");
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have the correct label and value inputs", () => {
    expect(component.label()).toBe("Label");
    expect(component.value()).toBe("Value");
  });

  it("should apply the default type if not provided", () => {
    expect(component.type()).toBe("horizontal");
  });

  it("should compute the correct classes based on type", () => {
    expect(component.classes()).toContain("tedi-text-group");
    expect(component.classes()).toContain("tedi-text-group--horizontal");

    fixture.componentRef.setInput("type", "vertical");
    fixture.detectChanges();

    expect(component.classes()).toContain("tedi-text-group--vertical");
    expect(component.classes()).not.toContain("tedi-text-group--horizontal");
  });

  it("should handle labelWidth input correctly", () => {
    fixture.componentRef.setInput("labelWidth", "200px");
    fixture.detectChanges();

    expect(component.labelWidth()).toBe("200px");

    fixture.componentRef.setInput("labelWidth", "20%");
    fixture.detectChanges();

    expect(component.labelWidth()).toBe("20%");
  });
});
