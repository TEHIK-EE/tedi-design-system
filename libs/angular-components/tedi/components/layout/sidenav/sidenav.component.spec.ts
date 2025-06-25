import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavComponent, SideNavItemSize } from './sidenav.component';
import { SideNavService } from '../../../services/sidenav/sidenav.service';
import { signal } from '@angular/core';

describe("SideNavComponent", () => {
  let fixture: ComponentFixture<SideNavComponent>;
  let sidenavElement: HTMLElement;

  const sidenavService = {
    isCollapsed: signal(false),
    isMobile: signal(false),
    isMobileItemOpen: signal(false),
    isMobileOpen: signal(true),
  };

  beforeEach(() => {
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
