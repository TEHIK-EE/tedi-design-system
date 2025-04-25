import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListComponent } from "./list.component";

describe("List Component", () => {
  let fixture: ComponentFixture<ListComponent>;
  let listElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListComponent],
    });

    fixture = TestBed.createComponent(ListComponent);
    listElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should apply the correct classes", () => {
    expect(listElement.classList).toContain("tedi-list");
  });

  it("should apply list with no styles", () => {
    fixture.componentRef.setInput("styled", false);
    fixture.detectChanges();

    expect(listElement.classList).toContain("tedi-list--unstyled");
  });

  it("should handle undefined values for class", () => {
    expect(listElement.classList).not.toContain("undefined");
  });

  it("should apply the correct color class", () => {
    fixture.componentRef.setInput("color", "primary");
    fixture.detectChanges();

    expect(listElement.classList).toContain("tedi-list--bullet-color-primary");
  });
});
