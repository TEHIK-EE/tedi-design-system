import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TextGroupComponent } from "./text-group.component";
import { TextGroupLabelComponent } from "./text-group-label.component";
import { TextGroupValueComponent } from "./text-group-value.component";

@Component({
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
class TestHostComponent {
  label = "Test Label";
  value = "Test Value";
  type?: "horizontal" | "vertical";
  labelWidth?: string;
}

describe("TextGroupComponent (projected-content)", () => {
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [
        TextGroupComponent,
        TextGroupLabelComponent,
        TextGroupValueComponent,
      ],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it("should render projected label and value", () => {
    const labelEl = hostFixture.debugElement.query(
      By.css(".label"),
    ).nativeElement;
    const valueEl = hostFixture.debugElement.query(
      By.css(".value"),
    ).nativeElement;

    expect(labelEl.textContent).toBe("Test Label");
    expect(valueEl.textContent).toBe("Test Value");
  });

  it("should default to horizontal layout", () => {
    const dl = hostFixture.debugElement.query(By.css("dl")).nativeElement;
    expect(dl.className).toContain("tedi-text-group--horizontal");
  });

  it("should update class when type input changes", () => {
    hostFixture.componentInstance.type = "vertical";
    hostFixture.detectChanges();
    const dl = hostFixture.debugElement.query(By.css("dl")).nativeElement;
    expect(dl.className).toContain("tedi-text-group--vertical");
    expect(dl.className).not.toContain("tedi-text-group--horizontal");
  });

  it("should apply labelWidth as CSS variable", () => {
    hostFixture.componentInstance.labelWidth = "150px";
    hostFixture.detectChanges();
    const dl = hostFixture.debugElement.query(By.css("dl")).nativeElement;
    expect(getComputedStyle(dl).getPropertyValue("--_label-width").trim()).toBe(
      "150px",
    );
  });
});
