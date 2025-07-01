import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SideNavDropdownComponent } from "./sidenav-dropdown.component";
import { SideNavService } from "../../../../services/sidenav/sidenav.service";
import { SideNavItemComponent } from "../sidenav-item/sidenav-item.component";
import { signal } from "@angular/core";

describe("SideNavDropdownComponent", () => {
  let fixture: ComponentFixture<SideNavDropdownComponent>;
  let dropdownElement: HTMLElement;
  let sidenavService: {
    items: ReturnType<typeof signal>,
    isCollapsed: ReturnType<typeof signal>,
    isMobile: ReturnType<typeof signal>,
    isMobileItemOpen: ReturnType<typeof signal>,
    isMobileOpen: ReturnType<typeof signal>,
    tooltipEnabled: ReturnType<typeof signal>,
    registerItem: jest.Mock,
    unregisterItem: jest.Mock,
    handleGoToMainMenu: jest.Mock,
    handleCollapse: jest.Mock
  }

  beforeEach(() => {
    sidenavService = {
        items: signal([]),
        isCollapsed: signal(false),
        isMobile: signal(false),
        isMobileItemOpen: signal(false),
        isMobileOpen: signal(false),
        tooltipEnabled: signal(false),
        registerItem: jest.fn(),
        unregisterItem: jest.fn(),
        handleGoToMainMenu: jest.fn(),
        handleCollapse: jest.fn()
    };

    const sidenavItemStub = {} as SideNavItemComponent;

    TestBed.configureTestingModule({
      imports: [SideNavDropdownComponent],
      providers: [
        { provide: SideNavService, useValue: sidenavService },
      ],
    });
    TestBed.overrideComponent(SideNavDropdownComponent, {
      set: {
        providers: [
          { provide: SideNavItemComponent, useValue: sidenavItemStub },
        ],
      },
    });

    fixture = TestBed.createComponent(SideNavDropdownComponent);
    dropdownElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should have the base CSS class", () => {
    expect(dropdownElement.classList.contains("tedi-sidenav-dropdown")).toBe(true);
  });

  it("should have open class when dropdown is open", () => {
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();
    expect(dropdownElement.classList.contains("tedi-sidenav-dropdown--open")).toBe(true);
  });

  it("ngAfterViewInit should set the `element` signal to the host element", () => {
    fixture.componentInstance.element.set(null);
    fixture.componentInstance.ngAfterViewInit();
    expect(fixture.componentInstance.element()).toBe(dropdownElement);
  });
});
