import { ComponentFixture, TestBed } from "@angular/core/testing";
import { signal } from "@angular/core";
import { SideNavOverlayComponent } from "./sidenav-overlay.component";
import { SideNavService } from "../../../../services/sidenav/sidenav.service";

describe("SideNavOverlayComponent", () => {
  let fixture: ComponentFixture<SideNavOverlayComponent>;
  let overlayElement: HTMLElement;
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
    
    TestBed.configureTestingModule({
      imports: [SideNavOverlayComponent],
      providers: [
        { provide: SideNavService, useValue: sidenavService },
      ],
    });

    fixture = TestBed.createComponent(SideNavOverlayComponent);
    overlayElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should have base class only when mobile is false or closed", () => {
    expect(overlayElement.classList.contains("tedi-sidenav-overlay")).toBe(true);
    expect(overlayElement.classList.contains("tedi-sidenav-overlay--visible")).toBe(false);
  });

  it("should add visible class when service.isMobile and isMobileOpen are true", () => {
    sidenavService.isMobile.set(true);
    sidenavService.isMobileOpen.set(true);
    fixture.detectChanges();
    expect(overlayElement.classList.contains("tedi-sidenav-overlay--visible")).toBe(true);
  });

  it("should not add visible class when only one condition is true", () => {
    sidenavService.isMobile.set(true);
    sidenavService.isMobileOpen.set(false);
    fixture.detectChanges();
    expect(overlayElement.classList.contains("tedi-sidenav-overlay--visible")).toBe(false);

    sidenavService.isMobile.set(false);
    sidenavService.isMobileOpen.set(true);
    fixture.detectChanges();
    expect(overlayElement.classList.contains("tedi-sidenav-overlay--visible")).toBe(false);
  });

  it("should close mobile on click and call handleGoToMainMenu", () => {
    sidenavService.isMobileOpen.set(true);
    fixture.detectChanges();
    expect(sidenavService.isMobileOpen()).toBe(true);

    overlayElement.click();
    fixture.detectChanges();
    expect(sidenavService.isMobileOpen()).toBe(false);
    expect(sidenavService.handleGoToMainMenu).toHaveBeenCalledTimes(1);
  });
});
