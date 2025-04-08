import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  IconComponent,
  IconSize,
  IconType,
  IconColor,
  IconBackgroundColor,
} from "./icon.component";

describe("IconComponent", () => {
  let fixture: ComponentFixture<IconComponent>;
  let iconElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconComponent],
    });

    fixture = TestBed.createComponent(IconComponent);
    fixture.componentRef.setInput("name", "search");
    iconElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render the icon with default props", () => {
    expect(iconElement.classList).toContain("material-symbols");
    expect(iconElement.classList).toContain("material-symbols--outlined");
    expect(iconElement.classList).toContain("notranslate");
    expect(iconElement.classList).toContain("tedi-icon");
    expect(iconElement.classList).toContain("tedi-icon--size-24");
    expect(iconElement.classList).toContain("tedi-icon--color-primary");
    expect(iconElement.textContent?.trim()).toBe("search");
    expect(iconElement.getAttribute("role")).toBe("img");
    expect(iconElement.getAttribute("aria-hidden")).toBe("true");
  });

  it("should apply different icon sizes", () => {
    const sizes: IconSize[] = [8, 12, 16, 18, 24, 36, 48];

    for (const size of sizes) {
      fixture.componentRef.setInput("size", size);
      fixture.detectChanges();

      expect(iconElement.classList).toContain(`tedi-icon--size-${size}`);
    }
  });

  it("should apply different icon colors", () => {
    const colors: IconColor[] = [
      "primary",
      "secondary",
      "tertiary",
      "brand",
      "brand-dark",
      "success",
      "warning",
      "warning-dark",
      "danger",
      "white",
    ];

    for (const color of colors) {
      fixture.componentRef.setInput("color", color);
      fixture.detectChanges();

      expect(iconElement.classList).toContain(`tedi-icon--color-${color}`);
    }
  });

  it("should apply background styles", () => {
    const backgrounds: IconBackgroundColor[] = [
      "primary",
      "secondary",
      "brand-primary",
      "brand-secondary",
    ];

    for (const bg of backgrounds) {
      fixture.componentRef.setInput("background", bg);
      fixture.detectChanges();

      expect(iconElement.classList).toContain("tedi-icon--bg");
      expect(iconElement.classList).toContain(`tedi-icon--bg-${bg}`);
    }
  });

  it("should enforce size constraint with background", () => {
    fixture.componentRef.setInput("size", 8);
    fixture.componentRef.setInput("background", "primary");
    fixture.detectChanges();

    expect(iconElement.classList).toContain("tedi-icon--size-24");
    expect(iconElement.classList).not.toContain("tedi-icon--size-8");

    fixture.componentRef.setInput("size", "inherit");
    fixture.detectChanges();

    expect(iconElement.classList).toContain("tedi-icon--size-24");
    expect(iconElement.classList).not.toContain("tedi-icon--size-inherit");

    fixture.componentRef.setInput("size", 16);
    fixture.detectChanges();

    expect(iconElement.classList).toContain("tedi-icon--size-16");
  });

  it("should apply filled variant", () => {
    fixture.componentRef.setInput("variant", "filled");
    fixture.detectChanges();

    expect(iconElement.classList).toContain("tedi-icon--filled");
  });

  it("should apply different icon types", () => {
    const types: IconType[] = ["outlined", "sharp", "rounded"];

    for (const type of types) {
      fixture.componentRef.setInput("type", type);
      fixture.detectChanges();

      expect(iconElement.classList).toContain(`material-symbols--${type}`);
    }
  });

  it("should set aria-label when label is provided", () => {
    fixture.componentRef.setInput("label", "Home icon");
    fixture.detectChanges();

    expect(iconElement.getAttribute("aria-label")).toBe("Home icon");
  });

  it("should hide from screen readers when no label is provided", () => {
    fixture.componentRef.setInput("label", undefined);
    fixture.detectChanges();

    expect(iconElement.getAttribute("aria-label")).toBeNull();
  });

  it("should handle changing icon name", () => {
    fixture.componentRef.setInput("name", "arrow_back");
    fixture.detectChanges();

    expect(iconElement.textContent?.trim()).toBe("arrow_back");
  });

  it("should handle undefined values", () => {
    expect(iconElement.classList.toString()).not.toContain("undefined");
  });
});
