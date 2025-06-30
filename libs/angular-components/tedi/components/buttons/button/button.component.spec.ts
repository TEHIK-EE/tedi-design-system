import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent, ButtonSize, ButtonVariant } from "./button.component";
import { IconComponent } from "../../base/icon/icon.component";

describe("ButtonComponent", () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent, IconComponent],
    });

    fixture = TestBed.createComponent(ButtonComponent);
    buttonElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should apply default classes", () => {
    expect(buttonElement.classList).toContain("tedi-button");
    expect(buttonElement.classList).toContain("tedi-button--primary");
    expect(buttonElement.classList).toContain("tedi-button--default");
  });

  it("should apply correct variants", () => {
    const variants: ButtonVariant[] = [
      "primary",
      "secondary",
      "neutral",
      "success",
      "danger",
      "danger-neutral",
      "primary-inverted",
      "secondary-inverted",
      "neutral-inverted",
    ];

    for (const variant of variants) {
      fixture.componentRef.setInput("variant", variant);
      fixture.detectChanges();

      expect(buttonElement.classList).toContain(`tedi-button--${variant}`);
    }
  });

  it("should apply correct sizes", () => {
    const sizes: ButtonSize[] = ["default", "small"];

    for (const size of sizes) {
      fixture.componentRef.setInput("size", size);
      fixture.detectChanges();

      expect(buttonElement.classList).toContain(`tedi-button--${size}`);
    }
  });

  it("should not contain 'undefined' in class list", () => {
    expect(buttonElement.classList).not.toContain("undefined");
  });
});
