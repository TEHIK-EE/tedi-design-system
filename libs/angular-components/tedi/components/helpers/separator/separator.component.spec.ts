import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import {
  SeparatorComponent,
  SeparatorAxis,
  SeparatorColor,
  SeparatorVariant,
  SeparatorDotSize,
  SeparatorThickness,
  SeparatorSpacingValue,
  SeparatorSpacing,
} from "./separator.component";

@Component({
  standalone: true,
  imports: [SeparatorComponent],
  template: `
    <tedi-separator
      [axis]="axis"
      [color]="color"
      [variant]="variant"
      [dotSize]="dotSize"
      [thickness]="thickness"
      [spacing]="spacing"
      [size]="size"
    />
  `,
})
class TestHostComponent {
  axis: SeparatorAxis = "horizontal";
  color: SeparatorColor = "primary";
  variant?: SeparatorVariant;
  dotSize?: SeparatorDotSize;
  thickness: SeparatorThickness = 1;
  spacing?: SeparatorSpacingValue | SeparatorSpacing;
  size: string = "100%";
}

describe("SeparatorComponent", () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector("tedi-separator");
  });

  it("should have default classes and styles", () => {
    expect(element.classList).toContain("tedi-separator");
    expect(element.classList).toContain("tedi-separator--primary");
    expect(element.classList).toContain("tedi-separator--horizontal");
    expect(element.classList).toContain("tedi-separator--thickness-1");
    expect(element.style.width).toBe("100%");
    expect(element.style.height).toBe("0px");
  });

  it("should update axis to vertical", () => {
    host.axis = "vertical";
    fixture.detectChanges();

    expect(element.classList).toContain("tedi-separator--vertical");
    expect(element.style.width).toBe("0px");
    expect(element.style.height).toBe("100%");
  });

  it("should change color class", () => {
    host.color = "accent";
    fixture.detectChanges();

    expect(element.classList).toContain("tedi-separator--accent");
  });

  it("should apply variant class", () => {
    host.variant = "dotted";
    fixture.detectChanges();

    expect(element.classList).toContain("tedi-separator--dotted");
  });

  it("should apply dot-only variant with dotSize", () => {
    host.variant = "dot-only";
    host.dotSize = "medium";
    fixture.detectChanges();

    expect(element.classList).toContain("tedi-separator--dot-only");
    expect(element.classList).toContain("tedi-separator--dot-only-medium");
  });

  it("should apply numeric spacing", () => {
    host.spacing = 1.5;
    fixture.detectChanges();

    expect(element.classList).toContain("tedi-separator--spacing-1-5");
  });

  it("should apply object spacing for horizontal axis", () => {
    host.spacing = { top: 0.75, bottom: 2 };
    fixture.detectChanges();

    expect(element.classList).toContain("tedi-separator--top-0-75");
    expect(element.classList).toContain("tedi-separator--bottom-2");
  });

  it("should apply object spacing for vertical axis", () => {
    host.axis = "vertical";
    host.spacing = { left: 0.5, right: 5 };
    fixture.detectChanges();

    expect(element.classList).toContain("tedi-separator--left-0-5");
    expect(element.classList).toContain("tedi-separator--right-5");
  });

  it("should apply custom size", () => {
    host.size = "50%";
    fixture.detectChanges();

    expect(element.style.width).toBe("50%");

    host.axis = "vertical";
    fixture.detectChanges();
    expect(element.style.height).toBe("50%");
  });
});
