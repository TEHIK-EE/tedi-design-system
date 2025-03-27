import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  ColComponent,
  ColWidth,
  JustifySelf,
  AlignSelf,
} from "./col.component";

describe("ColComponent", () => {
  let fixture: ComponentFixture<ColComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ColComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColComponent);
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render the col with default props", () => {
    const colElement = fixture.debugElement.query(By.css(".col"));
    expect(colElement).toBeTruthy();
  });

  it("should apply default width class", () => {
    const colElement = fixture.debugElement.query(By.css(".col"));
    expect(
      colElement.nativeElement.classList.contains("col--width-1"),
    ).toBeTruthy();
  });

  it("should apply different column widths", () => {
    const widths: ColWidth[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (const width of widths) {
      fixture.componentRef.setInput("width", width);
      fixture.detectChanges();

      const colElement = fixture.debugElement.query(By.css(".col"));
      expect(
        colElement.nativeElement.classList.contains(`col--width-${width}`),
      ).toBeTruthy();
    }
  });

  it("should apply justifySelf class when provided", () => {
    const justifyOptions: JustifySelf[] = ["start", "end", "center", "stretch"];

    for (const justifySelf of justifyOptions) {
      fixture.componentRef.setInput("justifySelf", justifySelf);
      fixture.detectChanges();

      const colElement = fixture.debugElement.query(By.css(".col"));
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
      fixture.componentRef.setInput("alignSelf", alignSelf);
      fixture.detectChanges();

      const colElement = fixture.debugElement.query(By.css(".col"));
      expect(
        colElement.nativeElement.classList.contains(
          `col--align-self-${alignSelf}`,
        ),
      ).toBeTruthy();
    }
  });

  it("should apply custom class", () => {
    fixture.componentRef.setInput("class", "custom-class");
    fixture.detectChanges();

    const colElement = fixture.debugElement.query(By.css(".col"));
    expect(
      colElement.nativeElement.classList.contains("custom-class"),
    ).toBeTruthy();
  });

  it("should handle undefined values", () => {
    fixture.detectChanges();

    const colElement = fixture.debugElement.query(By.css(".col"));
    expect(colElement).toBeTruthy();
    expect(colElement.nativeElement.classList.toString()).not.toContain(
      "undefined",
    );
  });
});
