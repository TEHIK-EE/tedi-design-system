import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FeedbackTextComponent, FeedbackTextPosition, FeedbackTextType } from "./feedback-text.component";

describe("FeedbackTextComponent", () => {
  let fixture: ComponentFixture<FeedbackTextComponent>;
  let element: HTMLElement;
  const text = "Some text";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackTextComponent],
    });

    fixture = TestBed.createComponent(FeedbackTextComponent);
    element = fixture.nativeElement;
    fixture.componentRef.setInput("text", text);
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should set text input", () => {
    expect(fixture.componentInstance.text()).toBe(text);
  });

  it("should apply default classes", () => {
    expect(element.classList).toContain("tedi-feedback-text");
    expect(element.classList).toContain("tedi-feedback-text--hint");
    expect(element.classList).toContain("tedi-feedback-text--left");
  });

  it("should apply type classes correctly", () => {
    const types: FeedbackTextType[] = ["hint", "valid", "error"];

    for (const type of types) {
      fixture.componentRef.setInput("type", type);
      fixture.detectChanges();

      expect(element.classList).toContain(`tedi-feedback-text--${type}`);
    }
  });

  it("should apply position classes correctly", () => {
    const positions: FeedbackTextPosition[] = ["left", "right"];

    for (const pos of positions) {
      fixture.componentRef.setInput("position", pos);
      fixture.detectChanges();

      expect(element.classList).toContain(`tedi-feedback-text--${pos}`);
    }
  });

  it("should apply role='alert' only for error and valid", () => {
    fixture.componentRef.setInput("type", "hint");
    fixture.detectChanges();
    expect(element.getAttribute("role")).toBeNull();

    fixture.componentRef.setInput("type", "valid");
    fixture.detectChanges();
    expect(element.getAttribute("role")).toBe("alert");

    fixture.componentRef.setInput("type", "error");
    fixture.detectChanges();
    expect(element.getAttribute("role")).toBe("alert");
  });

  it("should set aria-live to 'assertive' for error and valid", () => {
    fixture.componentRef.setInput("type", "hint");
    fixture.detectChanges();
    expect(element.getAttribute("aria-live")).toBe("polite");

    fixture.componentRef.setInput("type", "valid");
    fixture.detectChanges();
    expect(element.getAttribute("aria-live")).toBe("assertive");

    fixture.componentRef.setInput("type", "error");
    fixture.detectChanges();
    expect(element.getAttribute("aria-live")).toBe("assertive");
  });

  it("should not contain 'undefined' in class list", () => {
    expect(element.classList.toString()).not.toContain("undefined");
  });
});
