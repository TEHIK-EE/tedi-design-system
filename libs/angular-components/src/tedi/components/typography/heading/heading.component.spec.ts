import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  HeadingComponent,
  HeadingModifiers,
  isHeadingModifier,
} from "./heading.component";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { TextColor, TextModifiers } from "../text/text.component";

@Component({
  template: `
    <tedi-heading
      [element]="element"
      [class]="class"
      [id]="id"
      [tabIndex]="tabIndex"
      [modifiers]="modifiers"
      [color]="color"
    >
      Host Heading Content
    </tedi-heading>
  `,
})
class HostHeadingComponent {
  element: HeadingModifiers | undefined = "h1";
  class: string | undefined = undefined;
  id: string | undefined = undefined;
  tabIndex: number | undefined = undefined;
  modifiers: TextModifiers[] | TextModifiers | undefined = undefined;
  color: TextColor | undefined = "primary";
}

describe("HeadingComponent", () => {
  let hostComponent: HostHeadingComponent;
  let hostFixture: ComponentFixture<HostHeadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadingComponent, HostHeadingComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostHeadingComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it("should create component", () => {
    expect(hostComponent).toBeTruthy();
  });

  it("should render h1 heading by default", () => {
    const headingElement = hostFixture.debugElement.query(By.css("h1"));
    expect(headingElement).toBeTruthy();
    expect(headingElement.nativeElement.textContent.trim()).toBe(
      "Host Heading Content",
    );
  });

  it("should render the correct heading level when changed", () => {
    hostComponent.element = "h2";
    hostFixture.detectChanges();
    expect(hostFixture.debugElement.query(By.css("h2"))).toBeTruthy();
    expect(hostFixture.debugElement.query(By.css("h1"))).toBeNull();

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
    const headingElement = hostFixture.debugElement.query(By.css("h1"));
    expect(
      headingElement.nativeElement.classList.contains("test-class"),
    ).toBeTruthy();
  });

  it("should set id attribute", () => {
    hostComponent.id = "test-id";
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("h1"));
    expect(headingElement.nativeElement.id).toBe("test-id");
  });

  it("should set tabIndex attribute", () => {
    hostComponent.tabIndex = 1;
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("h1"));
    expect(headingElement.nativeElement.tabIndex).toBe(1);
  });

  it("should apply single modifier", () => {
    hostComponent.modifiers = "bold";
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("h1"));
    expect(
      headingElement.nativeElement.classList.contains("text-bold"),
    ).toBeTruthy();
  });

  it("should apply multiple modifiers as array", () => {
    hostComponent.modifiers = ["bold", "italic"];
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("h1"));
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
    const headingElement = hostFixture.debugElement.query(By.css("h1"));
    expect(
      headingElement.nativeElement.classList.contains("tedi-text--h2"),
    ).toBeTruthy();
  });

  it("should apply color class", () => {
    hostComponent.color = "secondary";
    hostFixture.detectChanges();
    const headingElement = hostFixture.debugElement.query(By.css("h1"));
    expect(
      headingElement.nativeElement.classList.contains("tedi-text--secondary"),
    ).toBeTruthy();
  });

  it("should handle undefined values", () => {
    hostComponent.class = undefined;
    hostComponent.id = undefined;
    hostComponent.tabIndex = undefined;
    hostComponent.modifiers = undefined;
    hostComponent.color = undefined;
    hostFixture.detectChanges();

    const headingElement = hostFixture.debugElement.query(By.css("h1"));
    expect(headingElement).toBeTruthy();
    expect(headingElement.nativeElement.classList.toString()).not.toContain(
      "undefined",
    );
  });
});

describe("isHeadingModifier", () => {
  it("should identify valid heading modifiers", () => {
    expect(isHeadingModifier("h1")).toBeTruthy();
    expect(isHeadingModifier("h2")).toBeTruthy();
    expect(isHeadingModifier("h3")).toBeTruthy();
    expect(isHeadingModifier("h4")).toBeTruthy();
    expect(isHeadingModifier("h5")).toBeTruthy();
    expect(isHeadingModifier("h6")).toBeTruthy();
  });

  it("should reject invalid heading modifiers", () => {
    expect(isHeadingModifier("h0")).toBeFalsy();
    expect(isHeadingModifier("h7")).toBeFalsy();
    expect(isHeadingModifier("heading")).toBeFalsy();
    expect(isHeadingModifier("bold")).toBeFalsy();
    expect(isHeadingModifier("")).toBeFalsy();
  });
});
