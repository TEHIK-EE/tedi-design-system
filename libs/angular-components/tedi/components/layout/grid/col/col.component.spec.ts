import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import {
  ColComponent,
  ColWidth,
  JustifySelf,
  AlignSelf,
} from "./col.component";

@Component({
  imports: [ColComponent],
  template: `
    <tedi-col
      [class]="class"
      [width]="width"
      [justifySelf]="justifySelf"
      [alignSelf]="alignSelf"
    >
      Test Content
    </tedi-col>
  `,
})
class HostColComponent {
  class: string | undefined = undefined;
  width: ColWidth = 1;
  justifySelf: JustifySelf | undefined = undefined;
  alignSelf: AlignSelf | undefined = undefined;
}

describe("ColComponent", () => {
  let hostComponent: HostColComponent;
  let hostFixture: ComponentFixture<HostColComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ColComponent, HostColComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostColComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it("should create component", () => {
    expect(hostComponent).toBeTruthy();
  });

  it("should render the col with default props", () => {
    const colElement = hostFixture.debugElement.query(By.css(".col"));
    expect(colElement).toBeTruthy();
  });

  it("should apply default width class", () => {
    const colElement = hostFixture.debugElement.query(By.css(".col"));
    expect(
      colElement.nativeElement.classList.contains("col--width-1"),
    ).toBeTruthy();
  });

  it("should apply different column widths", () => {
    const widths: ColWidth[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (const width of widths) {
      hostComponent.width = width;
      hostFixture.detectChanges();

      const colElement = hostFixture.debugElement.query(By.css(".col"));
      expect(
        colElement.nativeElement.classList.contains(`col--width-${width}`),
      ).toBeTruthy();
    }
  });

  it("should apply justifySelf class when provided", () => {
    const justifyOptions: JustifySelf[] = ["start", "end", "center", "stretch"];

    for (const justifySelf of justifyOptions) {
      hostComponent.justifySelf = justifySelf;
      hostFixture.detectChanges();

      const colElement = hostFixture.debugElement.query(By.css(".col"));
      expect(
        colElement.nativeElement.classList.contains(
          `col--justify-self-${justifySelf}`,
        ),
      ).toBeTruthy();
    }
  });

  it("should apply alignSelf class when provided", () => {
    const alignOptions: AlignSelf[] = ["start", "end", "center", "stretch"];

    for (const alignSelf of alignOptions) {
      hostComponent.alignSelf = alignSelf;
      hostFixture.detectChanges();

      const colElement = hostFixture.debugElement.query(By.css(".col"));
      expect(
        colElement.nativeElement.classList.contains(
          `col--align-self-${alignSelf}`,
        ),
      ).toBeTruthy();
    }
  });

  it("should apply custom class", () => {
    hostComponent.class = "custom-class";
    hostFixture.detectChanges();

    const colElement = hostFixture.debugElement.query(By.css(".col"));
    expect(
      colElement.nativeElement.classList.contains("custom-class"),
    ).toBeTruthy();
  });

  it("should handle undefined values", () => {
    hostFixture.detectChanges();

    const colElement = hostFixture.debugElement.query(By.css(".col"));
    expect(colElement).toBeTruthy();
    expect(colElement.nativeElement.classList.toString()).not.toContain(
      "undefined",
    );
  });
});
