import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavComponent, SideNavItemSize } from './sidenav.component';
import { SideNavService } from '../../../services/sidenav/sidenav.service';
import { signal } from '@angular/core';

describe("SideNavComponent", () => {
  let fixture: ComponentFixture<SideNavComponent>;
  let sidenavElement: HTMLElement;
  let sidenavService: {
    items: ReturnType<typeof signal>,
    isCollapsed: ReturnType<typeof signal>,
    desktopBreakpoint: ReturnType<typeof signal>,
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
        desktopBreakpoint: signal("lg"),
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
      imports: [SideNavComponent],
      providers: [
        { provide: SideNavService, useValue: sidenavService },
      ],
    });

    TestBed.inject(SideNavService);
    fixture = TestBed.createComponent(SideNavComponent);
    sidenavElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have default classes (large + dividers)', () => {
    expect(sidenavElement.classList.contains("tedi-sidenav")).toBe(true);
    expect(sidenavElement.classList.contains("tedi-sidenav--large")).toBe(true);
    expect(sidenavElement.classList.contains("tedi-sidenav--dividers")).toBe(true);
  });

  it('should omit divider class when `dividers` input is false', () => {
    fixture.componentRef.setInput("dividers", false);
    fixture.detectChanges();
    expect(sidenavElement.classList).not.toContain("tedi-sidenav--dividers");
  });

  it('should reflect `size` input', () => {
    const sizes: SideNavItemSize[] = ["large", "medium", "small"];
    
    for (const size of sizes) {
        fixture.componentRef.setInput("size", size);
        fixture.detectChanges();
        expect(sidenavElement.classList.contains(`tedi-sidenav--${size}`)).toBe(true);
    }
  });

  it('should include collapsed class when service.isCollapsed is true', () => {
    sidenavService.isCollapsed.set(true);
    fixture.detectChanges();
    expect(sidenavElement.classList.contains(`tedi-sidenav--collapsed`)).toBe(true);
  });

  it('should include mobile class when service.isMobile is true', () => {
    sidenavService.isMobile.set(true);
    fixture.detectChanges();
    expect(sidenavElement.classList.contains(`tedi-sidenav--mobile`)).toBe(true);
  });

  it('should include mobile item open class when service.isMobileItemOpen is true', () => {
    sidenavService.isMobileItemOpen.set(true);
    fixture.detectChanges();
    expect(sidenavElement.classList.contains(`tedi-sidenav--mobile-item-open`)).toBe(true);
  });

  it('should include hidden class when service.isMobile is true and isMobileOpen is false', () => {
    sidenavService.isMobile.set(true);
    sidenavService.isMobileOpen.set(false);
    fixture.detectChanges();
    expect(sidenavElement.classList.contains(`tedi-sidenav--hidden`)).toBe(true);
  });
});
