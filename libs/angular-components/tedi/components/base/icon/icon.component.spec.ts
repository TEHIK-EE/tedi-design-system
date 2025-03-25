import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  IconComponent,
  IconSize,
  IconVariant,
  IconType,
  IconColor,
  IconBackgroundColor,
} from "./icon.component";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";

@Component({
  imports: [IconComponent],
  template: `
    <tedi-icon
      [name]="name"
      [class]="class"
      [size]="size"
      [color]="color"
      [background]="background"
      [variant]="variant"
      [type]="type"
      [label]="label"
    />
  `,
})
class HostIconComponent {
  name: string = "home";
  class: string | undefined = undefined;
  size: IconSize = 24;
  color: IconColor | undefined = "primary";
  background: IconBackgroundColor | undefined = undefined;
  variant: IconVariant | undefined = "outlined";
  type: IconType | undefined = "outlined";
  label: string | undefined = undefined;
}

describe("IconComponent", () => {
  let hostComponent: HostIconComponent;
  let hostFixture: ComponentFixture<HostIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconComponent, HostIconComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostIconComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it("should create component", () => {
    expect(hostComponent).toBeTruthy();
  });

  it("should render the icon with default props", () => {
    const iconElement = hostFixture.debugElement.query(
      By.css(".material-symbols"),
    );
    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.textContent.trim()).toBe("home");
  });

  it("should apply the correct classes with default settings", () => {
    const iconElement = hostFixture.debugElement.query(
      By.css(".material-symbols"),
    );
    const classString = iconElement.nativeElement.className;

    expect(classString).toContain("notranslate");
    expect(classString).toContain("material-symbols");
    expect(classString).toContain("material-symbols--outlined");
    expect(classString).toContain("tedi-icon");
    expect(classString).toContain("tedi-icon--color-primary");
    expect(classString).toContain("tedi-icon--size-24");
    expect(classString).not.toContain("tedi-icon--filled");
    expect(classString).not.toContain("tedi-icon--bg");
  });

  it("should apply custom class", () => {
    hostComponent.class = "test-class";
    hostFixture.detectChanges();

    const iconElement = hostFixture.debugElement.query(
      By.css(".material-symbols"),
    );
    expect(
      iconElement.nativeElement.classList.contains("test-class"),
    ).toBeTruthy();
  });

  it("should apply different icon sizes", () => {
    const sizes: IconSize[] = [8, 12, 16, 18, 24, 36, 48];

    for (const size of sizes) {
      hostComponent.size = size;
      hostFixture.detectChanges();

      const iconElement = hostFixture.debugElement.query(
        By.css(".material-symbols"),
      );
      expect(
        iconElement.nativeElement.classList.contains(`tedi-icon--size-${size}`),
      ).toBeTruthy();
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
      hostComponent.color = color;
      hostFixture.detectChanges();

      const iconElement = hostFixture.debugElement.query(
        By.css(".material-symbols"),
      );
      expect(
        iconElement.nativeElement.classList.contains(
          `tedi-icon--color-${color}`,
        ),
      ).toBeTruthy();
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
      hostComponent.background = bg;
      hostFixture.detectChanges();

      const iconElement = hostFixture.debugElement.query(
        By.css(".material-symbols"),
      );
      expect(
        iconElement.nativeElement.classList.contains("tedi-icon--bg"),
      ).toBeTruthy();
      expect(
        iconElement.nativeElement.classList.contains(`tedi-icon--bg-${bg}`),
      ).toBeTruthy();
    }
  });

  it("should enforce size constraint with background", () => {
    hostComponent.size = 8;
    hostComponent.background = "primary";
    hostFixture.detectChanges();

    const iconElement = hostFixture.debugElement.query(
      By.css(".material-symbols"),
    );
    expect(
      iconElement.nativeElement.classList.contains("tedi-icon--size-24"),
    ).toBeTruthy();
    expect(
      iconElement.nativeElement.classList.contains("tedi-icon--size-8"),
    ).toBeFalsy();

    hostComponent.size = 16;
    hostFixture.detectChanges();

    expect(
      iconElement.nativeElement.classList.contains("tedi-icon--size-16"),
    ).toBeTruthy();
  });

  it("should apply filled variant", () => {
    hostComponent.variant = "filled";
    hostFixture.detectChanges();

    const iconElement = hostFixture.debugElement.query(
      By.css(".material-symbols"),
    );
    expect(
      iconElement.nativeElement.classList.contains("tedi-icon--filled"),
    ).toBeTruthy();
  });

  it("should apply different icon types", () => {
    const types: IconType[] = ["outlined", "sharp", "rounded"];

    for (const type of types) {
      hostComponent.type = type;
      hostFixture.detectChanges();

      const iconElement = hostFixture.debugElement.query(
        By.css(".material-symbols"),
      );
      expect(
        iconElement.nativeElement.classList.contains(
          `material-symbols--${type}`,
        ),
      ).toBeTruthy();
    }
  });

  it("should set aria-label when label is provided", () => {
    hostComponent.label = "Home icon";
    hostFixture.detectChanges();

    const iconElement = hostFixture.debugElement.query(
      By.css(".material-symbols"),
    );
    expect(iconElement.nativeElement.getAttribute("aria-label")).toBe(
      "Home icon",
    );
  });

  it("should hide from screen readers when no label is provided", () => {
    hostComponent.label = undefined;
    hostFixture.detectChanges();

    const iconElement = hostFixture.debugElement.query(
      By.css(".material-symbols"),
    );
    expect(iconElement.nativeElement.getAttribute("aria-hidden")).toBe("true");
  });

  it("should handle changing icon name", () => {
    hostComponent.name = "settings";
    hostFixture.detectChanges();

    const iconElement = hostFixture.debugElement.query(
      By.css(".material-symbols"),
    );
    expect(iconElement.nativeElement.textContent.trim()).toBe("settings");
  });

  it("should handle undefined values", () => {
    hostFixture.detectChanges();

    const iconElement = hostFixture.debugElement.query(
      By.css(".material-symbols"),
    );
    expect(iconElement).toBeTruthy();
    expect(iconElement.nativeElement.classList.toString()).not.toContain(
      "undefined",
    );
  });
});
