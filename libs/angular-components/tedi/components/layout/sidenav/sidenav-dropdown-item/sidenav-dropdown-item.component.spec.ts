import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SideNavDropdownItemComponent } from "./sidenav-dropdown-item.component";

describe("SideNavDropdownItemComponent", () => {
  let fixture: ComponentFixture<SideNavDropdownItemComponent>;
  let dropdownItemEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SideNavDropdownItemComponent],
    });

    fixture = TestBed.createComponent(SideNavDropdownItemComponent);
    dropdownItemEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should have the base CSS class", () => {
    expect(dropdownItemEl.classList.contains("tedi-sidenav-dropdown-item")).toBe(true);
  });

  it("should add selected class when `selected` input is true", () => {
    fixture.componentRef.setInput("selected", true);
    fixture.detectChanges();
    expect(dropdownItemEl.classList.contains("tedi-sidenav-dropdown-item--selected")).toBe(true);
  });
});
