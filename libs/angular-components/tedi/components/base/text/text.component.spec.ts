import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TextColor, TextComponent, TextModifiers } from "./text.component";

describe("TextComponent", () => {
  let fixture: ComponentFixture<TextComponent>;
  let textElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextComponent],
    })

    fixture = TestBed.createComponent(TextComponent);
    textElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should apply single modifier", () => {
    fixture.componentRef.setInput("modifiers", "bold");
    fixture.detectChanges();

    expect(textElement.classList).toContain("text-bold");
  });

  it("should apply multiple modifiers as array", () => {
    fixture.componentRef.setInput("modifiers", ["bold", "italic"]);
    fixture.detectChanges();

    expect(textElement.classList).toContain("text-bold");
    expect(textElement.classList).toContain("text-italic");
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
      fixture.componentRef.setInput("color", color);
      fixture.detectChanges();

      expect(textElement.classList).toContain(`tedi-text--${color}`);
    }
  });

  it("should apply heading modifiers correctly", () => {
    const headingModifiers: TextModifiers[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
    
    for (const heading of headingModifiers) {
      fixture.componentRef.setInput("modifiers", heading);
      fixture.detectChanges();

      expect(textElement.classList).toContain(`tedi-text--${heading}`);
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
      fixture.componentRef.setInput("modifiers", modifier);
      fixture.detectChanges();

      expect(textElement.classList).toContain(`text-${modifier}`);
    }
  });

  it("should handle undefined values", () => {
    expect(textElement.classList.toString()).not.toContain("undefined");
  });
});
