import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SideNavDropdownGroupComponent } from "./sidenav-dropdown-group.component";

describe("SideNavDropdownGroupComponent", () => {
  let fixture: ComponentFixture<SideNavDropdownGroupComponent>;
  let groupEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SideNavDropdownGroupComponent],
    });

    fixture = TestBed.createComponent(SideNavDropdownGroupComponent);
    groupEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should have the base CSS class", () => {
    expect(groupEl.classList.contains("tedi-sidenav-dropdown-group")).toBe(true);
  });
});
