import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import {
  SpinnerComponent,
  SpinnerColor,
  SpinnerSize,
} from "./spinner.component";

@Component({
  template: `
    <tedi-spinner
      [size]="size"
      [color]="color"
      [class]="class"
      [label]="label"
    />
  `,
})
class HostSpinnerComponent {
  size: SpinnerSize = 16;
  color: SpinnerColor = "primary";
  class: string | undefined = undefined;
  label: string | undefined = undefined;
}

describe("SpinnerComponent", () => {
  let hostComponent: HostSpinnerComponent;
  let hostFixture: ComponentFixture<HostSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent, HostSpinnerComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostSpinnerComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it("should create component", () => {
    expect(hostComponent).toBeTruthy();
  });

  it("should render the spinner with default props", () => {
    const spinnerElement = hostFixture.debugElement.query(
      By.css(".tedi-spinner"),
    );
    expect(spinnerElement).toBeTruthy();
  });

  it("should apply the correct classes with default settings", () => {
    const spinnerElement = hostFixture.debugElement.query(
      By.css(".tedi-spinner"),
    );
    const classString = spinnerElement.nativeElement.className;

    expect(classString).toContain("tedi-spinner");
    expect(classString).toContain("tedi-spinner--size-16");
    expect(classString).toContain("tedi-spinner--color-primary");
  });

  it("should apply custom class", () => {
    hostComponent.class = "test-class";
    hostFixture.detectChanges();

    const spinnerElement = hostFixture.debugElement.query(
      By.css(".tedi-spinner"),
    );
    expect(
      spinnerElement.nativeElement.classList.contains("test-class"),
    ).toBeTruthy();
  });

  it("should apply different spinner sizes", () => {
    const sizes: SpinnerSize[] = [10, 16, 48];

    for (const size of sizes) {
      hostComponent.size = size;
      hostFixture.detectChanges();

      const spinnerElement = hostFixture.debugElement.query(
        By.css(".tedi-spinner"),
      );
      expect(
        spinnerElement.nativeElement.classList.contains(
          `tedi-spinner--size-${size}`,
        ),
      ).toBeTruthy();
    }
  });

  it("should apply different spinner colors", () => {
    const colors: SpinnerColor[] = ["primary", "secondary"];

    for (const color of colors) {
      hostComponent.color = color;
      hostFixture.detectChanges();

      const spinnerElement = hostFixture.debugElement.query(
        By.css(".tedi-spinner"),
      );
      expect(
        spinnerElement.nativeElement.classList.contains(
          `tedi-spinner--color-${color}`,
        ),
      ).toBeTruthy();
    }
  });

  it("should set aria-label when label is provided", () => {
    hostComponent.label = "Loading content";
    hostFixture.detectChanges();

    const spinnerElement = hostFixture.debugElement.query(
      By.css(".tedi-spinner"),
    );
    expect(spinnerElement.nativeElement.getAttribute("aria-label")).toBe(
      "Loading content",
    );
  });

  it("should hide from screen readers when no label is provided", () => {
    hostComponent.label = undefined;
    hostFixture.detectChanges();

    const spinnerElement = hostFixture.debugElement.query(
      By.css(".tedi-spinner"),
    );
    expect(spinnerElement.nativeElement.getAttribute("aria-hidden")).toBe(
      "true",
    );
  });

  it("should handle undefined values", () => {
    hostFixture.detectChanges();

    const spinnerElement = hostFixture.debugElement.query(
      By.css(".tedi-spinner"),
    );
    expect(spinnerElement).toBeTruthy();
    expect(spinnerElement.nativeElement.classList.toString()).not.toContain(
      "undefined",
    );
  });
});
