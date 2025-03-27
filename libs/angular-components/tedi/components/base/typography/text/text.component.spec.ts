import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  TextColor,
  TextComponent,
  TextElement,
  TextModifiers,
} from "./text.component";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";

@Component({
  imports: [TextComponent],
  template: `
    <tedi-text
      [element]="element"
      [class]="class"
      [id]="id"
      [tabIndex]="tabIndex"
      [modifiers]="modifiers"
      [color]="color"
    >
      Host Text Content
    </tedi-text>
  `,
})
class HostTextComponent {
  element: TextElement | undefined = "p";
  class: string | undefined = undefined;
  id: string | undefined = undefined;
  tabIndex: number | undefined = undefined;
  modifiers: TextModifiers[] | TextModifiers | undefined = undefined;
  color: TextColor | undefined = "primary";
}

describe("TextComponent", () => {
  let hostComponent: HostTextComponent;
  let hostFixture: ComponentFixture<HostTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextComponent, HostTextComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostTextComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it("should create component", () => {
    expect(hostComponent).toBeTruthy();
  });

  it("should render p element by default", () => {
    const headingElement = hostFixture.debugElement.query(By.css("p"));
    expect(headingElement).toBeTruthy();
    expect(headingElement.nativeElement.textContent.trim()).toBe(
      "Host Text Content",
    );
  });

  it("should render the correct element when changed", () => {
    hostComponent.element = "div";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("div"))).toBeTruthy();
    expect(hostFixture.debugElement.query(By.css("p"))).toBeNull();

    hostComponent.element = "span";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("span"))).toBeTruthy();

    hostComponent.element = "li";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("li"))).toBeTruthy();

    hostComponent.element = "label";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("label"))).toBeTruthy();

    hostComponent.element = "h1";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("h1"))).toBeTruthy();

    hostComponent.element = "h2";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("h2"))).toBeTruthy();

    hostComponent.element = "h3";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("h3"))).toBeTruthy();

    hostComponent.element = "h4";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("h4"))).toBeTruthy();

    hostComponent.element = "h5";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("h5"))).toBeTruthy();

    hostComponent.element = "h6";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("h6"))).toBeTruthy();
  });

  it("should apply custom class", () => {
    hostComponent.class = "test-class";
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("p"));
    expect(
      headingElement.nativeElement.classList.contains("test-class"),
    ).toBeTruthy();
  });

  it("should set id attribute", () => {
    hostComponent.id = "test-id";
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("p"));
    expect(headingElement.nativeElement.id).toBe("test-id");
  });

  it("should set tabIndex attribute", () => {
    hostComponent.tabIndex = 1;
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("p"));
    expect(headingElement.nativeElement.tabIndex).toBe(1);
  });

  it("should apply single modifier", () => {
    hostComponent.modifiers = "bold";
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("p"));
    expect(
      headingElement.nativeElement.classList.contains("text-bold"),
    ).toBeTruthy();
  });

  it("should apply multiple modifiers as array", () => {
    hostComponent.modifiers = ["bold", "italic"];
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("p"));
    expect(
      headingElement.nativeElement.classList.contains("text-bold"),
    ).toBeTruthy();
    expect(
      headingElement.nativeElement.classList.contains("text-italic"),
    ).toBeTruthy();
  });

  it("should apply heading modifiers correctly", () => {
    hostComponent.modifiers = "h2";
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("p"));
    expect(
      headingElement.nativeElement.classList.contains("tedi-text--h2"),
    ).toBeTruthy();
  });

  it("should apply color class", () => {
    hostComponent.color = "secondary";
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("p"));
    expect(
      headingElement.nativeElement.classList.contains("tedi-text--secondary"),
    ).toBeTruthy();
  });

  it("should apply different color classes", () => {
    const colors: TextColor[] = [
      "primary",
      "secondary",
      "tertiary",
      "white",
      "disabled",
      "brand",
      "success",
      "warning",
      "danger",
      "info",
      "neutral",
    ];

    for (const color of colors) {
      hostComponent.color = color;
      hostFixture.detectChanges();
      const textElement = hostFixture.debugElement.query(By.css("p"));
      expect(
        textElement.nativeElement.classList.contains(`tedi-text--${color}`),
      ).toBeTruthy();
    }
  });

  it("should apply different text modifiers", () => {
    const modifiers: TextModifiers[] = [
      "normal",
      "small",
      "bold",
      "thin",
      "italic",
      "center",
      "left",
      "right",
      "nowrap",
      "break-all",
      "break-word",
      "break-spaces",
      "uppercase",
      "lowercase",
      "capitalize",
      "capitalize-first",
      "inline-block",
      "inline",
      "line-normal",
      "line-condensed",
      "subtitle",
    ];

    for (const modifier of modifiers) {
      hostComponent.modifiers = modifier;
      hostFixture.detectChanges();
      const textElement = hostFixture.debugElement.query(By.css("p"));
      expect(
        textElement.nativeElement.classList.contains(`text-${modifier}`),
      ).toBeTruthy();
    }
  });

  it("should handle undefined values", () => {
    hostComponent.class = undefined;
    hostComponent.id = undefined;
    hostComponent.tabIndex = undefined;
    hostComponent.modifiers = undefined;
    hostComponent.color = undefined;
    hostFixture.detectChanges();

    const textElement = hostFixture.debugElement.query(By.css("p"));
    expect(textElement).toBeTruthy();
    expect(textElement.nativeElement.classList.toString()).not.toContain(
      "undefined",
    );
  });

  it("should filter out falsy values from class list", () => {
    hostComponent.class = "";
    hostComponent.modifiers = undefined;
    hostComponent.color = undefined;
    hostFixture.detectChanges();

    const textElement = hostFixture.debugElement.query(By.css("p"));
    expect(textElement.nativeElement.classList.toString()).toBe("");
  });
});
