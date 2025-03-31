import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  RowComponent,
  Cols,
  JustifyItems,
  AlignItems,
  Gap,
} from "./row.component";

describe("RowComponent", () => {
  let fixture: ComponentFixture<RowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowComponent);
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render the row with default props", () => {
    const rowElement = fixture.debugElement.query(By.css(".row"));
    expect(rowElement).toBeTruthy();
  });

  it("should apply default cols class", () => {
    const rowElement = fixture.debugElement.query(By.css(".row"));
    expect(
      rowElement.nativeElement.classList.contains("row--cols-12"),
    ).toBeTruthy();
  });

  it("should apply different column counts", () => {
    const colCounts: Cols[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (const cols of colCounts) {
      fixture.componentRef.setInput("cols", cols);
      fixture.detectChanges();

      const rowElement = fixture.debugElement.query(By.css(".row"));
      expect(
        rowElement.nativeElement.classList.contains(`row--cols-${cols}`),
      ).toBeTruthy();
    }
  });

  it("should apply justifyItems class when provided", () => {
    const justifyOptions: JustifyItems[] = [
      "start",
      "end",
      "center",
      "stretch",
    ];

    for (const justifyItems of justifyOptions) {
      fixture.componentRef.setInput("justifyItems", justifyItems);
      fixture.detectChanges();

      const rowElement = fixture.debugElement.query(By.css(".row"));
      expect(
        rowElement.nativeElement.classList.contains(
          `row--justify-items-${justifyItems}`,
        ),
      ).toBeTruthy();
    }
  });

  it("should apply alignItems class when provided", () => {
    const alignOptions: AlignItems[] = ["start", "end", "center", "stretch"];

    for (const alignItems of alignOptions) {
      fixture.componentRef.setInput("alignItems", alignItems);
      fixture.detectChanges();

      const rowElement = fixture.debugElement.query(By.css(".row"));
      expect(
        rowElement.nativeElement.classList.contains(
          `row--align-items-${alignItems}`,
        ),
      ).toBeTruthy();
    }
  });

  it("should apply gap classes when provided", () => {
    const gapOptions: Gap[] = [0, 1, 2, 3, 4, 5];

    for (const gap of gapOptions) {
      fixture.componentRef.setInput("gap", gap);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const rowElement = fixture.debugElement.query(By.css(".row"));
        expect(
          rowElement.nativeElement.classList.contains(`g-${gap}`),
        ).toBeTruthy();
      });
    }
  });

  it("should apply gapX classes when provided", () => {
    const gapOptions: Gap[] = [0, 1, 2, 3, 4, 5];

    for (const gapX of gapOptions) {
      fixture.componentRef.setInput("gapX", gapX);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const rowElement = fixture.debugElement.query(By.css(".row"));
        expect(
          rowElement.nativeElement.classList.contains(`gx-${gapX}`),
        ).toBeTruthy();
      });
    }
  });

  it("should apply gapY classes when provided", () => {
    const gapOptions: Gap[] = [0, 1, 2, 3, 4, 5];

    for (const gapY of gapOptions) {
      fixture.componentRef.setInput("gapY", gapY);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const rowElement = fixture.debugElement.query(By.css(".row"));
        expect(
          rowElement.nativeElement.classList.contains(`gy-${gapY}`),
        ).toBeTruthy();
      });
    }
  });

  it("should apply custom class", () => {
    fixture.componentRef.setInput("class", "custom-class");
    fixture.detectChanges();

    const rowElement = fixture.debugElement.query(By.css(".row"));
    expect(
      rowElement.nativeElement.classList.contains("custom-class"),
    ).toBeTruthy();
  });

  it("should handle undefined values", () => {
    fixture.detectChanges();

    const rowElement = fixture.debugElement.query(By.css(".row"));
    expect(rowElement).toBeTruthy();
    expect(rowElement.nativeElement.classList.toString()).not.toContain(
      "undefined",
    );
  });
});
