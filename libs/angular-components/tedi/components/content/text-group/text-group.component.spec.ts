import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TextGroupComponent } from "./text-group.component";
import { TextGroupLabelComponent } from "./text-group-label.component";
import { TextGroupValueComponent } from "./text-group-value.component";

@Component({
  standalone: true,
  imports: [
    TextGroupComponent,
    TextGroupLabelComponent,
    TextGroupValueComponent,
  ],
  template: `
    <tedi-text-group>
      <tedi-text-group-label
        ><span class="label">{{ label }}</span></tedi-text-group-label
      >
      <tedi-text-group-value
        ><span class="value">{{ value }}</span></tedi-text-group-value
      >
    </tedi-text-group>
  `,
})
class TextGroupMinimumComponent {
  label = "Test Label";
  value = "Test Value";
}

@Component({
  standalone: true,
  imports: [
    TextGroupComponent,
    TextGroupLabelComponent,
    TextGroupValueComponent,
  ],
  template: `
    <tedi-text-group [type]="type" [labelWidth]="labelWidth">
      <tedi-text-group-label
        ><span class="label">{{ label }}</span></tedi-text-group-label
      >
      <tedi-text-group-value
        ><span class="value">{{ value }}</span></tedi-text-group-value
      >
    </tedi-text-group>
  `,
})
class TextGroupNormalComponent {
  label = "Test Label";
  value = "Test Value";
  type?: "horizontal" | "vertical";
  labelWidth?: string;
}

describe("TextGroupComponent", () => {
  describe("Normal Component", () => {
    let fixture: ComponentFixture<TextGroupNormalComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TextGroupNormalComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TextGroupNormalComponent);
      fixture.detectChanges();
    });

    it("should render projected label and value", () => {
      const labelEl = fixture.debugElement.query(
        By.css(".label"),
      ).nativeElement;
      const valueEl = fixture.debugElement.query(
        By.css(".value"),
      ).nativeElement;

      expect(labelEl.textContent).toBe("Test Label");
      expect(valueEl.textContent).toBe("Test Value");
    });

    it("should update layout class when type changes", () => {
      fixture.componentInstance.type = "vertical";
      fixture.detectChanges();
      const dl = fixture.debugElement.query(By.css("dl")).nativeElement;

      expect(dl.className).toContain("tedi-text-group--vertical");
      expect(dl.className).not.toContain("tedi-text-group--horizontal");
    });

    it("should apply labelWidth as a CSS variable", () => {
      fixture.componentInstance.labelWidth = "150px";
      fixture.detectChanges();
      const dl = fixture.debugElement.query(By.css("dl")).nativeElement;

      expect(
        getComputedStyle(dl).getPropertyValue("--_label-width").trim(),
      ).toBe("150px");
    });

    it("should update layout and labelWidth dynamically", () => {
      fixture.componentInstance.type = "horizontal";
      fixture.componentInstance.labelWidth = "100px";
      fixture.detectChanges();

      const dl = fixture.debugElement.query(By.css("dl")).nativeElement;

      expect(dl.className).toContain("tedi-text-group--horizontal");
      expect(
        getComputedStyle(dl).getPropertyValue("--_label-width").trim(),
      ).toBe("100px");

      fixture.componentInstance.type = "vertical";
      fixture.componentInstance.labelWidth = "50%";
      fixture.detectChanges();

      expect(dl.className).toContain("tedi-text-group--vertical");
      expect(
        getComputedStyle(dl).getPropertyValue("--_label-width").trim(),
      ).toBe("50%");
    });

    it("should have appropriate role attribute", () => {
      const dl = fixture.debugElement.query(By.css("dl")).nativeElement;
      expect(dl.getAttribute("role")).toBe("group");
    });
  });

  describe("Minimum Component", () => {
    let fixture: ComponentFixture<TextGroupMinimumComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TextGroupMinimumComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TextGroupMinimumComponent);
      fixture.detectChanges();
    });

    it("should default to horizontal layout", () => {
      const dl = fixture.debugElement.query(By.css("dl")).nativeElement;
      expect(dl.className).toContain("tedi-text-group--horizontal");
    });

    it("should render projected label and value", () => {
      const labelEl = fixture.debugElement.query(
        By.css(".label"),
      ).nativeElement;
      const valueEl = fixture.debugElement.query(
        By.css(".value"),
      ).nativeElement;

      expect(labelEl.textContent).toBe("Test Label");
      expect(valueEl.textContent).toBe("Test Value");
    });
  });
});
