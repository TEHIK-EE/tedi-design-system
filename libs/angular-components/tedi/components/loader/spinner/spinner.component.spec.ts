import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  SpinnerComponent,
  SpinnerColor,
  SpinnerSize,
} from "./spinner.component";

describe("SpinnerComponent", () => {
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    })

    fixture = TestBed.createComponent(SpinnerComponent);
    spinnerElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render the spinner with default props", () => {
    expect(spinnerElement.classList).toContain("tedi-spinner");
    expect(spinnerElement.classList).toContain("tedi-spinner--size-16");
    expect(spinnerElement.classList).toContain("tedi-spinner--color-primary");
  });

  it("should apply different spinner sizes", () => {
    const sizes: SpinnerSize[] = [10, 16, 48];

    for (const size of sizes) {
      fixture.componentRef.setInput("size", size);
      fixture.detectChanges();

      expect(spinnerElement.classList).toContain(`tedi-spinner--size-${size}`);
    }
  });

  it("should apply different spinner colors", () => {
    const colors: SpinnerColor[] = ["primary", "secondary"];

    for (const color of colors) {
      fixture.componentRef.setInput("color", color);
      fixture.detectChanges();

      expect(spinnerElement.classList).toContain(`tedi-spinner--color-${color}`);
    }
  });

  it("should set aria-label when label is provided", () => {
    fixture.componentRef.setInput("label", "Loading content");
    fixture.detectChanges();

    expect(spinnerElement.getAttribute("aria-label")).toBe("Loading content");
    expect(spinnerElement.getAttribute("aria-hidden")).toBe("false");
  });

  it("should hide from screen readers when no label is provided", () => {
    fixture.componentRef.setInput("label", undefined);
    fixture.detectChanges();

    expect(spinnerElement.getAttribute("aria-label")).toBe(null);
    expect(spinnerElement.getAttribute("aria-hidden")).toBe("true");
  });

  it("should handle undefined values", () => {
    expect(spinnerElement.classList.toString()).not.toContain("undefined");
  });
});
