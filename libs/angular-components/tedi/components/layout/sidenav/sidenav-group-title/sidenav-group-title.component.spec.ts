import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SideNavGroupTitleComponent } from "./sidenav-group-title.component";

describe("SideNavGroupTitleComponent", () => {
  let fixture: ComponentFixture<SideNavGroupTitleComponent>;
  let groupTitleElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SideNavGroupTitleComponent],
    });

    fixture = TestBed.createComponent(SideNavGroupTitleComponent);
    groupTitleElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should have the base CSS class", () => {
    expect(groupTitleElement.classList.contains("tedi-sidenav-group-title")).toBe(true);
  });
});
