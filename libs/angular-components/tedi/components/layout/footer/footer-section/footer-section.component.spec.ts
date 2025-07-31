import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterSectionComponent } from "./footer-section.component";
import { BreakpointService } from "../../../../services/breakpoint/breakpoint.service";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { signal } from "@angular/core";

describe("FooterSectionComponent", () => {
  let component: FooterSectionComponent;
  let fixture: ComponentFixture<FooterSectionComponent>;
  let mockBreakpointService: { isBelowBreakpoint: jest.Mock };

  beforeEach(async () => {
    mockBreakpointService = {
      isBelowBreakpoint: jest.fn((breakpoint) => {
        if (breakpoint === "lg") return signal(false);
        if (breakpoint === "sm") return signal(false);
        return signal(false);
      }),
    };

    await TestBed.configureTestingModule({
      imports: [FooterSectionComponent],
      providers: [
        {
          provide: BreakpointService,
          useValue: mockBreakpointService,
        },
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should set default input values", () => {
    expect(component.icon()).toBeUndefined();
    expect(component.heading()).toBeUndefined();
    expect(component.collapse()).toBe(false);
  });

  it("should set custom input values", () => {
    fixture.componentRef.setInput("icon", "test-icon");
    fixture.componentRef.setInput("heading", "Test Heading");
    fixture.componentRef.setInput("collapse", true);
    fixture.detectChanges();

    expect(component.icon()).toBe("test-icon");
    expect(component.heading()).toBe("Test Heading");
    expect(component.collapse()).toBe(true);
  });

  it("should show icon when icon is provided", () => {
    fixture.componentRef.setInput("icon", "test-icon");
    fixture.detectChanges();

    const iconElement = fixture.nativeElement.querySelector(
      ".tedi-footer-section__icon",
    );
    expect(iconElement).toBeTruthy();
    expect(component.icon()).toBe("test-icon");
  });

  it("should hide icon when below large breakpoint", () => {
    fixture.componentRef.setInput("icon", "test-icon");
    mockBreakpointService.isBelowBreakpoint.mockImplementation((breakpoint) => {
      if (breakpoint === "lg") return signal(true);
      if (breakpoint === "sm") return signal(false);
      return signal(false);
    });
    fixture = TestBed.createComponent(FooterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const iconElement = fixture.nativeElement.querySelector(
      ".tedi-footer-section__icon",
    );
    expect(iconElement).toBeFalsy();
  });

  it("should toggle collapse state when collapse is enabled and mobile", () => {
    fixture.componentRef.setInput("heading", "test-heading");
    fixture.componentRef.setInput("collapse", true);
    fixture.componentInstance.applyCollapse = signal(true);
    fixture.detectChanges();

    fixture
      .whenStable()
      .then(() => {
        const content = fixture.nativeElement.querySelector(
          ".tedi-footer-section__content",
        );

        expect(content.getAttribute("ng-reflect-animation-state")).toBe(
          "collapsed",
        );

        const button = fixture.nativeElement.querySelector(
          ".tedi-footer-section__button",
        );
        button.click();
        fixture.detectChanges();

        return fixture.whenStable();
      })
      .then(() => {
        const content = fixture.nativeElement.querySelector(
          ".tedi-footer-section__content",
        );
        expect(content.getAttribute("ng-reflect-animation-state")).toBe(
          "expanded",
        );

        const button = fixture.nativeElement.querySelector(
          ".tedi-footer-section__button",
        );
        button.click();
        fixture.detectChanges();

        return fixture.whenStable();
      })
      .then(() => {
        const content = fixture.nativeElement.querySelector(
          ".tedi-footer-section__content",
        );
        expect(content.getAttribute("ng-reflect-animation-state")).toBe(
          "collapsed",
        );
      });
  });
});
