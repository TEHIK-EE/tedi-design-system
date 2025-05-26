import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LabelComponent } from "./label.component";

describe("LabelComponent", () => {
  let fixture: ComponentFixture<LabelComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LabelComponent],
    });

    fixture = TestBed.createComponent(LabelComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should apply default classes", () => {
    expect(element.classList).toContain("tedi-label");
    expect(element.classList).not.toContain("tedi-label--small");
  });

  it("should apply small size class", () => {
    fixture.componentRef.setInput("size", "small");
    fixture.detectChanges();

    expect(element.classList).toContain("tedi-label--small");
  });

  it("should handle required input", () => {
    fixture.componentRef.setInput("required", true);
    fixture.detectChanges();

    expect(element.classList).toContain("tedi-label--required");
  });
});
