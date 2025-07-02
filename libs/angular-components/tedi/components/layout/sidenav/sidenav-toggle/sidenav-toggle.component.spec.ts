import { ComponentFixture, TestBed } from "@angular/core/testing";
import { signal } from "@angular/core";
import { SideNavToggleComponent } from "./sidenav-toggle.component";
import { SideNavService } from "../../../../services/sidenav/sidenav.service";
import { TediTranslationService } from "../../../../services/translation/translation.service";

describe("SideNavToggleComponent", () => {
  let fixture: ComponentFixture<SideNavToggleComponent>;
  let toggleElement: HTMLElement;
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

  const translationTrackSpy = jest.fn().mockReturnValue(signal("Translated Label"));
  const translationService = {
    track: translationTrackSpy,
  };

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
      imports: [SideNavToggleComponent],
      providers: [
        { provide: SideNavService, useValue: sidenavService },
        { provide: TediTranslationService, useValue: translationService },
      ],
    });

    fixture = TestBed.createComponent(SideNavToggleComponent);
    toggleElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render base class and set aria-label from translation.track", () => {
    expect(toggleElement.classList).toContain("tedi-sidenav-toggle");
    expect(translationTrackSpy).toHaveBeenCalledWith("sidenav.toggle");
    expect(toggleElement.getAttribute("aria-label")).toBe("Translated Label");
  });

  it("should toggle isMobileOpen and call handleGoToMainMenu on click", () => {
    toggleElement.click();
    fixture.detectChanges();
    expect(sidenavService.isMobileOpen()).toBe(true);
    expect(sidenavService.handleGoToMainMenu).toHaveBeenCalledTimes(1);

    toggleElement.click();
    fixture.detectChanges();
    expect(sidenavService.isMobileOpen()).toBe(false);
    expect(sidenavService.handleGoToMainMenu).toHaveBeenCalledTimes(2);
  });
});
