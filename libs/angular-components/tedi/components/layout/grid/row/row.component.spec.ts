import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import {
  RowComponent,
  Cols,
  JustifyItems,
  AlignItems,
  Gap,
} from "./row.component";

@Component({
  imports: [RowComponent],
  template: `
    <tedi-row
      [class]="class"
      [cols]="cols"
      [justifyItems]="justifyItems"
      [alignItems]="alignItems"
      [gap]="gap"
      [gapX]="gapX"
      [gapY]="gapY"
    >
      Test Content
    </tedi-row>
  `,
})
class HostRowComponent {
  class: string | undefined = undefined;
  cols: Cols = 12;
  justifyItems: JustifyItems | undefined = undefined;
  alignItems: AlignItems | undefined = undefined;
  gap: Gap | undefined = undefined;
  gapX: Gap | undefined = undefined;
  gapY: Gap | undefined = undefined;
}

describe("RowComponent", () => {
  let hostComponent: HostRowComponent;
  let hostFixture: ComponentFixture<HostRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RowComponent, HostRowComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostRowComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it("should create component", () => {
    expect(hostComponent).toBeTruthy();
  });

  it("should render the row with default props", () => {
    const rowElement = hostFixture.debugElement.query(By.css(".row"));
    expect(rowElement).toBeTruthy();
  });

  it("should apply default cols class", () => {
    const rowElement = hostFixture.debugElement.query(By.css(".row"));
    expect(
      rowElement.nativeElement.classList.contains("row--cols-12"),
    ).toBeTruthy();
  });

  it("should apply different column counts", () => {
    const colCounts: Cols[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (const cols of colCounts) {
      hostComponent.cols = cols;
      hostFixture.detectChanges();

      const rowElement = hostFixture.debugElement.query(By.css(".row"));
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
      hostComponent.justifyItems = justifyItems;
      hostFixture.detectChanges();

      const rowElement = hostFixture.debugElement.query(By.css(".row"));
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
      hostComponent.alignItems = alignItems;
      hostFixture.detectChanges();

      const rowElement = hostFixture.debugElement.query(By.css(".row"));
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
      hostComponent.gap = gap;
      hostFixture.detectChanges();
      hostFixture.whenStable().then(() => {
        const rowElement = hostFixture.debugElement.query(By.css(".row"));
        expect(
          rowElement.nativeElement.classList.contains(`g-${gap}`),
        ).toBeTruthy();
      });
    }
  });

  it("should apply gapX classes when provided", () => {
    const gapOptions: Gap[] = [0, 1, 2, 3, 4, 5];

    for (const gapX of gapOptions) {
      hostComponent.gapX = gapX;
      hostFixture.detectChanges();
      hostFixture.whenStable().then(() => {
        const rowElement = hostFixture.debugElement.query(By.css(".row"));
        expect(
          rowElement.nativeElement.classList.contains(`gx-${gapX}`),
        ).toBeTruthy();
      });
    }
  });

  it("should apply gapY classes when provided", () => {
    const gapOptions: Gap[] = [0, 1, 2, 3, 4, 5];

    for (const gapY of gapOptions) {
      hostComponent.gapY = gapY;
      hostFixture.detectChanges();
      hostFixture.whenStable().then(() => {
        const rowElement = hostFixture.debugElement.query(By.css(".row"));
        expect(
          rowElement.nativeElement.classList.contains(`gy-${gapY}`),
        ).toBeTruthy();
      });
    }
  });

  it("should apply custom class", () => {
    hostComponent.class = "custom-class";
    hostFixture.detectChanges();

    const rowElement = hostFixture.debugElement.query(By.css(".row"));
    expect(
      rowElement.nativeElement.classList.contains("custom-class"),
    ).toBeTruthy();
  });

  it("should handle undefined values", () => {
    hostFixture.detectChanges();

    const rowElement = hostFixture.debugElement.query(By.css(".row"));
    expect(rowElement).toBeTruthy();
    expect(rowElement.nativeElement.classList.toString()).not.toContain(
      "undefined",
    );
  });
});
