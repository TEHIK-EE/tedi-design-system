import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  RowComponent,
  Cols,
  JustifyItems,
  AlignItems,
  Gap,
} from "./row.component";

describe("RowComponent", () => {
  let fixture: ComponentFixture<RowComponent>;
  let rowElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RowComponent],
    })

    fixture = TestBed.createComponent(RowComponent);
    rowElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should apply default cols class", () => {
    expect(rowElement.classList).toContain("row");
    expect(rowElement.classList).toContain("row--cols-auto");
  });

  it("should apply different column values", () => {
    const cols: Cols[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "auto"];

    for (const col of cols) {
      fixture.componentRef.setInput("cols", col);
      fixture.detectChanges();

      expect(rowElement.classList).toContain(`row--cols-${col}`);
    }
  });

  it("should apply justifyItems class when provided", () => {
    const justifyOptions: JustifyItems[] = ["start", "end", "center", "stretch"];

    for (const justifyItems of justifyOptions) {
      fixture.componentRef.setInput("justifyItems", justifyItems);
      fixture.detectChanges();

      expect(rowElement.classList).toContain(`row--justify-items-${justifyItems}`);
    }
  });

  it("should apply alignItems class when provided", () => {
    const alignOptions: AlignItems[] = ["start", "end", "center", "stretch"];

    for (const alignItems of alignOptions) {
      fixture.componentRef.setInput("alignItems", alignItems);
      fixture.detectChanges();

      expect(rowElement.classList).toContain(`row--align-items-${alignItems}`);
    }
  });

  it("should apply gap classes when provided", () => {
    const gapOptions: Gap[] = [0, 1, 2, 3, 4, 5];

    for (const gap of gapOptions) {
      fixture.componentRef.setInput("gap", gap);
      fixture.detectChanges();

      expect(rowElement.classList).toContain(`g-${gap}`);
    }
  });

  it("should apply gapX classes when provided", () => {
    const gapOptions: Gap[] = [0, 1, 2, 3, 4, 5];

    for (const gapX of gapOptions) {
      fixture.componentRef.setInput("gapX", gapX);
      fixture.detectChanges();

      expect(rowElement.classList).toContain(`gx-${gapX}`);
    }
  });

  it("should apply gapY classes when provided", () => {
    const gapOptions: Gap[] = [0, 1, 2, 3, 4, 5];

    for (const gapY of gapOptions) {
      fixture.componentRef.setInput("gapY", gapY);
      fixture.detectChanges();

      expect(rowElement.classList).toContain(`gy-${gapY}`);
    }
  });

  it("should handle undefined values", () => {
    expect(rowElement.classList.toString()).not.toContain("undefined");
  });
});
