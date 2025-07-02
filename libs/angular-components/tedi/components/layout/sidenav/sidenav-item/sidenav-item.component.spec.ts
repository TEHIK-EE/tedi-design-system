import { ComponentFixture, TestBed } from "@angular/core/testing";
import { signal } from "@angular/core";
import { SideNavItemComponent } from "./sidenav-item.component";
import { SideNavService } from "../../../../services/sidenav/sidenav.service";

describe("SideNavItemComponent", () => {
  let fixture: ComponentFixture<SideNavItemComponent>;
  let itemElement: HTMLElement;
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
      imports: [SideNavItemComponent],
      providers: [
        { provide: SideNavService, useValue: sidenavService },
      ],
    });

    fixture = TestBed.createComponent(SideNavItemComponent);
    itemElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should register on init and unregister on destroy", () => {
    expect(sidenavService.registerItem).toHaveBeenCalledWith(fixture.componentInstance);
    fixture.destroy();
    expect(sidenavService.unregisterItem).toHaveBeenCalledWith(fixture.componentInstance);
  });

  it("should always have base class", () => {
    expect(itemElement.classList.contains("tedi-sidenav-item")).toBe(true);
  });

  it("should read textContent in ngAfterViewInit", () => {
    itemElement.innerHTML = `<span class="tedi-sidenav-item__text">Item Text</span>`;
    fixture.componentInstance.ngAfterViewInit();
    expect(fixture.componentInstance.textContent()).toBe("Item Text");
  });

  it("should add selected class when selected input is true", () => {
    fixture.componentRef.setInput("selected", true);
    fixture.detectChanges();
    expect(itemElement.classList.contains("tedi-sidenav-item--selected")).toBe(true);
  });

  it("should add hidden class when mobile item open and no dropdown open", () => {
    sidenavService.isMobileItemOpen.set(true);
    fixture.detectChanges();
    expect(itemElement.classList.contains("tedi-sidenav-item--hidden")).toBe(true);
  });

  it("should not add hidden class when dropdown open", () => {
    const dropdownStub = { open: signal(true) };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fixture.componentInstance.dropdown = dropdownStub as any;
    sidenavService.isMobileItemOpen.set(true);
    fixture.detectChanges();
    expect(itemElement.classList.contains("tedi-sidenav-item--hidden")).toBe(false);
  });

  it("toggleDropdown should flip dropdown.open signal", () => {
    const openSignal = signal(false);
    const dropdownStub = { open: openSignal, element: jest.fn() };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fixture.componentInstance.dropdown = dropdownStub as any;
    fixture.detectChanges();
    expect(openSignal()).toBe(false);

    fixture.componentInstance.toggleDropdown();
    expect(openSignal()).toBe(true);

    fixture.componentInstance.toggleDropdown();
    expect(openSignal()).toBe(false);
  });

  it("click outside should close dropdown when collapsed", () => {
    const childEl = document.createElement("div");
    const dropdownStub = {
      open: signal(true),
      element: () => childEl,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fixture.componentInstance.dropdown = dropdownStub as any;
    fixture.componentInstance.ngAfterViewInit();

    sidenavService.isCollapsed.set(true);
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(dropdownStub.open()).toBe(false);
  });
});
