import { TestBed } from "@angular/core/testing";
import { FooterComponent } from "./footer.component";
import { BreakpointService } from "../../../services/breakpoint/breakpoint.service";
import { signal } from "@angular/core";

describe("FooterComponent", () => {
  let mockBreakpointService: jest.Mocked<BreakpointService>;

  beforeEach(async () => {
    mockBreakpointService = {
      isBelowBreakpoint: jest.fn(),
    } as unknown as jest.Mocked<BreakpointService>;

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        { provide: BreakpointService, useValue: mockBreakpointService },
      ],
    }).compileComponents();
  });

  it("should create component", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(signal(true));
    const fixture = TestBed.createComponent(FooterComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should return true for mobileLayout when isBelowBreakpoint returns true", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(signal(true));
    const fixture = TestBed.createComponent(FooterComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.mobileLayout()).toBe(true);
  });

  it("should return false for mobileLayout when isBelowBreakpoint returns false", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(signal(false));
    const fixture = TestBed.createComponent(FooterComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.mobileLayout()).toBe(false);
  });

  it("should add mobile class to container when isBelowBreakpoint returns true", () => {
    mockBreakpointService.isBelowBreakpoint.mockReturnValue(signal(true));
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const containerElement = fixture.nativeElement.querySelector(
      ".tedi-footer__container",
    );
    expect(containerElement.classList).toContain("tedi-footer--mobile");
  });
});
