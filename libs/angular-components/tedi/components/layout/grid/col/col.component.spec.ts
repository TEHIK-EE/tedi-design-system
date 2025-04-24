import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  ColComponent,
  ColWidth,
  JustifySelf,
  AlignSelf,
} from "./col.component";

describe("ColComponent", () => {
  let fixture: ComponentFixture<ColComponent>;
  let colElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ColComponent],
    })

    fixture = TestBed.createComponent(ColComponent);
    colElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render the col with default props", () => {
    expect(colElement.classList).toContain("col");
    expect(colElement.classList).toContain("col--width-1");
  });

  it("should apply different column widths", () => {
    const widths: ColWidth[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    for (const width of widths) {
      fixture.componentRef.setInput("width", width);
      fixture.detectChanges();

      expect(colElement.classList).toContain(`col--width-${width}`);
    }
  });

  it("should apply justifySelf class when provided", () => {
    const justifyOptions: JustifySelf[] = ["start", "end", "center", "stretch"];

    for (const justifySelf of justifyOptions) {
      fixture.componentRef.setInput("justifySelf", justifySelf);
      fixture.detectChanges();

      expect(colElement.classList).toContain(`col--justify-self-${justifySelf}`);
    }
  });

  it("should apply alignSelf class when provided", () => {
    const alignOptions: AlignSelf[] = ["start", "end", "center", "stretch"];

    for (const alignSelf of alignOptions) {
      fixture.componentRef.setInput("alignSelf", alignSelf);
      fixture.detectChanges();

      expect(colElement.classList).toContain(`col--align-self-${alignSelf}`);
    }
  });

  it("should handle undefined values", () => {
    expect(colElement.classList.toString()).not.toContain("undefined");
  });
});
